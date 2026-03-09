import { useEffect, useState } from "react"
import { IndianRupee, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState<any | null>()
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()

  const fetchCartData = async () => {
    const res = await axios.get("http://localhost:3000/cart/get", {
      withCredentials: true,
    });
    const cartData = res.data.msg;
    setCart(cartData);
    const total = (cartData.items ?? []).reduce(
      (sum: number, item: any) => sum + item.menuItem.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };
  useEffect(() => {
    fetchCartData();
  }, []);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Cart is Empty
        </h2>
      </div>
    );
  }


  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/cart/delete/${menuId}`, { withCredentials: true });
      if (data) {
        toast.success("Item delted from cart");
        fetchCartData();
      }
    } catch (error) {
      toast.error("Failed to delte item")
      console.log(error);
    }
  };

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

                <td className="flex items-center gap-4 px-4 py-4">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  <span className="font-semibold text-gray-800">
                    {item.menuItem.name}
                  </span>
                </td>

                <td className="text-center font-medium text-gray-700">
                  {item.quantity}
                </td>

                <td>
                  <div className="flex justify-center items-center gap-1 text-gray-700">
                    <IndianRupee size={16} />
                    {item.menuItem.price}
                  </div>
                </td>

                <td>
                  <div className="flex justify-center items-center gap-1 font-semibold">
                    <IndianRupee size={16} />
                    {item.menuItem.price * item.quantity}
                  </div>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => removeFromCart(item.menuItem._id)}
                    className="p-2 rounded-full hover:bg-red-100 transition"
                  >
                    <X className="text-red-500" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-10 border-t pt-6">

        <h3 className="text-2xl font-bold flex items-center gap-2">
          Total:
          <span className="text-green-600 flex items-center gap-1">
            <IndianRupee size={20} />
            {totalPrice}
          </span>
        </h3>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium shadow-md transition"
        >
          Checkout
        </button>

      </div>
    </div>
  );
}
export default Cart;