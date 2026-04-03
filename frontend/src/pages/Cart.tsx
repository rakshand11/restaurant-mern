import { useEffect, useState } from "react";
import { IndianRupee, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";

interface CartItem {
  _id: string;
  menuItem?: {
    _id: string;
    name: string;
    price: number;
    image: string;
  } | null;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

const Cart = () => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();


  const discountApplied = totalPrice > 1000;
  const discount = discountApplied ? totalPrice * 0.25 : 0;
  const finalAmount = totalPrice - discount;
  const amountNeeded = Math.max(0, 1000 - totalPrice);


  const fetchCartData = async () => {
    try {
      const res = await axios.get("https://api.rakshand.site/cart/get", {
        withCredentials: true,
      });

      const cartData: CartData | null = res.data.cart;

      if (!cartData) {
        setCart({ items: [] });
        setTotalPrice(0);
        return;
      }

      setCart(cartData);

      const total = (cartData.items ?? []).reduce(
        (sum, item) =>
          sum + (item.menuItem?.price ?? 0) * (item.quantity ?? 0),
        0
      );

      setTotalPrice(total);
    } catch (error) {
      console.log("Cart fetch error:", error);
      toast.error("Failed to load cart");
      setCart({ items: [] });
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const removeFromCart = async (menuId: string) => {
    try {
      await axios.delete(`https://api.rakshand.site/cart/delete/${menuId}`, {
        withCredentials: true,
      });
      toast.success("Item removed from cart");
      await fetchCartData();
      await fetchCartCount();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div
        className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-12"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div
          style={{
            textAlign: "center",
            background: "#111008",
            border: "0.5px solid #3a3020",
            borderRadius: "0.5rem",
            padding: "2rem 1.5rem",
            maxWidth: "32rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontWeight: 300,
              color: "#f5ead6",
              margin: "0 0 0.5rem",
            }}
          >
            Your <em style={{ color: "#c9a55a" }}>Cart</em>
          </p>
          <p style={{ fontSize: 12, letterSpacing: "0.12em", color: "#8a7e68" }}>
            Your cart is empty
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

      <div className="max-w-4xl mx-auto bg-[#111008] border border-[#3a3020] rounded-2xl p-8 shadow-xl">
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#b8965a",
            marginBottom: "0.25rem",
            textAlign: "center",
          }}
        >
          Cart
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
          Your <em style={{ color: "#c9a55a" }}>Cart</em>
        </h1>

        <div
          style={{
            marginTop: "1.5rem",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderSpacing: "0 8px",
            }}
          >
            <thead>
              <tr
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#b8965a",
                  fontWeight: 500,
                }}
              >
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.5rem 1rem",
                    borderBottom: "0.5px solid #3a3020",
                  }}
                >
                  Item
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "0.5rem 1rem",
                    borderBottom: "0.5px solid #3a3020",
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "0.5rem 1rem",
                    borderBottom: "0.5px solid #3a3020",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "0.5rem 1rem",
                    borderBottom: "0.5px solid #3a3020",
                  }}
                >
                  Total
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "0.5rem 1rem",
                    borderBottom: "0.5px solid #3a3020",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => (
                <tr
                  key={item._id}
                  style={{
                    background: "#14130a",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                    boxShadow: "0 0 0 1px rgba(58, 48, 32, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.15s ease",
                  }}
                  className="hover:shadow-lg hover:translate-y-[-1px]"
                >
                  {/* Item */}
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      fontSize: 12,
                      color: "#e8e0cc",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      borderBottom: "none",
                    }}
                  >
                    {item.menuItem ? (
                      <>
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: "0.5rem",
                            objectFit: "cover",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {item.menuItem.name}
                        </span>
                      </>
                    ) : (
                      <span
                        style={{
                          color: "#aa4a4a",
                          fontSize: 11,
                        }}
                      >
                        Item no longer available
                      </span>
                    )}
                  </td>

                  {/* Quantity */}
                  <td
                    style={{
                      fontSize: 11,
                      color: "#8a7e68",
                      textAlign: "center",
                      padding: "0.75rem 1rem",
                      borderBottom: "none",
                    }}
                  >
                    {item.menuItem ? item.quantity : "-"}
                  </td>

                  {/* Price */}
                  <td
                    style={{
                      fontSize: 11,
                      color: "#8a7e68",
                      textAlign: "center",
                      padding: "0.75rem 1rem",
                      borderBottom: "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {item.menuItem && <IndianRupee size={14} />}
                      {item.menuItem?.price ?? "-"}
                    </div>
                  </td>

                  {/* Total */}
                  <td
                    style={{
                      fontSize: 11,
                      color: "#b8965a",
                      fontWeight: 500,
                      textAlign: "center",
                      padding: "0.75rem 1rem",
                      borderBottom: "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {item.menuItem && <IndianRupee size={14} />}
                      {item.menuItem
                        ? (item.menuItem.price * item.quantity).toFixed(2)
                        : "-"}
                    </div>
                  </td>

                  {/* Action */}
                  <td
                    style={{
                      textAlign: "center",
                      padding: "0.75rem 1rem",
                      borderBottom: "none",
                    }}
                  >
                    {item.menuItem && (
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.menuItem._id)}
                        style={{
                          padding: 6,
                          borderRadius: "9999px",
                          background: "#14130a",
                          border: "0.5px solid #3a3020",
                          color: "#b8965a",
                          cursor: "pointer",
                          outline: "none",
                        }}
                        className="hover:bg-[#aa4a4a] hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Discount nudge — show when below ₹1000 */}
        {!discountApplied && (
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
              textAlign: "center",
            }}
          >
            🛒 Add{" "}
            <span style={{ fontWeight: 700 }}>
              ₹{amountNeeded.toFixed(2)}
            </span>{" "}
            more to unlock 25% off!
          </div>
        )}

        {/* ✅ Discount applied banner */}
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
              textAlign: "center",
            }}
          >
            🎉 You unlocked{" "}
            <span style={{ fontWeight: 700 }}>25% off!</span> You save ₹
            {discount.toFixed(2)}
          </div>
        )}

        {/* Total & Checkout */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "0.5px solid #3a3020",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {discountApplied && (
              <span
                style={{
                  fontSize: 11,
                  color: "#5a5040",
                  textDecoration: "line-through",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <IndianRupee size={14} />
                {totalPrice.toFixed(2)}
              </span>
            )}
            <h3
              style={{
                fontSize: 14,
                color: "#b8965a",
                fontWeight: 500,
                display: "flex",
                alignItems: "baseline",
                gap: 4,
              }}
            >
              <span>Total:</span>
              <IndianRupee size={12} />
              <span
                style={{
                  color: "#b8965a",
                  fontWeight: 600,
                }}
              >
                {finalAmount.toFixed(2)}
              </span>
            </h3>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            style={{
              padding: "0.75rem 1.25rem",
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
            }}
            className="hover:bg-[#c9a55a] hover:text-white transition-colors active:scale-[0.98]"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;