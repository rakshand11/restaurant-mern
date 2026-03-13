import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { admin } = useAuth();

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(
                "https://api.rakshand.site/order/all-order",
                { withCredentials: true }
            );

            if (data.success) {
                setOrders(data.orders);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (admin) {
            fetchOrders();
        }
    }, [admin]);

    const handleStatusChange = async (orderId, newStatus) => {
        setLoading(true);

        try {
            await axios.put(
                `https://api.rakshand.site/order/update-status/${orderId}`,
                { status: newStatus },
                { withCredentials: true }
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );

            toast.success("Status updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-2 px-3 sm:px-6">
            <h1 className="text-3xl font-bold text-center my-3 mb-4">All Orders</h1>

            <div className="border border-gray-400 max-w-5xl mx-auto p-4 rounded-lg">

                {/* Header */}
                <div className="hidden md:grid grid-cols-5 font-semibold text-gray-700 mb-8">
                    <div>Name</div>
                    <div>Address</div>
                    <div>Total Amount</div>
                    <div>Payment Method</div>
                    <div>Status</div>
                </div>

                {/* Orders */}
                <ul className="space-y-6">
                    {orders.map((item) => (
                        <li key={item._id} className="border rounded-lg p-4">

                            <div className="flex flex-col md:grid md:grid-cols-5 md:items-center gap-2">

                                <p className="font-medium text-center md:text-left">
                                    {item?.user?.name}
                                </p>

                                <p className="font-medium text-center md:text-left">
                                    {item?.address}
                                </p>

                                <p className="text-gray-700 font-semibold text-center md:text-left">
                                    ₹{item?.totalAmount?.toLocaleString("en-IN")}
                                </p>
                                {item?.discount > 0 && (
                                    <p className="text-green-600">
                                        <span className="font-medium">Discount:</span>{" "}
                                        - ₹{item?.discount?.toLocaleString("en-IN")}
                                    </p>
                                )}

                                <p className="font-semibold text-gray-800">
                                    <span>Total Paid:</span>{" "}
                                    ₹{item?.finalAmount?.toLocaleString("en-IN")}
                                </p>


                                <p className="text-gray-600 hidden md:block">
                                    {item.paymentMethod}
                                </p>

                                <div className="flex justify-center md:justify-start items-center gap-2 mt-2 md:mt-0">
                                    <select
                                        value={item.status}
                                        onChange={(e) =>
                                            handleStatusChange(item._id, e.target.value)
                                        }
                                        disabled={loading}
                                        className="border rounded-md px-3 py-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="mt-4 space-y-2">
                                {item.items?.map((menu, index) => {

                                    const price = menu?.menuItem?.price ?? 0;
                                    const qty = menu?.quantity ?? 0;
                                    const subtotal = price * qty;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 bg-gray-50 border rounded-lg p-3"
                                        >
                                            <img
                                                src={menu?.menuItem?.image}
                                                alt={menu?.menuItem?.name}
                                                className="w-16 h-16 rounded object-cover"
                                            />

                                            <div>

                                                <p className="font-semibold">
                                                    {menu?.menuItem?.name || "Item deleted"}
                                                </p>

                                                <p className="text-sm text-gray-600">
                                                    QTY: {qty}
                                                </p>

                                                <p className="text-sm text-gray-600">
                                                    Price: ₹{price.toLocaleString("en-IN")}
                                                </p>

                                                <p className="text-sm font-semibold text-gray-800">
                                                    Subtotal: ₹{subtotal.toLocaleString("en-IN")}
                                                </p>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default Orders;