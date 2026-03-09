import { Router } from "express";
import { adminOnly } from "../middlewares/middleware.js";
import upload from "../middlewares/multer.js";
import { addMenuItem, deleteItem, getAllMenuItem, updateMenuItem } from "../controller/menu.controller.js";

export const menuItemRouter = Router()

menuItemRouter.post("/add", adminOnly, upload.single("image"), addMenuItem)
menuItemRouter.put("/update/:id", adminOnly, upload.single("image"), updateMenuItem)
menuItemRouter.delete("/delete/:id", adminOnly, deleteItem)
menuItemRouter.get("/get", getAllMenuItem)