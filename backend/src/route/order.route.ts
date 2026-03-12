import { Router } from "express";
import { adminOnly, authMiddleware } from "../middlewares/middleware.js";
import { getAllOrders, getOrder, orderStatusUpdate, placeOrder } from "../controller/order.controller.js";

export const orderRouter = Router()

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.get("/get", authMiddleware, getOrder)
orderRouter.get("/all-order", adminOnly, getAllOrders)
orderRouter.put("/update-status/:orderId", adminOnly, orderStatusUpdate)
