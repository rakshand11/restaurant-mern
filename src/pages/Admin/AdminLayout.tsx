import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Utensils, ShoppingBag, Grid3X3, BookAIcon } from "lucide-react";

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
        { name: "Add Category", path: "/admin/add-category", icon: PlusCircle },
        { name: "Add Menu", path: "/admin/add-menu", icon: Utensils },
        { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
        { name: "All Menus", path: "/admin/menus", icon: Utensils },
        { name: "All Categories", path: "/admin/category", icon: Grid3X3 },
        { name: "Bookings", path: "/admin/bookings", icon: BookAIcon }
    ];

    const isActive = (path: string, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path) && path !== "/admin";
    };

    const currentPage =
        menuItems.find((item) => location.pathname === item.path)?.name ||
        "Admin Panel";

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                </div>

                <nav className="mt-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path, item.exact);

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${active ? "bg-blue-50 border-r-4 border-blue-500 text-blue-600" : ""
                                    }`}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {currentPage}
                    </h1>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Admin</span>
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 flex-1 overflow-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;