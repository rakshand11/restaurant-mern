import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";
import MenuCard from "../components/MenuCard";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailabel?: boolean;
}

const Menu = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    axios
      .get("http://localhost:3000/menu/get")
      .then((res) => {
        const items: MenuItem[] = res.data?.items ?? [];
        if (!cancelled) setMenus(items);
      })
      .catch((error) => console.log(error));

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMenus = useMemo(() => {
    if (searchQuery.trim() === "") return menus;
    const query = searchQuery.toLowerCase();
    return menus.filter((menu) => menu.name.toLowerCase().includes(query));
  }, [searchQuery, menus]);

  const handleClearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Delicious Menu
            </span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Discover our handcrafted dishes prepared with fresh ingredients
            and authentic flavors. Find your favorite meal below.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Search your favorite dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-full border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all shadow-sm"
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
          </div>
        </div>

        {/* Result Counter */}
        <div className="mb-10 text-center">
          <p className="text-gray-600 text-lg">
            {searchQuery ? (
              <>
                Found{" "}
                <span className="font-bold text-yellow-600">
                  {filteredMenus.length}
                </span>{" "}
                {filteredMenus.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-gray-800">
                  "{searchQuery}"
                </span>
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-yellow-600">
                  {filteredMenus.length}
                </span>{" "}
                {filteredMenus.length === 1 ? "dish" : "dishes"}
              </>
            )}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenus.map((menu) => (
              <MenuCard menu={menu} key={menu._id} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No dishes found
            </h2>

            <p className="text-gray-500 mb-6">
              We couldn't find anything matching your search.
            </p>

            <button
              onClick={handleClearSearch}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;