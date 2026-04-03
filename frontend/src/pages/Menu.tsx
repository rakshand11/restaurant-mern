import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import MenuCard from "../components/MenuCard";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailabel?: boolean;
  category: { _id: string; name: string };
}

const Menu = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    let cancelled = false;
    axios.get("https://api.rakshand.site/menu/get")
      .then((res) => {
        if (!cancelled) setMenus(res.data?.items ?? []);
      })
      .catch(console.log);
    return () => { cancelled = true; };
  }, []);

  const filteredMenus = useMemo(() => {
    let items = menus;
    if (categoryId) {
      items = items.filter((m) => m.category?._id === categoryId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((m) => m.name.toLowerCase().includes(q));
    }
    return items;
  }, [menus, categoryId, searchQuery]);

  const categoryName = categoryId
    ? menus.find((m) => m.category?._id === categoryId)?.category?.name
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4"
      style={{ fontFamily: "'Montserrat', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

      {/* Header */}
      <div className="text-center mb-10">
        <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '0.75rem' }}>
          Culinary Excellence
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 300, color: '#f5ead6', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
          Our <em style={{ fontStyle: 'italic', color: '#c9a55a' }}>Menu</em>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem auto', maxWidth: 260 }}>
          <div style={{ flex: 1, height: '0.5px', background: '#3a3020' }} />
          <div style={{ width: 6, height: 6, background: '#b8965a', transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, height: '0.5px', background: '#3a3020' }} />
        </div>
        <p style={{ fontSize: 12, letterSpacing: '0.12em', color: '#8a7e68', fontWeight: 300 }}>
          Handcrafted with the finest ingredients
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#b8965a', opacity: 0.6 }} />
        <input
          type="text"
          placeholder="Search the menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%', background: '#111008', border: '0.5px solid #3a3020',
            color: '#e8e0cc', fontFamily: "'Montserrat', sans-serif", fontSize: 12,
            letterSpacing: '0.1em', padding: '0.85rem 2.5rem 0.85rem 2.8rem',
            outline: 'none', boxSizing: 'border-box'
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{ color: '#5a5040', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '0.5px solid #2a2010' }}>
          {categoryName ?? "All dishes"}
        </p>

        {filteredMenus.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filteredMenus.map((menu) => (
              <MenuCard key={menu._id} menu={menu} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#3a3020', fontStyle: 'italic' }}>
              No dishes found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;