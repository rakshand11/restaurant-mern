import { Request, Response } from "express";
import { cartModel } from "../model/cart.model.js";
import { orderModel } from "../model/order.model.js";

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.user
        const { address } = req.body
        console.log(req.body)
        if (!address) {
            res.status(400).json({
                msg: "Please fill your address"
            })
            return
        }
        const cart = await cartModel.findOne({ user: id }).populate("items.menuItem") // finding cart which user will order 
        if (!cart || cart.items.length === 0) {
            res.status(401).json({
                msg: "Your cart is empty"
            })
            return
        }
        const totalAmount = (cart.items as any[]).reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0) //cart.items = returning the array ,reduce()=array method returns single value,calculating total cart amount by sum(p*q) for each item

        const newOrder = await orderModel.create({
            user: id,
            items: cart.items.map((i) => ({
                menuItem: i.menuItem._id,
                quantity: i.quantity,
            })),
            totalAmount,
            address
        })
        cart.set("items", []);
        await cart.save()
        res.status(201).json({
            msg: "Your order is placed",
            order: newOrder,
            success: true
        })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}

export const getOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.user
        const order = await orderModel.findOne({ user: id }).populate("user").sort({ createdAt: -1 })
        res.status(200).json({
            msg: order,
            success: true
        })
        return
    } catch (error) {

        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const allOrders = await orderModel.find().populate("user").sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            orders: allOrders

        })
        return
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"

        })
        return
    }
}

export const orderStatusUpdate = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const order = await orderModel.findById(orderId)
        console.log("Updating order:", orderId, "to status:", status);
        if (!order) {
            res.status(400).json({
                msg: "Order not found"
            })
            return
        }
        order.status = status
        await order.save()
        res.status(200).json({
            msg: "Order is updated successfully",
            order
        })
        return

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}