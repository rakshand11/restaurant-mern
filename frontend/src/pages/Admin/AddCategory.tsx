
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

            if (file) {
                formData.append("image", file);
            }

            const { data } = await axios.post(
                "http://localhost:3000/category/create",
                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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
        <div className="py-12">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full flex flex-col gap-5"
            >
                {preview && <img src={preview} className="w-1/2" />}

                <input
                    type="text"
                    placeholder="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2"
                />

                <input type="file" onChange={handleFileChange} />

                <button className="bg-orange-500 text-white py-2">
                    {loading ? "Adding..." : "Add Category"}
                </button>
            </form>
        </div>
    );
};

export default AddCategory;