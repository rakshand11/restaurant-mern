import { Request, Response } from "express";
import { menuModel } from "../model/menu.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addMenuItem = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category } = req.body



        if (!name || !description || !price || !category || !req.file) {


            res.status(400).json({
                msg: "All fields should be filled (name or description, price, category, image)"
            })
            return
        }
        const result = await cloudinary.uploader.upload(req.file.path)

        const NewItem = await menuModel.create({
            name,
            description,
            price,
            category,
            image: result.secure_url,
        })
        res.status(201).json({
            msg: "New item added successfully",
            menuItem: NewItem
        })
        return

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }

}

export const getAllMenuItem = async (req: Request, res: Response) => {
    try {
        const items = await menuModel.find().populate("category", "name").sort({ createdAt: -1 })
        res.status(200).json({
            msg: "success",
            items
        })
    } catch (error) {
        res.status(501).json({
            msg: "Internal server error"
        })
        return
    }
}

export const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (typeof id !== "string") {
            res.status(400).json({ msg: "Invalid item ID" })
            return
        }
        const { name, description, price, category, isAvailabel } = req.body

        const updateItem = await menuModel.findById(id)
        if (!updateItem) {
            res.status(404).json({
                msg: "Item not found"
            })
            return
        }
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            updateItem.image = result.secure_url
        }
        if (name) updateItem.name = name;
        if (description) updateItem.description = description;
        if (price !== undefined) updateItem.price = Number(price);
        if (category) updateItem.category = category;
        if (isAvailabel !== undefined) updateItem.isAvailabel = isAvailabel;

        await updateItem.save()
        res.status(200).json({
            msg: "Menu item updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (typeof id !== "string") {
            res.status(400).json({ msg: "Invalid item ID" })
            return
        }
        const item = await menuModel.findByIdAndDelete(id)
        res.status(200).json({
            msg: "item deleted",
            item
        })
        return
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}