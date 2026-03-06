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


const AppContent = () => {
  const location = useLocation();
  const adminPath = location.pathname.includes("admin");
  const { admin } = useAuth();
  console.log("Admin:", admin);
  // #region agent log
  fetch("http://127.0.0.1:7866/ingest/682cf489-24f8-4080-90fa-ff7e30265dc4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "84194c",
    },
    body: JSON.stringify({
      sessionId: "84194c",
      runId: "admin-debug-1",
      hypothesisId: "H1",
      location: "src/App.tsx:32",
      message: "AppContent admin route state",
      data: {
        pathname: location.pathname,
        adminPath,
        hasAdmin: !!admin,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => { });
  // #endregion agent log

  return (
    <div>
      <Toaster />
      {!adminPath && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booktable" element={<BookTable />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/order" element={<MyOrders />} />

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