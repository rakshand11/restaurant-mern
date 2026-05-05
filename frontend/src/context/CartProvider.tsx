import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

interface CartItem {
    quantity: number;
    menuItem?: any;
}

interface Cart {
    items: CartItem[];
}

interface CartContextType {
    cartCount: number;
    fetchCartCount: () => Promise<void>;
    increaseCart: (qty: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const { admin, user } = useAuth(); // ✅ get user too
    const [cartCount, setCartCount] = useState<number>(0);

    const increaseCart = (qty: number) => {
        setCartCount((prev) => prev + qty);
    };

    const fetchCartCount = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/cart/get",
                { withCredentials: true }
            );

            const cart: Cart | null = res.data.cart;

            const totalQty = (cart?.items ?? []).reduce(
                (sum, item) => sum + (item?.quantity ?? 0),
                0
            );

            setCartCount(totalQty);

        } catch (error) {
            console.log("Cart fetch error:", error);
            setCartCount(0);
        }
    };

    useEffect(() => {
        if (admin) return;  // ✅ skip for admin
        if (!user) return;  // ✅ skip if not logged in
        fetchCartCount();
    }, [admin, user]); // ✅ added user as dependency

    return (
        <CartContext.Provider
            value={{ cartCount, fetchCartCount, increaseCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};