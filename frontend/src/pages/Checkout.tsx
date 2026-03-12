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

  // ✅ Derive discount values directly from subtotal
  const discountApplied = subtotal > 1000;
  const discount = discountApplied ? subtotal * 0.25 : 0;
  const finalTotal = subtotal - discount;
  const amountNeeded = Math.max(0, 1000 - subtotal);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/cart/get",
        { withCredentials: true }
      );

      const cart = res.data.cart;  // ✅ fixed: was res.data.msg

      if (!cart || !cart.items) return;

      const total = cart.items.reduce(
        (sum: number, item: any) =>
          sum + (item.menuItem?.price ?? 0) * item.quantity,
        0
      );

      setSubtotal(total);  // ✅ only set subtotal, rest is derived

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
        "http://localhost:3000/order/place",
        { address, paymentMethod },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.msg);  // ✅ shows "🎉 25% discount applied! You saved ₹X" from backend
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
    <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white shadow-xl rounded-2xl">

      {/* Address Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Delivery Address
        </h2>

        <textarea
          rows={5}
          value={address}
          placeholder="Enter your full address"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
        />

        {/* ✅ Nudge banner inside address section */}
        {!discountApplied && subtotal > 0 && (
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-orange-700 text-sm font-medium">
            🛒 Add <span className="font-bold">₹{amountNeeded.toFixed(2)}</span> more to unlock 25% off!
          </div>
        )}

        {discountApplied && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm font-medium">
            🎉 You unlocked <span className="font-bold">25% off!</span> You save ₹{discount.toFixed(2)}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6 space-y-3">

            <p className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="flex items-center gap-1">
                {/* ✅ strikethrough when discount applied */}
                {discountApplied
                  ? <span className="line-through text-gray-400 flex items-center gap-1"><IndianRupee size={16} />{subtotal.toFixed(2)}</span>
                  : <span className="flex items-center gap-1"><IndianRupee size={16} />{subtotal.toFixed(2)}</span>
                }
              </span>
            </p>

            {discountApplied && (
              <p className="flex justify-between text-green-600">
                <span>Discount (25%)</span>
                <span className="flex items-center gap-1">
                  - <IndianRupee size={16} />{discount.toFixed(2)}
                </span>
              </p>
            )}

            <hr />

            <p className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total</span>
              <span className="flex items-center gap-1 text-green-600">
                <IndianRupee size={18} />{finalTotal.toFixed(2)}
              </span>
            </p>

          </div>

          {/* Payment Method */}
          <h3 className="text-lg font-medium mb-3 text-gray-800">
            Payment Method
          </h3>

          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Pay at hotel"
                checked={paymentMethod === "Pay at hotel"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Pay at hotel</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handleCheckout}
          className="mt-8 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          Confirm Order
        </button>
      </div>

    </div>
  );
};

export default Checkout;