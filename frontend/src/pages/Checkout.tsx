import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at hotel");
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart and calculate total
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cart/get", {
        withCredentials: true,
      });

      const cart = res.data.msg;

      const total = cart.items.reduce(
        (sum: number, item: any) =>
          sum + item.menuItem.price * item.quantity,
        0
      );

      setTotalPrice(total);
    } catch (error) {
      console.log(error);
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
        {
          address,
          paymentMethod,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        navigate("/myorder");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Order failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white shadow-xl rounded-2xl">

      {/* LEFT SIDE - Address */}
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
      </div>

      {/* RIGHT SIDE - Order Summary */}
      <div className="flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
            <p className="flex justify-between items-center text-lg font-medium text-gray-700">
              <span>Total Amount:</span>

              <span className="text-green-600 font-semibold flex items-center gap-1">
                <IndianRupee size={18} />
                {totalPrice}
              </span>
            </p>
          </div>

          {/* Payment */}
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

        {/* Confirm Button */}
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