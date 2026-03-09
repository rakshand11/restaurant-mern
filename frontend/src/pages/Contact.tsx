import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-red-50">

      {/* HERO */}
      <div
        className="relative h-[200px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/lights.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              We'd love to hear from you 🍽️
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* CONTACT INFO */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-gray-800">
              Get in Touch
            </h2>

            <div className="space-y-7">

              {/* Address */}
              <div className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Address
                  </h3>
                  <p className="text-gray-600 mt-1">
                    123 Restaurant Street <br />
                    Food District, City 12345
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Phone className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Phone
                  </h3>
                  <p className="text-gray-600 mt-1">+91 98765 43210</p>
                  <p className="text-gray-600">+91 91234 56789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Mail className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Email
                  </h3>
                  <p className="text-gray-600 mt-1">info@restaurant.com</p>
                  <p className="text-gray-600">reservations@restaurant.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Clock className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Opening Hours
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Friday: 11 AM – 10 PM
                  </p>
                  <p className="text-gray-600">
                    Saturday - Sunday: 10 AM – 11 PM
                  </p>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
                alt="Restaurant"
                className="w-full h-64 object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="bg-black rounded-2xl shadow-xl p-12 border border-gray-700">

            <h2 className="text-3xl font-bold mb-8 text-orange-400">
              Send a Message
            </h2>

            {submitted && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Message sent successfully 🎉
              </div>
            )}

            <div className="space-y-6">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-gray-200 bg-transparent"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-gray-200 bg-transparent"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-gray-200 bg-transparent"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-gray-200 bg-transparent"
              />

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message..."
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-gray-200 bg-transparent"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;