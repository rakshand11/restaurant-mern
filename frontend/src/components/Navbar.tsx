import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, ShoppingBag, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import { useState } from "react";
import axios from "axios";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const { cartCount, fetchCartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const logout = async () => {
        try {
            await axios.post("https://api.rakshand.site/user/logout", {}, { withCredentials: true });
            localStorage.removeItem("user");
            setUser(null);
            setOpen(false);
            fetchCartCount();
            navigate("/");
        } catch (error) {
            console.log("Logout error", error);
        }
    };

    const isActive = (path: string) => location.pathname === path;

    const linkStyle = (path: string): React.CSSProperties => ({
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: isActive(path) ? '#8a6520' : '#8a7e68',
        textDecoration: 'none',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 400,
        transition: 'color 0.2s',
    });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500&display=swap');
                .nb-link:hover { color: #8a6520 !important; }
                .nb-btn-out:hover { background: #8a6520 !important; color: #faf8f4 !important; }
                .nb-btn-fill:hover { background: #6e5018 !important; border-color: #6e5018 !important; }
                .nb-dropdown-item:hover { background: #f0ece4 !important; }
            `}</style>

            <nav style={{ position: 'sticky', top: 0, zIndex: 50 }}>

                {/* Main bar */}
                <div style={{ background: '#faf8f4', borderBottom: '0.5px solid #d8d0c0', padding: '0 2rem' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        {/* Logo */}
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <polygon
                                    points="18,2 22,14 34,14 24,22 28,34 18,26 8,34 12,22 2,14 14,14"
                                    fill="none" stroke="#8a6520" strokeWidth="1"
                                />
                                <polygon
                                    points="18,7 21,15 30,15 23,20 26,29 18,23 10,29 13,20 6,15 15,15"
                                    fill="#8a6520" opacity="0.12"
                                />
                                <circle cx="18" cy="18" r="4" fill="#8a6520" />
                            </svg>
                            <div>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: '1.35rem',
                                    fontWeight: 400,
                                    color: '#1a1408',
                                    letterSpacing: '0.08em',
                                    lineHeight: 1,
                                }}>
                                    Rakshand
                                </div>
                                <div style={{
                                    fontSize: 8,
                                    letterSpacing: '0.35em',
                                    color: '#8a6520',
                                    textTransform: 'uppercase',
                                    marginTop: 2,
                                }}>
                                    Fine Dining
                                </div>
                            </div>
                        </Link>

                        {/* Nav Links */}
                        <div className="hidden md:flex" style={{ gap: '2.5rem' }}>
                            {([
                                ['/', 'Home'],
                                ['/menu', 'Menus'],
                                ['/book-table', 'Book Table'],
                                ['/contact', 'Contact'],
                            ] as [string, string][]).map(([path, label]) => (
                                <Link key={path} to={path} className="nb-link" style={linkStyle(path)}>
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

                            {/* Cart */}
                            <button
                                onClick={() => navigate("/cart")}
                                style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
                            >
                                <ShoppingBag size={20} color="#8a6520" strokeWidth={1.2} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute', top: -2, right: -2,
                                        width: 16, height: 16,
                                        background: '#8a6520', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 9, color: '#faf8f4', fontWeight: 500,
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <div style={{ width: '0.5px', height: 20, background: '#d8d0c0' }} />

                            {/* Auth */}
                            {user ? (
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setOpen(!open)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
                                    >
                                        <UserCircle size={20} color="#8a6520" strokeWidth={1.2} />
                                    </button>

                                    {open && (
                                        <div style={{
                                            position: 'absolute', right: 0, marginTop: 8,
                                            width: 180, background: '#faf8f4',
                                            border: '0.5px solid #d8d0c0', zIndex: 50,
                                            padding: '0.5rem 0',
                                        }}>
                                            {([
                                                ['/bookings', 'My Bookings'],
                                                ['/myorder', 'My Orders'],
                                            ] as [string, string][]).map(([path, label]) => (
                                                <Link
                                                    key={path}
                                                    to={path}
                                                    onClick={() => setOpen(false)}
                                                    className="nb-dropdown-item"
                                                    style={{
                                                        display: 'block', padding: '0.6rem 1rem',
                                                        fontSize: 11, letterSpacing: '0.15em',
                                                        textTransform: 'uppercase', color: '#8a6520',
                                                        textDecoration: 'none', transition: 'background 0.2s',
                                                        fontFamily: "'Montserrat', sans-serif",
                                                    }}
                                                >
                                                    {label}
                                                </Link>
                                            ))}
                                            <div style={{ borderTop: '0.5px solid #d8d0c0', margin: '0.4rem 0' }} />
                                            <button
                                                onClick={logout}
                                                className="nb-dropdown-item"
                                                style={{
                                                    width: '100%', textAlign: 'left',
                                                    padding: '0.6rem 1rem', fontSize: 11,
                                                    letterSpacing: '0.15em', textTransform: 'uppercase',
                                                    color: '#a03030', background: 'none', border: 'none',
                                                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                                                    gap: 8, transition: 'background 0.2s',
                                                    fontFamily: "'Montserrat', sans-serif",
                                                }}
                                            >
                                                <LogOut size={14} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="nb-btn-out"
                                        style={{
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: 9, letterSpacing: '0.2em',
                                            textTransform: 'uppercase', padding: '0.5rem 1.25rem',
                                            background: 'transparent', border: '0.5px solid #8a6520',
                                            color: '#8a6520', cursor: 'pointer', transition: 'all 0.2s',
                                        }}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate("/signup")}
                                        className="nb-btn-fill"
                                        style={{
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: 9, letterSpacing: '0.2em',
                                            textTransform: 'uppercase', padding: '0.5rem 1.25rem',
                                            background: '#8a6520', border: '0.5px solid #8a6520',
                                            color: '#faf8f4', cursor: 'pointer', transition: 'all 0.2s',
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Ticker bar */}
                <div style={{ background: '#f0ece4', padding: '0.4rem 2rem', borderBottom: '0.5px solid #d0c8b8' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 4, height: 4, background: '#8a6520', transform: 'rotate(45deg)', flexShrink: 0 }} />
                        <p style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 9, letterSpacing: '0.25em',
                            color: '#b0a080', textTransform: 'uppercase', margin: 0,
                        }}>
                            Reservations open · Est. 2019 · New Delhi
                        </p>
                    </div>
                </div>

            </nav>
        </>
    );
};

export default Navbar;