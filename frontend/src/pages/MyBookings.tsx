import { useState, useEffect } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("https://api.rakshand.site/booking/my-booking", {
        withCredentials: true,
      });
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
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-red-50">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          My Bookings
        </h2>
        <p className="text-center text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-red-50 p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-10">
          <svg
            className="w-16 h-16 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 7h8m-8 4h8m-8 4h8M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700">
            You don’t have any bookings yet
          </h3>
          <p className="mt-1 text-gray-500">
            Book a table to see your reservations here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-transform hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.name}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
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
                  <div className="col-span-1 sm:col-span-2 mt-3 text-gray-700">
                    <span className="font-medium">Note:</span> {booking.note}
                  </div>
                )}
                <div className="col-span-1 sm:col-span-2 mt-3 text-gray-500 text-xs">
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
      )}
    </div>
  );
};

export default MyBookings;