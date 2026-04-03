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
    <div
      className="min-h-screen bg-[#0a0a08] text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }
        .contact-input {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-input:focus {
          border-color: #c9a55a;
          box-shadow: 0 0 0 2px rgba(201, 165, 90, 0.3);
        }
      `}</style>

      {/* Hero section */}
      <div
        className="relative h-[220px] md:h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/lights.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center px-4">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.25rem",
                fontWeight: 300,
                margin: "0 0 0.25rem",
                color: "#f5ead6",
              }}
              className="animate-fade-in"
            >
              Contact <em style={{ color: "#c9a55a" }}>Us</em>
            </h1>
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                color: "#8a7e68",
              }}
              className="animate-fade-in"
              style={{ animationDelay: "0.2s", opacity: 0 }}
            >
              We'd love to hear from you
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
          }}
          className="md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] lg:gap-8"
        >
          {/* Contact info */}
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#b8965a",
                margin: "0 0 0.5rem",
              }}
            >
              Get in Touch
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Address */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div
                  style={{
                    background: "#b8965a",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <MapPin className="text-white w-4 h-4" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#b8965a",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    Address
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#e8e0cc",
                    }}
                  >
                    123 Restaurant Street <br />
                    Food District, City 12345
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div
                  style={{
                    background: "#b8965a",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Phone className="text-white w-4 h-4" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#b8965a",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    Phone
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#e8e0cc",
                    }}
                  >
                    +91 98765 43210
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#e8e0cc",
                    }}
                  >
                    +91 91234 56789
                  </p>
                </div>
              </div>

              {/* Email */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div
                  style={{
                    background: "#b8965a",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Mail className="text-white w-4 h-4" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#b8965a",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    Email
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#e8e0cc",
                    }}
                  >
                    info@restaurant.com
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#e8e0cc",
                    }}
                  >
                    reservations@restaurant.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div
                  style={{
                    background: "#b8965a",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Clock className="text-white w-4 h-4" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#b8965a",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    Opening Hours
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#e8e0cc",
                    }}
                  >
                    Monday – Friday: 11 AM – 10 PM
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#e8e0cc",
                    }}
                  >
                    Saturday – Sunday: 10 AM – 11 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Small image section */}
            <div
              style={{
                marginTop: "1.5rem",
                borderRadius: "0.5rem",
                overflow: "hidden",
                border: "0.5px solid #3a3020",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
                alt="Restaurant"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "12rem",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: "#111008",
              border: "0.5px solid #3a3020",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#b8965a",
                margin: "0 0 0.5rem",
              }}
            >
              Send a Message
            </p>

            {submitted && (
              <div
                style={{
                  fontSize: 11,
                  color: "#e8e0cc",
                  padding: "0.75rem 1rem",
                  background: "#1a140c",
                  border: "0.5px solid #3a3020",
                  borderRadius: "0.5rem",
                  margin: "0 0 1rem",
                }}
              >
                Message sent successfully 🎉
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                }}
                className="contact-input"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                }}
                className="contact-input"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                }}
                className="contact-input"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                }}
                className="contact-input"
              />

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message..."
                style={{
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  color: "#e8e0cc",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  resize: "vertical",
                }}
                className="contact-input"
              />

              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  background: "linear-gradient(to right, #b8965a, #c9a55a)",
                  color: "#f5ead6",
                  border: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  outline: "none",
                  transition: "transform 0.2s ease",
                }}
                className="hover:translate-y-[-1px] hover:shadow-md"
              >
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