import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import axios from "axios"
import toast from 'react-hot-toast'

const Orders = () => {
    const [loading, setLoading] = useState()
    const [orders, setOrders] = useState([])
    const { admin } = useAuth()

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/order/orders", { withCredentials: true });

            console.log("dataa", data)
            if (data.success) {
                setOrders(data.orders)
            } else {
                console.log(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        console.log("Admin value:", admin);
        if (admin) {
            fetchOrders()
        }
    }, [admin])

    const handleStatusChange = async (orderId, newStatus) => {
        setLoading(true);
        try {
            // Call backend API to update status
            await axios.put(
                `http://localhost:3000/order/update-status/${orderId}`,
                { status: newStatus },
                { withCredentials: true }
            );

            // Update the orders state locally so UI reflects change
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
            toast.success(orders.msg || "updated successfully")
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='py-24 px-3 sm:px-6'>
            <h1 className='text-3xl font-bold text-centre my-3'>All Orders</h1>
            <div className='border border-gray-400 max-w-5xl mx-auto p-3 rounded-lg'>
                {/*Header */}
                <div className='hidden md:grid grid-cols-5 font-semibold text-gray-700 mb-4'>
                    <div>Name</div>
                    <div>Address</div>
                    <div>Total Amount</div>
                    <div>Payment Method</div>
                    <div>Status</div>
                </div>
                {/*Items */}
                <ul className='space-y-4'>
                    {orders.map((item) => (
                        <li key={item._id} className='border rounded-lg p-3 md:p-2'>
                            <div className='flex flex-col md:grid md:grid-cols-5 md:items-centre gap-2 md:gap-0'>
                                <p className="font-medium text-center md:text-left">
                                    {item?.user.name}
                                </p>
                                <p className="font-medium text-center md:text-left">
                                    {item?.address}
                                </p>
                                <p className="text-gray-600 hidden md:block">
                                    ${item?.totalAmount}
                                </p>
                                <p className="text-gray-600 hidden md:block">
                                    {item.paymentMethod}
                                </p>

                                <div className="flex justify-center md:justify-start items-center gap-2 md:gap-5 mt-2 md:mt-0">
                                    <select
                                        name="status"
                                        value={item.status} // will now reflect updated state
                                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                        disabled={loading}
                                        className="border rounded-md px-3 py-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                            {/* ✅ Render Menu Items */}
                            <div className="mt-3">
                                {item.items.map((menu, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 bg-gray-50 border rounded-lg p-2 my-2"
                                    >
                                        <img
                                            src={menu?.menuItem?.image}
                                            alt={menu?.menuItem?.name}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">{menu?.menuItem?.name}</p>
                                            <p className="text-sm text-gray-600">
                                                QTY:{menu?.quantity}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                $:{menu?.menuItem?.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )

}
export default Orders