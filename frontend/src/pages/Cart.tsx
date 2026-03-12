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

  // ✅ Discount calculations
  const discountApplied = totalPrice > 1000;
  const discount = discountApplied ? totalPrice * 0.25 : 0;
  const finalAmount = totalPrice - discount;
  const amountNeeded = Math.max(0, 1000 - totalPrice);

  // Fetch cart from backend
  const fetchCartData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cart/get", {
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
      await axios.delete(`http://localhost:3000/cart/delete/${menuId}`, {
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
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Cart is Empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-14 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Cart
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-600 text-sm uppercase tracking-wide">
              <th className="text-left px-4">Item</th>
              <th className="text-center px-4">Qty</th>
              <th className="text-center px-4">Price</th>
              <th className="text-center px-4">Total</th>
              <th className="text-center px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {cart.items.map((item) => (
              <tr
                key={item._id}
                className="bg-gray-50 shadow-sm rounded-xl hover:shadow-md transition"
              >
                {/* Item */}
                <td className="flex items-center gap-4 px-4 py-4">
                  {item.menuItem ? (
                    <>
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <span className="font-semibold text-gray-800">
                        {item.menuItem.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-red-500">Item no longer Availabel</span>
                  )}
                </td>

                {/* Quantity */}
                <td className="text-center font-medium text-gray-700">
                  {item.menuItem ? item.quantity : "-"}
                </td>

                {/* Price */}
                <td>
                  <div className="flex justify-center items-center gap-1 text-gray-700">
                    {item.menuItem && <IndianRupee size={16} />}
                    {item.menuItem?.price ?? "-"}
                  </div>
                </td>

                {/* Total */}
                <td>
                  <div className="flex justify-center items-center gap-1 font-semibold">
                    {item.menuItem && <IndianRupee size={16} />}
                    {item.menuItem ? item.menuItem.price * item.quantity : "-"}
                  </div>
                </td>

                {/* Action */}
                <td className="text-center">
                  {item.menuItem && (
                    <button
                      onClick={() => removeFromCart(item.menuItem._id)}
                      className="p-2 rounded-full hover:bg-red-100 transition"
                    >
                      <X className="text-red-500" size={20} />
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
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl px-6 py-3 text-orange-700 text-sm font-medium">
          🛒 Add <span className="font-bold">₹{amountNeeded.toFixed(2)}</span> more to unlock 25% off!
        </div>
      )}

      {/* ✅ Discount applied banner */}
      {discountApplied && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl px-6 py-3 text-green-700 text-sm font-medium">
          🎉 You unlocked <span className="font-bold">25% off!</span> You save ₹{discount.toFixed(2)}
        </div>
      )}

      {/* Total & Checkout */}
      <div className="flex justify-between items-center mt-10 border-t pt-6">
        <div className="flex flex-col gap-1">

          {/* ✅ Show original total strikethrough when discount applied */}
          {discountApplied && (
            <span className="text-gray-400 line-through text-sm flex items-center gap-1">
              <IndianRupee size={14} />
              {totalPrice.toFixed(2)}
            </span>
          )}

          <h3 className="text-2xl font-bold flex items-center gap-2">
            Total:
            <span className="text-green-600 flex items-center gap-1">
              <IndianRupee size={20} />
              {finalAmount.toFixed(2)}
            </span>
          </h3>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium shadow-md transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;