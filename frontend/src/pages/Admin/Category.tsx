import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

// #region agent log helper
const agentDebugNow = () => Date.now()
// #endregion agent log helper

interface Category {
    _id: string
    name: string
    image: string
}

const Category = () => {
    const [category, setCategory] = useState<Category[]>([])
    const deleteCategory = async (id: string) => {

        try {
            const { data } = await axios.delete(`https://api.rakshand.site/category/delete/${id}`,
                { withCredentials: true })

            toast.success(data.msg || "Category deleted successfully")
            getCategories()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    const getCategories = async () => {
        try {
            const res = await axios.get("https://api.rakshand.site/category/get")
            setCategory(res.data.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Categories</h1>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border text-left">Image</th>
                        <th className="p-3 border text-left">Name</th>
                        <th className="p-3 border text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {category.map((cat) => (
                        <tr key={cat._id} className="border">
                            <td className="p-3">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>

                            <td className="p-3">{cat.name}</td>

                            <td
                                className="p-3 text-red-500 text-xl cursor-pointer"
                                onClick={() => deleteCategory(cat._id)}
                            >
                                ❌
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Category