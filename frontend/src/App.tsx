import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import BookTable from "./pages/BookTable";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import MyBookings from "./pages/MyBookings";
import MyOrders from "./pages/MyOrders";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import AdminLogin from "./pages/Admin/AdminLogin";
import { useAuth } from "./context/AuthProvider";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AddCategory from "./pages/Admin/AddCategory";
import AddMenu from "./pages/Admin/AddMenu";
import Category from "./pages/Admin/Category";
import Menus from "./pages/Admin/Menus";
import Orders from "./pages/Admin/Orders";
import Bookings from "./pages/Admin/Bookings";
import MenuDetails from "./pages/MenuDetails";
import Checkout from "./pages/Checkout";


const AppContent = () => {
  const location = useLocation();
  const adminPath = location.pathname.includes("admin");
  const { admin } = useAuth();



  return (
    <div>
      <Toaster />
      {!adminPath && <Navbar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:id" element={<MenuDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/myorder" element={<MyOrders />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin Routes */}
        <Route path="/admin" element={admin ? <AdminLayout /> : <AdminLogin />}>

          <Route index element={<Dashboard />} />

          <Route path="/admin/add-category" element={<AddCategory />} />

          <Route path="/admin/add-menu" element={<AddMenu />} />

          <Route path="/admin/category" element={<Category />} />

          <Route path="/admin/menus" element={<Menus />} />

          <Route path="/admin/orders" element={<Orders />} />

          <Route path="/admin/bookings" element={<Bookings />} />

        </Route>
      </Routes>
      {!adminPath && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;