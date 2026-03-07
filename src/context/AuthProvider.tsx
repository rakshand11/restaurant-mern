import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface AuthContextType {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
    admin: any;
    setAdmin: Dispatch<SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const safeParse = (value: string | null) => {
        try {
            if (!value || value === "undefined") return null;
            return JSON.parse(value);
        } catch {
            return null;
        }
    };

    const [user, setUser] = useState<any>(() =>
        safeParse(localStorage.getItem("user"))
    );

    const [admin, setAdmin] = useState<any>(() =>
        safeParse(localStorage.getItem("admin"))
    );

    return (
        <AuthContext.Provider value={{ user, setUser, admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};