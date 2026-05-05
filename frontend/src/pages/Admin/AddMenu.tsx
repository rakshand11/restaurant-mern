import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { IndianRupee } from "lucide-react"

interface Category {
    _id: string
    name: string
}

const AddMenu = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const getCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/category/get")
            setCategories(res.data.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleFileChange = (e: any) => {
        const selected = e.target.files[0]
        if (selected) {
            setFile(selected)
            setPreview(URL.createObjectURL(selected))
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", name)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("description", description)
            if (file) formData.append("image", file)

            const { data } = await axios.post(
                "http://localhost:3000/menu/add",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            )
            toast.success(data.msg)
        } catch (error: any) {
            toast.error(error?.response?.data?.msg || "Error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black py-12 px-4">
            <div className="max-w-lg mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-400">Add Menu Item</h1>
                    <p className="text-sm text-gray-300 mt-1">Fill in the details to add a new item to the menu</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* Image Upload */}
                        {preview ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => { setPreview(null); setFile(null) }}
                                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 rounded-full w-7 h-7 flex items-center justify-center text-sm shadow transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <label className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-400 bg-gray-50 hover:bg-orange-50 flex flex-col items-center justify-center cursor-pointer transition-all group">
                                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🍽️</span>
                                <span className="text-sm font-medium text-gray-500 group-hover:text-orange-500">Click to upload image</span>
                                <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </label>
                        )}

                        {/* Item Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Item Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Margherita Pizza"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium"><IndianRupee size={14} /></span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                placeholder="Describe the menu item..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
                            />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Adding...
                                </>
                            ) : "Add Menu Item"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMenu