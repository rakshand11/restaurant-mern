import { Router } from "express";
import { categoryController, deleteCategory, getAllCategory, updateCategory } from "../controller/category.controller.js";
import { adminOnly } from "../middlewares/middleware.js";
import upload from "../middlewares/multer.js";

export const categoryRoute = Router()

categoryRoute.post("/create", adminOnly, upload.single("image"), categoryController)
categoryRoute.put("/update/:id", adminOnly, upload.single("image"), updateCategory)
categoryRoute.get("/get", getAllCategory)
categoryRoute.delete("/delete/:id", adminOnly, deleteCategory)