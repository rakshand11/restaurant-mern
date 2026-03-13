import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

// #region agent log helper
const agentDebugNow = () => Date.now()
// #endregion agent log helper

interface MenuItem {
    _id: string
    name: string
    description: string
    price: number
    image: string
    category: {
        name: string
    }
}

const Menus = () => {
    const [menu, setMenu] = useState<MenuItem[]>([])
    const deleteMenu = async (id: string) => {

        try {
            const { data } = await axios.delete(`https://api.rakshand.site/menu/delete/${id}`,
                { withCredentials: true })

            toast.success(data.msg || "Category deleted successfully")
            getMenu()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    const getMenu = async () => {
        try {
            const res = await axios.get("https://api.rakshand.site/menu/get",
                { withCredentials: true }
            )
            setMenu(res.data.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMenu()
    }, [])
    return (
        <div className="p-8 bg-black min-h-screen">
            <h1 className="text-3xl text-gray-400 font-bold mb-8">Menu Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menu.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        {/* IMAGE */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                        />

                        {/* CONTENT */}
                        <div className="p-5 flex flex-col gap-3">

                            {/* NAME */}
                            <h2 className="text-xl font-semibold">{item.name}</h2>

                            {/* DESCRIPTION */}
                            <p className="text-gray-500 text-sm">
                                {item.description}
                            </p>

                            {/* CATEGORY + PRICE */}
                            <div className="flex justify-between items-center mt-2">

                                <span className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full">
                                    {item.category?.name}
                                </span>

                                <span className="text-lg font-bold text-green-600">
                                    ₹{item.price}
                                </span>

                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex justify-end mt-3">

                                <button
                                    onClick={() => deleteMenu(item._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menus