import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface CartItem {
    quantity: number;
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

    const [cartCount, setCartCount] = useState<number>(0);

    // increase cart locally (used after add-to-cart)
    const increaseCart = (qty: number) => {
        setCartCount((prev) => {
            const newCount = prev + qty;
            return newCount;
        });
    };

    const fetchCartCount = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/cart/get",
                { withCredentials: true }
            );

            const cart: Cart | null = res.data.msg;

            const totalQty = (cart?.items ?? []).reduce(
                (sum, item) => sum + (item?.quantity ?? 0),
                0
            );

            setCartCount(totalQty);

        } catch (error) {
            console.log("Cart fetch error:", error);
            setCartCount(0)
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

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