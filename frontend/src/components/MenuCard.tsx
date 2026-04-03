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
    const { fetchCartCount } = useCart();

    const addToCart = async (menuId: string) => {
        try {
            const res = await axios.post("https://api.rakshand.site/cart/add",
                { menuItemId: menuId, quantity: 1 },
                { withCredentials: true }
            );
            await fetchCartCount();
            toast.success(res.data.msg || "Added to cart");
        } catch (error: any) {
            const status = error?.response?.status;
            const msg = error?.response?.data?.msg;
            if (status === 401) toast.error("Login required");
            else if (msg) toast.error(msg);
            else toast.error("Something went wrong");
        }
    };

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '1.5rem',
            padding: '1.5rem', background: '#0f0d08',
            border: '0.5px solid #2a2010', position: 'relative',
            overflow: 'hidden', transition: 'background 0.3s, border-color 0.3s',
            fontFamily: "'Montserrat', sans-serif"
        }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = '#141108';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#4a3820';
                const bar = (e.currentTarget as HTMLDivElement).querySelector('.gold-bar') as HTMLElement;
                if (bar) bar.style.background = '#b8965a';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = '#0f0d08';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#2a2010';
                const bar = (e.currentTarget as HTMLDivElement).querySelector('.gold-bar') as HTMLElement;
                if (bar) bar.style.background = 'transparent';
            }}
        >
            {/* Gold left bar */}
            <div className="gold-bar" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'transparent', transition: 'background 0.3s' }} />

            {/* Image */}
            <div onClick={() => navigate(`/menu-details/${menu._id}`)}
                style={{ width: 76, height: 76, flexShrink: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <img src={menu.image} alt={menu.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.1) brightness(0.9)' }} />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: '#f0e6cc', margin: '0 0 0.3rem', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {menu.name}
                </p>
                <p style={{ fontSize: 11, color: '#6a6050', letterSpacing: '0.04em', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {menu.description}
                </p>
            </div>

            {/* Price + Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', flexShrink: 0 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#c9a55a', margin: 0 }}>
                    <span style={{ fontSize: '0.75rem', marginRight: 1 }}>₹</span>{menu.price}
                </p>
                {menu.isAvailabel ? (
                    <button onClick={() => addToCart(menu._id)}
                        style={{ background: 'transparent', border: '0.5px solid #b8965a', color: '#b8965a', fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '0.45rem 1.1rem', cursor: 'pointer' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#b8965a'; (e.currentTarget as HTMLButtonElement).style.color = '#0a0a0a'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#b8965a'; }}
                    >
                        Add
                    </button>
                ) : (
                    <p style={{ fontSize: 9, letterSpacing: '0.15em', color: '#4a3820', textTransform: 'uppercase', margin: 0 }}>Unavailable</p>
                )}
            </div>
        </div>
    );
};

export default MenuCard;