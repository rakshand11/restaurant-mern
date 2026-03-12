import { IndianRupee, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailabel?: boolean;
}

const MenuCard = ({ menu }: { menu: MenuItem }) => {

    const navigate = useNavigate();
    const { fetchCartCount } = useCart(); // get cart updater

    const addToCart = async (menuId: string) => {
        try {

            const res = await axios.post(
                "http://3.110.195.60:3000/cart/add",
                {
                    menuItemId: menuId,
                    quantity: 1
                },
                { withCredentials: true }
            );

            // update cart count instantly
            await fetchCartCount();

            toast.success(res.data.msg || "Added to cart");

        } catch (error: unknown) {

            const err = error as {
                response?: { status?: number; data?: { msg?: string } };
            };

            const status = err.response?.status;
            const msg = err.response?.data?.msg;

            if (status === 401) {
                toast.error("Login required");
            }
            else if (msg) {
                toast.error(msg);
            }
            else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">

            {/* IMAGE */}
            <div
                onClick={() => navigate(`/menu-details/${menu._id}`)}
                className="relative h-56 overflow-hidden cursor-pointer"
            >
                <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* CONTENT */}
            <div className="p-5">

                <h3 className="text-xl font-bold">
                    {menu.name}
                </h3>

                <p className="text-gray-600 text-sm">
                    {menu.description}
                </p>

                <div className="flex items-center justify-between mt-4">

                    <p className="text-2xl font-bold flex items-center gap-1">
                        <IndianRupee size={20} />
                        {menu.price}
                    </p>

                    <button
                        onClick={() => addToCart(menu._id)}
                        disabled={!menu.isAvailabel}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold ${menu.isAvailabel
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>

                </div>

            </div>

        </div>
    );
};

export default MenuCard;