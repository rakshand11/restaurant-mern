import { categoryModel } from "../model/category.model.js";
import { v2 as cloudinary } from "cloudinary";
export const categoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || !req.file) {
            res.status(400).json({
                msg: "Name and image are required"
            });
            return;
        }
        const filePath = req.file.path;
        if (!filePath) {
            res.status(400).json({ msg: "File path missing after upload" });
            return;
        }
        const alreadyexist = await categoryModel.findOne({ name });
        if (alreadyexist) {
            res.status(401).json({
                msg: "category already added"
            });
            return;
        }
        const result = await cloudinary.uploader.upload(filePath);
        const category = await categoryModel.create({
            name,
            image: result.secure_url
        });
        if (!category) {
            res.status(401).json({
                msg: "category not found"
            });
            return;
        }
        res.status(200).json({
            msg: "category added successfully",
            category
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};
export const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            msg: "success",
            category
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryModel.findById(id);
        if (!category) {
            res.status(401).json({
                msg: "category not found"
            });
            return;
        }
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            category.image = result.secure_url;
        }
        if (name)
            category.name = name;
        await category.save();
        res.status(200).json({
            msg: "category updated"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        if (!category) {
            res.status(401).json({
                msg: "category not found"
            });
        }
        res.status(200).json({
            msg: "category deleted successfully"
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};
//# sourceMappingURL=category.controller.js.map