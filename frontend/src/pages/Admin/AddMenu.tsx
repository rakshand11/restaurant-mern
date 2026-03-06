import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

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

    // fetch categories
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

            if (file) {
                formData.append("image", file)
            }

            const { data } = await axios.post(
                "http://localhost:3000/menu/add",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
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
        <div className="py-12">

            <form
                onSubmit={handleSubmit}
                className="max-w-md flex flex-col gap-5"
            >

                {preview && (
                    <img src={preview} className="w-32" />
                )}

                <input
                    type="text"
                    placeholder="Item name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2"
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2"
                />

                <input
                    type="string"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2"
                />
                {/* CATEGORY DROPDOWN */}


                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2"
                >

                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}

                </select>

                <input type="file" onChange={handleFileChange} />

                <button className="bg-orange-500 text-white py-2">
                    {loading ? "Adding..." : "Add Menu"}
                </button>

            </form>

        </div>
    )
}

export default AddMenu