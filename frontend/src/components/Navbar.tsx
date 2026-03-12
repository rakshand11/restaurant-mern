import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import { useState } from "react";
import axios from "axios";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { fetchCartCount } = useCart()

    const logout = async () => {
        try {
            await axios.post("http://3.110.195.60:3000/user/logout", {}, { withCredentials: true });
            localStorage.removeItem("user");
            setUser(null);
            setOpen(false);
            fetchCartCount()
            navigate("/");
        } catch (error) {
            console.log("Logout error", error);
        }
    };

    return (
        <nav>
            <div className="bg-black shadow-md sticky top-0 z-50 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="text-3xl italic font-serif font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent tracking-wider"
                            >
                                Restaurant
                            </Link>
                        </div>

                        {/* Center Links */}
                        <div className="hidden md:flex space-x-6 font-medium text-white">
                            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
                            <Link to="/menu" className="hover:text-orange-500 transition-colors">Menus</Link>
                            <Link to="/book-table" className="hover:text-orange-500 transition-colors">Book Table</Link>
                            <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center space-x-4">

                            {/* Cart */}
                            <button
                                onClick={() => navigate("/cart")}
                                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <ShoppingCart size={22} className="text-white" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Auth Section */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <UserCircle size={22} className="text-white" />
                                    </button>

                                    {open && (
                                        <div className="absolute right-0 mt-2 w-44 bg-black shadow-lg rounded-lg py-2 z-50 border border-gray-700">
                                            <Link
                                                to="/bookings"
                                                onClick={() => setOpen(false)}
                                                className="block px-4 py-2 hover:bg-gray-700 text-orange-400"
                                            >
                                                My Bookings
                                            </Link>

                                            <Link
                                                to="/myorder"
                                                onClick={() => setOpen(false)}
                                                className="block px-4 py-2 hover:bg-gray-700 text-orange-400"
                                            >
                                                My Orders
                                            </Link>

                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-700 flex items-center gap-2"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                    >
                                        Login
                                    </button>

                                    <button
                                        onClick={() => navigate("/signup")}
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;