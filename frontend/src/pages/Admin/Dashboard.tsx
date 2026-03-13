import React, { useEffect, useState } from "react"
import axios from "axios"
import { ShoppingBag, DollarSign, TrendingUp, Clock, IndianRupee } from "lucide-react"

interface Order {
    _id: string
    totalAmount: number
    status: string
    createdAt: string
    items: any[]
}

const Dashboard = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    const getOrders = async () => {
        try {
            const { data } = await axios.get("https://api.rakshand.site/order/all-order", {
                withCredentials: true
            })
            setOrders(data.orders)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    // Calculations
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)

    const todayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt).toDateString()
        return orderDate === new Date().toDateString()
    })

    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0)
    const pendingOrders = orders.filter(o => o.status === "pending").length

    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "delivered": return "bg-green-100 text-green-700"
            case "pending": return "bg-yellow-100 text-yellow-700"
            case "preparing": return "bg-blue-100 text-blue-700"
            case "cancelled": return "bg-red-100 text-red-700"
            default: return "bg-gray-100 text-gray-600"
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Total Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                        <ShoppingBag size={22} className="text-orange-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <IndianRupee size={22} className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-800 flex items-center"><IndianRupee />{totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Today's Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <TrendingUp size={22} className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Today's Orders</p>
                        <p className="text-2xl font-bold text-gray-800">{todayOrders.length}</p>
                        <p className="text-xs text-gray-400 flex items-center"><IndianRupee size={14} />{todayRevenue.toLocaleString()} revenue</p>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                        <Clock size={22} className="text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pending Orders</p>
                        <p className="text-2xl font-bold text-gray-800">{pendingOrders}</p>
                    </div>
                </div>

            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-800">Recent Orders</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Latest 5 orders placed</p>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="px-6 py-12 text-center text-gray-400 text-sm">No orders yet</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                                    <th className="px-6 py-3 font-medium">Order ID</th>
                                    <th className="px-6 py-3 font-medium">Items</th>
                                    <th className="px-6 py-3 font-medium">Amount</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800 flex items-center">
                                            <IndianRupee size={14} />{order.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                month: "short", day: "numeric", year: "numeric"
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Dashboard