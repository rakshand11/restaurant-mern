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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/user/login",
        formData,
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); // ✅ updates Navbar instantly
      console.log(res.data)
      toast.success("Login Successfully 🎉");
      navigate("/");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="bg-black w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          Login
        </h2>

        <p className="text-gray-200 text-center mb-4">
          Please Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg py-3 pl-10 pr-3 text-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg py-3 pl-10 pr-3 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;