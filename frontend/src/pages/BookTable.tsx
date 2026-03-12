import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookTable = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://3.110.195.60:3000/booking/create",
        formData,
        { withCredentials: true }
      );

      if (data) {
        toast.success("Booking created successfully");
      }
    } catch (error) {
      toast.error("Booking not confirmed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-4xl bg-black shadow-2xl rounded-3xl p-10 border border-gray-100">

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-orange-400">
            Reserve Your Table
          </h2>
          <p className="text-white mt-2">
            Book your table and enjoy a delicious dining experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-400 rounded-xl p-4 w-full focus:ring-2 focus:ring-orange-400 outline-none transition text-gray-300"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-400 rounded-xl p-4 w-full focus:ring-2 focus:ring-orange-400 text-gray-300 outline-none transition"
              required
            />
          </div>

          {/* Phone + Guests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="border border-gray-400 rounded-xl p-4 w-full focus:ring-2 focus:ring-orange-400  text-gray-300 outline-none transition"
              required
            />

            <input
              type="number"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              placeholder="Number of Guests"
              min="1"
              className="border border-gray-400 rounded-xl p-4 w-full focus:ring-2 focus:ring-orange-400 text-gray-300 outline-none transition"
              required
            />
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-400 rounded-xl p-4 w-full focus:ring-2 focus:ring-orange-400 text-gray-300 outline-none transition"
              required
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border border-gray-400 rounded-xl p-4 w-full focus:ring-2 focus:ring-orange-400 text-gray-300 outline-none transition"
              required
            />
          </div>

          {/* Note */}
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Special requests (optional)"
            rows={4}
            className="border border-gray-400 rounded-xl p-4 w-full focus:ring-2 focus:ring-orange-400 text-gray-300 outline-none transition resize-none"
          ></textarea>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-md"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTable;