import { useEffect, useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";
import MenuCard from "./MenuCard";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const getMenu = async () => {
        try {
            const res = await axios.get("http://3.110.195.60:3000/menu/get");
            setMenu(res.data.items);
            setFilteredMenus(res.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    useEffect(() => {
        if (searchQuery === "") {      //if user hasn't typed anything
            setFilteredMenus(menu);    //showing them the full menu
        } else {
            const filtered = menu.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMenus(filtered);  // update menu to show only the items matching the search
        }
    }, [searchQuery, menu]);

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-orange-400">
                        Our <span className="text-yellow-500">Menu</span>
                    </h1>

                    <p className="text-gray-300 mt-2">
                        Explore our delicious dishes
                    </p>
                </div>

                {/* SEARCH */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />


                        <input
                            type="text"
                            placeholder="Search dish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-400 focus:border-yellow-500 outline-none text-gray-300"
                        />

                        {searchQuery && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                <X className="w-5 h-5 text-gray-300" />
                            </button>
                        )}
                    </div>
                </div>

                {/* RESULT COUNT */}
                <p className="text-center text-gray-300 mb-8">
                    Showing <span className="font-bold">{filteredMenus.length}</span> dishes
                </p>

                {/* MENU GRID */}
                {filteredMenus.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMenus.map((item) => (
                            <MenuCard key={item._id} menu={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-300">
                        <p>😔 No dishes found at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;