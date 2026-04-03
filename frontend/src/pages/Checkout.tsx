import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at hotel");

  const [subtotal, setSubtotal] = useState(0);

  const discountApplied = subtotal > 1000;
  const discount = discountApplied ? subtotal * 0.25 : 0;
  const finalTotal = subtotal - discount;
  const amountNeeded = Math.max(0, 1000 - subtotal);

  const fetchCart = async () => {
    try {
      const res = await axios.get("https://api.rakshand.site/cart/get", {
        withCredentials: true,
      });

      const cart = res.data.cart;

      if (!cart || !cart.items) return;

      const total = cart.items.reduce(
        (sum: number, item: any) =>
          sum + (item.menuItem?.price ?? 0) * item.quantity,
        0
      );

      setSubtotal(total);
    } catch (error) {
      console.log("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://api.rakshand.site/order/place",
        { address, paymentMethod },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.msg);
        navigate("/myorder");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Order failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] py-12 px-4"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

      <div className="max-w-4xl mx-auto bg-[#111008] border border-[#3a3020] rounded-2xl p-8 shadow-xl">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="md:grid-cols-2"
        >
          {/* Address Section */}
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#b8965a",
                margin: "0 0 0.25rem",
              }}
            >
              Delivery Address
            </p>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#f5ead6",
                margin: "0 0 1rem",
              }}
            >
              Your <em style={{ color: "#c9a55a" }}>Address</em>
            </h2>

            <textarea
              rows={5}
              value={address}
              placeholder="Enter your full address"
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: "100%",
                background: "#2a2214",
                border: "0.5px solid #3a3020",
                color: "#e8e0cc",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 12,
                letterSpacing: "0.1em",
                padding: "0.85rem 1rem",
                borderRadius: "0.5rem",
                outline: "none",
              }}
            />

            {/* Nudge banner for discount */}
            {!discountApplied && subtotal > 0 && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1rem",
                  background: "#aa7a2a",
                  border: "0.5px solid #b8965a",
                  borderRadius: "0.5rem",
                  fontSize: 11,
                  color: "#f5ead6",
                  fontWeight: 500,
                }}
              >
                🛒 Add <span style={{ fontWeight: 700 }}>₹{amountNeeded.toFixed(2)}</span> more to unlock 25% off!
              </div>
            )}

            {discountApplied && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1rem",
                  background: "#3a5a40",
                  border: "0.5px solid #4a553a",
                  borderRadius: "0.5rem",
                  fontSize: 11,
                  color: "#f5ead6",
                  fontWeight: 500,
                }}
              >
                🎉 You unlocked <span style={{ fontWeight: 700 }}>25% off!</span> You save ₹{discount.toFixed(2)}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#b8965a",
                  margin: "0 0 0.25rem",
                }}
              >
                Order Summary
              </p>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#f5ead6",
                  margin: "0 0 1rem",
                }}
              >
                Order <em style={{ color: "#c9a55a" }}>Summary</em>
              </h2>

              <div
                style={{
                  background: "#14130a",
                  border: "0.5px solid #3a3020",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 11,
                    color: "#8a7e68",
                    gap: "0.5rem",
                  }}
                >
                  <span>Subtotal</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1,
                    }}
                  >
                    {discountApplied ? (
                      <span
                        style={{
                          color: "#5a5040",
                          textDecoration: "line-through",
                        }}
                      >
                        <IndianRupee size={14} /> {subtotal.toFixed(2)}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#b8965a",
                        }}
                      >
                        <IndianRupee size={14} /> {subtotal.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {discountApplied && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 11,
                      color: "#3a6a3a",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <span>Discount (25%)</span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1,
                      }}
                    >
                      - <IndianRupee size={14} /> {discount.toFixed(2)}
                    </div>
                  </div>
                )}

                <hr
                  style={{
                    border: "0",
                    borderTop: "0.5px solid #3a3020",
                    margin: "0.5rem 0",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#b8965a",
                    gap: "0.5rem",
                  }}
                >
                  <span>Total</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1,
                    }}
                  >
                    <IndianRupee size={16} /> {finalTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#b8965a",
                    margin: "0 0 0.25rem",
                    fontWeight: 500,
                  }}
                >
                  Payment Method
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: 11,
                      color: "#b8965a",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Pay at hotel"
                      checked={paymentMethod === "Pay at hotel"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginLeft: "0.25rem" }}
                    />
                    <span>Pay at hotel</span>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: 11,
                      color: "#b8965a",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Online Payment"
                      checked={paymentMethod === "Online Payment"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginLeft: "0.25rem" }}
                    />
                    <span>Online Payment</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="button"
              onClick={handleCheckout}
              style={{
                marginTop: "1.5rem",
                padding: "0.85rem 1rem",
                background: "#b8965a",
                color: "#f5ead6",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                outline: "none",
                width: "100%",
              }}
              className="hover:bg-[#c9a55a] hover:text-white transition-colors active:scale-[0.98]"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;