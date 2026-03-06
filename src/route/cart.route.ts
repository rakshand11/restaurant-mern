import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware.js";
import { addToCart, getCart, removeCart } from "../controller/cart.controller.js";

export const cartRouter = Router()

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.get("/get", authMiddleware, getCart)
cartRouter.delete("/delete", authMiddleware, removeCart)