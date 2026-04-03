import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length > 20) {
      toast.error("Password is too long (max 20 characters)");
      return;
    }
    try {
      setLoading(true);
      const endpoint = isAdmin
        ? "https://api.rakshand.site/user/admin/login"
        : "https://api.rakshand.site/user/login";

      const res = await axios.post(endpoint, formData, { withCredentials: true });

      if (isAdmin) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        toast.success("Admin Login Successful 🎉");
        navigate("/admin");
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        toast.success("Login Successful 🎉");
        navigate("/");
      }
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed ❌";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#2a2214",
    border: "0.5px solid #3a3020",
    color: "#f5ead6",
    padding: "0.75rem 0.75rem 0.75rem 2.75rem",
    borderRadius: "0.5rem",
    fontSize: 12,
    letterSpacing: "0.1em",
    outline: "none",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');`}</style>

      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div style={{
          width: "100%", maxWidth: "32rem", background: "#111008",
          border: "0.5px solid #3a3020", borderRadius: "0.75rem", padding: "2rem",
          boxShadow: "0 0 0 1px rgba(58, 48, 32, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)",
        }}>

          {/* Toggle */}
          <div style={{
            display: "flex", background: "#1a1508", borderRadius: "0.5rem",
            padding: "0.25rem", marginBottom: "1.5rem", border: "0.5px solid #3a3020"
          }}>
            <button type="button" onClick={() => setIsAdmin(false)} style={{
              flex: 1, padding: "0.5rem", borderRadius: "0.35rem", fontSize: 11,
              letterSpacing: "0.1em", textTransform: "uppercase", border: "none",
              cursor: "pointer", transition: "all 0.2s",
              background: !isAdmin ? "#b8965a" : "transparent",
              color: !isAdmin ? "#f5ead6" : "#8a7e68",
            }}>User</button>
            <button type="button" onClick={() => setIsAdmin(true)} style={{
              flex: 1, padding: "0.5rem", borderRadius: "0.35rem", fontSize: 11,
              letterSpacing: "0.1em", textTransform: "uppercase", border: "none",
              cursor: "pointer", transition: "all 0.2s",
              background: isAdmin ? "#b8965a" : "transparent",
              color: isAdmin ? "#f5ead6" : "#8a7e68",
            }}>Admin</button>
          </div>

          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "#b8965a", marginBottom: "0.5rem", textAlign: "center" }}>
            {isAdmin ? "Admin Access" : "Login"}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 300, color: "#f5ead6", margin: "0 auto 0.25rem", textAlign: "center" }}>
            {isAdmin ? "Admin Login" : "Login"}
          </h1>
          <p style={{ fontSize: 11, color: "#8a7e68", textAlign: "center", margin: "0.5rem 0 1.5rem" }}>
            {isAdmin ? "Restricted access — admins only" : "Please login to continue"}
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#b8965a" }} size={18} />
              <input type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleChange} required style={inputStyle} />
            </div>

            <div style={{ position: "relative" }}>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#b8965a" }} size={18} />
              <input type="password" name="password" placeholder="Password"
                value={formData.password} onChange={handleChange} required style={inputStyle} />
            </div>

            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: "0.85rem 1rem", background: "#b8965a", color: "#f5ead6", border: "none", borderRadius: "0.5rem", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer" }}
              className="hover:bg-[#c9a55a] hover:text-white transition-colors active:scale-[0.98]">
              {loading ? "Loading..." : isAdmin ? "Access Admin Panel" : "Login"}
            </button>
          </form>

          {!isAdmin && (
            <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8a7e68", marginTop: "1rem", textAlign: "center" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#b8965a", fontWeight: 500, textDecoration: "underline" }}>Sign Up</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;