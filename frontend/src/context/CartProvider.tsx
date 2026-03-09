import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface CartContextType {
    cartCount: number;
    fetchCartCount: () => Promise<void>;
    increaseCart: (qty: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [cartCount, setCartCount] = useState(0);
    const increaseCart = (qty: number) => {
        setCartCount(prev => prev + qty);
    };

    const fetchCartCount = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/cart/get",
                { withCredentials: true }
            );

            const cart = res.data.msg;

            if (!cart || !cart.items) {
                setCartCount(0);
                return;
            }

            const totalQty = cart.items.reduce(
                (sum: number, item: any) => sum + item.quantity,
                0
            );

            setCartCount(totalQty);

        } catch (error) {
            console.log("Cart error:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, increaseCart, fetchCartCount }}>
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