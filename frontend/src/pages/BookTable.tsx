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
        "https://api.rakshand.site/booking/create",
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
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4"
      style={{ fontFamily: "'Montserrat', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

      <div className="max-w-2xl mx-auto flex items-center justify-center">
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#b8965a",
                marginBottom: "0.75rem",
              }}
            >
              Reserve Your Table
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3rem",
                fontWeight: 300,
                color: "#f5ead6",
                margin: "0 0 0.5rem",
                lineHeight: 1.1,
              }}
            >
              Book Your <em style={{ fontStyle: "italic", color: "#c9a55a" }}>Table</em>
            </h1>
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                color: "#8a7e68",
                fontWeight: 300,
                margin: "0",
              }}
            >
              Select a time and let us serve you
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Name + Email */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.85rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.85rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Phone + Guests */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                required
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.85rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="number"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleChange}
                placeholder="Number of Guests"
                min="1"
                required
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.85rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Date + Time */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.85rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.85rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Note */}
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Special requests (optional)"
              rows={4}
              style={{
                background: "#111008",
                border: "0.5px solid #3a3020",
                color: "#e8e0cc",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 12,
                letterSpacing: "0.1em",
                padding: "0.85rem 1rem",
                borderRadius: "0.5rem",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                background: "linear-gradient(to right, #b8965a, #c9a55a)",
                color: "#f5ead6",
                border: "none",
                padding: "0.85rem 1rem",
                borderRadius: "0.5rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "500",
                cursor: "pointer",
                outline: "none",
              }}
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTable;