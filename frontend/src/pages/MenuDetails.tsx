import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ArrowLeft, CheckCircle, IndianRupee, ShoppingCart, XCircle } from "lucide-react";
import { useCart } from "../context/CartProvider";

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailabel?: boolean;
}

const MenuDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<MenuItem | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { increaseCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        axios
            .get("https://api.rakshand.site/menu/get")
            .then((res) => {
                if (cancelled) return;
                const items: MenuItem[] = res.data?.items ?? [];
                const found = items.find((item) => item._id === id);
                setMenu(found ?? null);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    const addToCart = async () => {
        if (!menu || isAdding) return;

        setIsAdding(true);
        try {
            const res = await axios.post(
                "https://api.rakshand.site/cart/add",
                { menuItemId: menu._id, quantity },
                { withCredentials: true }
            );

            toast.success(res.data.msg || "Added to cart");
            increaseCart(quantity);
            navigate("/cart");
        } catch (error) {
            const err = error as { response?: { status?: number; data?: { msg?: string } } };
            const status = err.response?.status;
            const msg = err.response?.data?.msg;

            if (status === 401) {
                toast.error("Login required");
            } else if (msg) {
                toast.error(msg);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsAdding(false);
        }
    };

    if (!menu) {
        return (
            <div
                className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "2rem 1.5rem",
                        background: "#111008",
                        border: "0.5px solid #3a3020",
                        borderRadius: "0.5rem",
                        maxWidth: "32rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.6rem",
                            fontWeight: 300,
                            color: "#f5ead6",
                            margin: "0 0 0.5rem",
                        }}
                    >
                        Menu <em style={{ color: "#c9a55a" }}>Not Found</em>
                    </p>
                    <p style={{ fontSize: 12, letterSpacing: "0.12em", color: "#8a7e68" }}>
                        The item you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => navigate("/menu")}
                        style={{
                            marginTop: "1rem",
                            padding: "0.6rem 1.2rem",
                            background: "#111008",
                            color: "#b8965a",
                            border: "0.5px solid #b8965a",
                            borderRadius: "0.5rem",
                            fontSize: 11,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontWeight: 500,
                            cursor: "pointer",
                            outline: "none",
                        }}
                        className="hover:bg-transparent hover:text-white transition-colors"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#0a0a0a] text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
            {/* Import fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back to menu */}
                <button
                    onClick={() => navigate("/menu")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#b8965a",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.5rem 0",
                        marginBottom: "1.5rem",
                    }}
                    className="hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Menu</span>
                </button>

                {/* Image left | Details right (same height on laptop) */}
                <div
                    className="grid grid-cols-1 gap-6 md:grid-flow-col md:grid-cols-2"
                    style={{ height: "auto" }}
                >
                    {/* IMAGE LEFT */}
                    <div
                        style={{
                            position: "relative",
                            borderRadius: "0.75rem",
                            overflow: "hidden",
                            boxShadow: "0 0 0 1px rgba(58, 48, 32, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <img
                            src={menu.image}
                            alt={menu.name}
                            style={{
                                width: "100%",
                                height: "auto",
                                maxHeight: "32rem",
                                minHeight: "20rem",
                                objectFit: "cover",
                            }}
                        />

                        {/* Availability badge */}
                        <div
                            style={{
                                position: "absolute",
                                top: "1rem",
                                right: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "9999px",
                                fontSize: 9,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                ...(menu.isAvailabel
                                    ? {
                                        background: "#4a553a",
                                        color: "#f5ead6",
                                    }
                                    : {
                                        background: "#6a3a3a",
                                        color: "#f5ead6",
                                    }),
                            }}
                        >
                            {menu.isAvailabel ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {menu.isAvailabel ? "Available" : "Unavailable"}
                        </div>
                    </div>

                    {/* DETAILS RIGHT: strictly parallel to image on laptop */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            gap: "1.5rem",
                            height: "100%",
                        }}
                    >
                        {/* Title and price */}
                        <div>
                            <h1
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: "2rem",
                                    fontWeight: 300,
                                    margin: "0 0 0.25rem",
                                    color: "#f5ead6",
                                }}
                            >
                                {menu.name}
                            </h1>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "0.5rem",
                                    color: "#b8965a",
                                    fontWeight: 500,
                                }}
                            >
                                <IndianRupee size={20} />
                                <span
                                    style={{
                                        fontSize: "2rem",
                                    }}
                                >
                                    {menu.price}
                                </span>
                            </div>
                            <p
                                style={{
                                    fontSize: 11,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#8a7e68",
                                    margin: "0.5rem 0 0",
                                }}
                            >
                                per item
                            </p>
                        </div>

                        {/* Description */}
                        <div
                            style={{
                                background: "#111008",
                                border: "0.5px solid #3a3020",
                                borderRadius: "0.5rem",
                                padding: "1rem",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 11,
                                    color: "#8a7e68",
                                    lineHeight: 1.5,
                                }}
                            >
                                {menu.description}
                            </p>
                        </div>

                        {/* Total, quantity, and add to cart */}
                        <div
                            style={{
                                background: "#111008",
                                border: "0.5px solid #3a3020",
                                borderRadius: "0.5rem",
                                padding: "1.25rem",
                                marginTop: "auto",
                            }}
                        >
                            {/* Total amount */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "1rem",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 11,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: "#b8965a",
                                        fontWeight: 500,
                                    }}
                                >
                                    Total Amount
                                </span>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: "0.25rem",
                                        fontSize: "1.25rem",
                                        color: "#b8965a",
                                        fontWeight: 500,
                                    }}
                                >
                                    <IndianRupee size={16} />
                                    <span>{menu.price * quantity}</span>
                                </div>
                            </div>

                            {/* Quantity controls */}
                            <div
                                style={{
                                    background: "#14130a",
                                    border: "0.5px solid #3a3020",
                                    borderRadius: "0.5rem",
                                    padding: "0.75rem 1rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 11,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: "#b8965a",
                                    }}
                                >
                                    Quantity
                                </span>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: "9999px",
                                            background: "#2a2214",
                                            color: "#b8965a",
                                            border: "0.5px solid #3a3020",
                                            fontSize: 14,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            outline: "none",
                                        }}
                                        className="hover:bg-[#3a3020] hover:text-white transition-colors"
                                    >
                                        −
                                    </button>
                                    <span
                                        style={{
                                            fontSize: 14,
                                            color: "#e8e0cc",
                                            fontWeight: 500,
                                            width: "2rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => q + 1)}
                                        style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: "9999px",
                                            background: "#2a2214",
                                            color: "#b8965a",
                                            border: "0.5px solid #3a3020",
                                            fontSize: 14,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            outline: "none",
                                        }}
                                        className="hover:bg-[#3a3020] hover:text-white transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to cart button */}
                            <button
                                type="button"
                                disabled={!menu.isAvailabel || isAdding}
                                onClick={addToCart}
                                style={{
                                    width: "100%",
                                    padding: "0.85rem 1rem",
                                    background: menu.isAvailabel && !isAdding ? "#b8965a" : "#3a3020",
                                    color: "#f5ead6",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    fontSize: 12,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 6,
                                    cursor: menu.isAvailabel && !isAdding ? "pointer" : "not-allowed",
                                    outline: "none",
                                    marginTop: "1rem",
                                }}
                                className="hover:bg-[#c9a55a] hover:text-white transition-colors active:scale-[0.98]"
                            >
                                <ShoppingCart
                                    className={`w-4 h-4 ${menu.isAvailabel && !isAdding ? "" : "opacity-50"}`}
                                />
                                {!menu.isAvailabel
                                    ? "Unavailable"
                                    : isAdding
                                        ? "Adding..."
                                        : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;