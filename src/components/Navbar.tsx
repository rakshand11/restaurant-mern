import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setOpen(false);
        navigate("/");
    };

    return (
        <nav>
            <div className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-blue-600">
                                <img src="./logo2.jpg" alt="logo" className="w-20" />
                            </Link>
                        </div>

                        {/* Center Links */}
                        <div className="flex items-center space-x-8">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                Home
                            </Link>

                            <Link
                                to="/menu"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                Menus
                            </Link>

                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center space-x-4">

                            {/* Cart */}
                            <button
                                onClick={() => navigate("/cart")}
                                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ShoppingCart size={22} className="text-gray-700" />
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    3
                                </span>
                            </button>

                            {/* Auth Section */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <UserCircle size={22} className="text-gray-700" />
                                    </button>

                                    {open && (
                                        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-50">
                                            <Link
                                                to="/bookings"
                                                onClick={() => setOpen(false)}
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                My Bookings
                                            </Link>

                                            <Link
                                                to="/order"
                                                onClick={() => setOpen(false)}
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                My Orders
                                            </Link>

                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <LogOut size={16} />
                                                    Logout
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                >
                                    Login
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;