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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length > 20) {
      toast.error("Password is too long (max 20 characters)");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://api.rakshand.site/user/login",
        formData,
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Login Successful 🎉");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed ❌";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a0a]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div
          style={{
            width: "100%",
            maxWidth: "32rem",
            background: "#111008",
            border: "0.5px solid #3a3020",
            borderRadius: "0.75rem",
            padding: "2rem",
            boxShadow: "0 0 0 1px rgba(58, 48, 32, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)",
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#b8965a",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Login
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.75rem",
              fontWeight: 300,
              color: "#f5ead6",
              margin: "0 auto 0.25rem",
              textAlign: "center",
            }}
          >
            Login
          </h1>

          <p
            style={{
              fontSize: 11,
              color: "#8a7e68",
              textAlign: "center",
              margin: "0.5rem 0 1.5rem",
            }}
          >
            Please login to continue
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Email */}
            <div
              style={{
                position: "relative",
              }}
            >
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#b8965a" }}
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  background: "#2a2214",
                  border: "0.5px solid #3a3020",
                  color: "#f5ead6",
                  paddingLeft: "2.75rem",  // ✅ more space so icon and text don't overlap
                  paddingRight: "0.75rem",
                  padding: "0.75rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  outline: "none",
                }}
              />
            </div>

            {/* Password */}
            <div
              style={{
                position: "relative",
              }}
            >
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#b8965a" }}
                size={18}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  background: "#2a2214",
                  border: "0.5px solid #3a3020",
                  color: "#f5ead6",
                  paddingLeft: "2.75rem",  // ✅ same extra left space
                  paddingRight: "0.75rem",
                  padding: "0.75rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  outline: "none",
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                background: "#b8965a",
                color: "#f5ead6",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                outline: "none",
              }}
              className="hover:bg-[#c9a55a] hover:text-white transition-colors active:scale-[0.98]"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#8a7e68",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#b8965a",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;