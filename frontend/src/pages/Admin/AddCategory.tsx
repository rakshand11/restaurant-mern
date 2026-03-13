import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            if (file) formData.append("image", file);

            const { data } = await axios.post(
                "https://api.rakshand.site/category/create",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            toast.success(data.msg);
            navigate("/admin/add-category");
        } catch (error: any) {
            toast.error(error?.response?.data?.msg || "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12 px-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Add Category</h1>
                    <p className="text-sm text-gray-400 mt-1">Fill in the details to create a new category</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* Image Preview */}
                        {preview ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => { setPreview(null); setFile(null); }}
                                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 rounded-full w-7 h-7 flex items-center justify-center text-sm shadow transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <label className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-400 bg-gray-50 hover:bg-orange-50 flex flex-col items-center justify-center cursor-pointer transition-all group">
                                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</span>
                                <span className="text-sm font-medium text-gray-500 group-hover:text-orange-500">Click to upload image</span>
                                <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </label>
                        )}

                        {/* Name Input */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Category Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Pizzas , Burgers , Desserts"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Submit Button */}
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
                            ) : (
                                "Add Category"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;