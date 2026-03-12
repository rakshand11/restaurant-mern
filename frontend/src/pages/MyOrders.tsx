import { useEffect, useState } from "react";
import axios from "axios";
import { IndianRupee } from "lucide-react";

interface OrderItem {
  menuItem?: {
    name: string;
    image: string;
    price: number;
  } | null;
  quantity: number;
}

interface Order {
  _id: string;
  address: string;
  paymentMethod: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  discount: number,
  finalAmount: number
  items: OrderItem[];
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/order/get", {
        withCredentials: true
      });

      console.log("Orders API response:", data);

      if (data.success) {
        setOrders(data.orders || []);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="bg-red-50 min-h-screen">
      <div className="max-w-5xl mx-auto py-24 px-4">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">
            You have no orders yet
          </p>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition"
              >

                {/* Order Header */}
                <div className="flex justify-between items-center mb-3">

                  <h3 className="text-lg font-semibold text-gray-800">
                    Order ID:
                    <span className="text-green-600 ml-1">
                      {order._id.slice(-6)}
                    </span>
                  </h3>

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "preparing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {order.status}
                  </span>

                </div>


                {/* Order Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">

                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {order.address}
                  </p>

                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    {order.paymentMethod}
                  </p>

                  <p className="flex items-center gap-1">
                    <span className="font-medium">Total:</span>
                    <IndianRupee size={14} />
                    {order.totalAmount}
                  </p>
                  {order.discount > 0 && (
                    <p className="text-green-600">
                      <span className="font-medium">Discount:</span> - ₹{order.discount}
                    </p>
                  )}

                  <p className="font-semibold">
                    <span>Total Paid:</span> ₹{order.finalAmount}
                  </p>

                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>


                {/* Items Count */}
                <div className="mt-4 text-gray-600 text-sm">
                  <span className="font-medium">Items:</span>{" "}
                  {order.items.length} product(s)
                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;