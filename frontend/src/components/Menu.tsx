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
    category: { _id: string; name: string } | string;
}

const Menu = () => {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("category");

    useEffect(() => {
        let cancelled = false;

        axios
            .get("https://api.rakshand.site/menu/get")
            .then((res) => {
                const items: MenuItem[] = res.data?.items ?? [];
                console.log("Sample item:", JSON.stringify(items[0], null, 2));
                if (!cancelled) setMenus(items);
            })
            .catch((error) => console.log(error));

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredMenus = useMemo(() => {
        let items = menus;

        if (categoryId) {
            items = items.filter((menu) => {
                const catId =
                    typeof menu.category === "object" ? menu.category._id : menu.category;
                return catId === categoryId;
            });
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            items = items.filter((menu) => menu.name.toLowerCase().includes(query));
        }

        return items;
    }, [menus, categoryId, searchQuery]);

    const handleClearSearch = () => setSearchQuery("");

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 py-14 px-4">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Our Menu</h1>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search food..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-12 py-4 rounded-full bg-white border border-gray-300
                       text-gray-900 placeholder-gray-500 focus:border-orange-500
                       focus:shadow-sm focus:shadow-orange-500/30 outline-none transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Menu List */}
                {filteredMenus.length > 0 ? (
                    <div className="space-y-6">
                        {filteredMenus.map((menu) => (
                            <MenuCard key={menu._id} menu={menu} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-10 space-y-3">
                        <p className="text-gray-600 text-center">No dishes found</p>
                        <button
                            onClick={handleClearSearch}
                            className="text-sm px-4 py-2 rounded-full bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 transition"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;