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
        if (!menu || isAdding) return; // ✅ fixed

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
        } catch (error: unknown) {
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
            setIsAdding(false); // ✅ always reset
        }
    };

    if (!menu) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Menu not found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        The item you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => navigate("/menu")}
                        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition-colors"
                    >
                        Back to menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <button
                    onClick={() => navigate("/menu")}
                    className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Back to menu</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-16">
                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* Image Section */}
                    <div className="relative">
                        <div className="sticky top-8">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={menu.image}
                                    alt={menu.name}
                                    className="w-full h-[400px] object-cover"
                                />
                                {/* Availability Badge */}
                                <div className="absolute top-6 right-6">
                                    {menu.isAvailabel ? (
                                        <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Available</span>
                                        </div>
                                    ) : (
                                        <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                                            <XCircle className="w-5 h-5" />
                                            <span>Unavailable</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">

                        {/* Title and Price */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {menu.name}
                            </h1>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-yellow-500 flex items-center">
                                    <IndianRupee size={24} />{menu.price}
                                </span>
                                <span className="text-gray-500 text-lg">per item</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {menu.description}
                            </p>
                        </div>

                        {/* Total, Quantity and Add to Cart */}
                        <div className="bg-linear-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-xl space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-white text-lg font-semibold">
                                    Total Amount
                                </span>
                                <span className="text-white text-3xl font-bold flex items-center">
                                    <IndianRupee size={28} />
                                    {menu.price * quantity}
                                </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                                <span className="text-white font-medium">Quantity</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-yellow-600 font-bold text-xl hover:bg-white transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="min-w-8 text-center text-white font-semibold text-lg">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-yellow-600 font-bold text-xl hover:bg-white transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={!menu.isAvailabel || isAdding}
                                onClick={addToCart}
                                className={`cursor-pointer w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${menu.isAvailabel && !isAdding
                                    ? "bg-white text-yellow-600 hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-lg"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {!menu.isAvailabel ? "Unavailable" : isAdding ? "Adding..." : "Add to Cart"} {/* ✅ fixed */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;