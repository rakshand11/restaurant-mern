import { useState, useEffect } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        "https://api.rakshand.site/booking/my-booking",
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem 1rem",
            background: "#111008",
            border: "0.5px solid #3a3020",
            borderRadius: "0.5rem",
            maxWidth: "32rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.75rem",
              fontWeight: 300,
              color: "#f5ead6",
              margin: "0 0 0.5rem",
            }}
          >
            My <em style={{ color: "#c9a55a" }}>Bookings</em>
          </p>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "#8a7e68",
            }}
          >
            Loading your reservations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] py-12 px-4"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

      <div className="max-w-2xl mx-auto">
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
          My Bookings
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            fontWeight: 300,
            color: "#f5ead6",
            margin: "0 auto",
            maxWidth: "18rem",
            textAlign: "center",
          }}
        >
          Your Reservations
        </h1>

        {bookings.length === 0 ? (
          <div
            style={{
              marginTop: "3rem",
              padding: "3rem 1.5rem",
              textAlign: "center",
              background: "#111008",
              border: "0.5px solid #3a3020",
              borderRadius: "0.5rem",
            }}
          >
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: "#3a3020",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 7h8m-8 4h8m-8 4h8M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
              />
            </svg>
            <h3
              style={{
                fontSize: 14,
                color: "#8a7e68",
                margin: "1rem 0 0.5rem",
              }}
            >
              You don’t have any bookings yet
            </h3>
            <p
              style={{
                fontSize: 11,
                color: "#5a5040",
              }}
            >
              Book a table to see your reservations here.
            </p>
          </div>
        ) : (
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bookings.map((booking) => (
              <div
                key={booking._id}
                style={{
                  padding: "1.25rem",
                  background: "#111008",
                  border: "0.5px solid #3a3020",
                  borderRadius: "0.5rem",
                  boxShadow: "0 0 0 1px rgba(58, 48, 32, 0.1), 0 4px 12px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                className="hover:shadow-lg hover:translate-y-[-1px]"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 13,
                      color: "#e8e0cc",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {booking.name}
                  </h3>

                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: 500,
                      ...(booking.status === "pending"
                        ? { background: "#b87a30", color: "#f5ead6" }
                        : booking.status === "approved"
                          ? { background: "#4a553a", color: "#c9a55a" }
                          : { background: "#6a3a3a", color: "#f5ead6" }),
                    }}
                  >
                    {booking.status}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                    fontSize: 11,
                    color: "#8a7e68",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Phone:</span>{" "}
                    {booking.contact}
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Date:</span>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Time:</span>{" "}
                    {booking.time}
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Guests:</span>{" "}
                    {booking.numberOfPeople}
                  </p>

                  {booking.note && (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        marginTop: "0.5rem",
                        fontSize: 11,
                        color: "#8a7e68",
                      }}
                    >
                      <span style={{ fontWeight: 500, color: "#c9a55a" }}>Note:</span>{" "}
                      {booking.note}
                    </div>
                  )}

                  <div
                    style={{
                      gridColumn: "1 / -1",
                      marginTop: "0.5rem",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#5a5040",
                    }}
                  >
                    Booked on:{" "}
                    {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;