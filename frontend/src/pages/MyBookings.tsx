import { useState, useEffect } from "react";
import axios from "axios"


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("https://api.rakshand.site/booking/my-booking", { withCredentials: true });
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  console.log(bookings);

  return (
    <div className="max-w-5xl mx-auto mt-10  bg-red-50 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Bookings</h2>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.name}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full ${booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <p>
                <span className="font-medium">Phone:</span> {booking.contact}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Time:</span> {booking.time}
              </p>
              <p>
                <span className="font-medium">Guests:</span>{" "}
                {booking.numberOfPeople}
              </p>
              {booking.note && (
                <div className="mt-3 text-gray-700">
                  <span className="font-medium">Note:</span> {booking.note}
                </div>
              )}
              <div className="mt-3 text-gray-500 text-sm">
                Booked on:
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
    </div>
  );
};
export default MyBookings;