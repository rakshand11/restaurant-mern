import { useState } from "react";
import { User2, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/user/register",
        formData
      );

      toast.success("Registered Successfully 🎉");

      navigate("/login");

    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="bg-black w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="relative">
            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg py-3 pl-10 pr-3 text-white"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 underline">
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;