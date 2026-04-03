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
  discount: number;
  finalAmount: number;
  items: OrderItem[];
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("https://api.rakshand.site/order/get", {
        withCredentials: true,
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
          My Orders
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            fontWeight: 300,
            color: "#f5ead6",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          Your Orders
        </h1>

        {orders.length === 0 ? (
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
            <p
              style={{
                fontSize: 14,
                color: "#8a7e68",
                margin: "0 0 0.5rem",
              }}
            >
              You have no orders yet
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#5a5040",
              }}
            >
              Place an order to see your history here.
            </p>
          </div>
        ) : (
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
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
                {/* Order header */}
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
                    Order ID:{" "}
                    <span
                      style={{
                        color: "#b8965a",
                        fontWeight: 400,
                      }}
                    >
                      {order._id.slice(-6)}
                    </span>
                  </h3>

                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: 500,
                      ...(order.status === "pending"
                        ? { background: "#b87a30", color: "#f5ead6" }
                        : order.status === "preparing"
                          ? { background: "#3a6a8a", color: "#f5ead6" }
                          : { background: "#4a553a", color: "#f5ead6" }),
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order details */}
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
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Address:</span>{" "}
                    {order.address}
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Payment:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p
                    style={{ margin: 0, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Total:</span>
                    <IndianRupee size={12} />
                    {order.totalAmount}
                  </p>
                  {order.discount > 0 && (
                    <p
                      style={{
                        margin: 0,
                        color: "#3a6a3a",
                        fontSize: 11,
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Discount:</span> - ₹{order.discount}
                    </p>
                  )}
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 500,
                      color: "#e8e0cc",
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Total Paid:</span> ₹{order.finalAmount}
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ fontWeight: 500, color: "#c9a55a" }}>Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Items count */}
                <div
                  style={{
                    marginTop: "0.75rem",
                    fontSize: 11,
                    color: "#5a5040",
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#b8965a" }}>Items:</span>{" "}
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