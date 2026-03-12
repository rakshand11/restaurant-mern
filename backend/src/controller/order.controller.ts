import { Request, Response } from "express";
import { cartModel } from "../model/cart.model.js";
import { orderModel } from "../model/order.model.js";


// PLACE ORDER
// PLACE ORDER
export const placeOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { address, paymentMethod } = req.body;

        // Address validation
        if (!address) {
            res.status(400).json({
                msg: "Please fill your address",
            });
            return;
        }

        // Find user cart
        const cart = await cartModel
            .findOne({ user: id })
            .populate("items.menuItem");

        if (!cart || cart.items.length === 0) {
            res.status(400).json({
                msg: "Your cart is empty",
            });
            return;
        }

        // Calculate current order subtotal
        const totalAmount = (cart.items as any[]).reduce(
            (sum, item) => sum + (item.menuItem?.price ?? 0) * item.quantity,
            0
        );

        // ✅ Discount logic — 25% off if current order exceeds ₹1000
        const discountApplied = totalAmount > 1000;
        const discount = discountApplied ? totalAmount * 0.25 : 0;
        const finalAmount = totalAmount - discount;

        // Create order
        const newOrder = await orderModel.create({
            user: id,
            items: cart.items.map((i: any) => ({
                menuItem: i.menuItem._id,
                quantity: i.quantity,
            })),
            totalAmount,        // ✅ current order subtotal
            discount,           // ✅ 0 or 25% of totalAmount
            discountApplied,    // ✅ true/false flag
            finalAmount,        // ✅ amount after discount
            address,
            paymentMethod,
        });

        // Clear cart
        cart.set("items", []);
        await cart.save();

        res.status(201).json({
            success: true,
            msg: discountApplied
                ? `🎉 25% discount applied! You saved ₹${discount.toFixed(2)}`
                : "Your order is placed",
            order: newOrder,
        });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
        });
        return;
    }
};


// GET USER ORDERS
export const getOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;

        const orders = await orderModel
            .find({ user: id })
            .populate("user", "name")
            .populate({
                path: "items.menuItem",
                select: "name price image"
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });
        return;

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};



// GET ALL ORDERS (ADMIN)
export const getAllOrders = async (req: Request, res: Response) => {
    console.log("Cookies received:", req.cookies);

    try {
        const allOrders = await orderModel
            .find()
            .populate("user", "name")
            .populate({
                path: "items.menuItem",
                select: "name price image"
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders: allOrders
        });
        return;

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};



// UPDATE ORDER STATUS
export const orderStatusUpdate = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        console.log("Updating order:", orderId, "to status:", status);

        const order = await orderModel.findById(orderId);

        if (!order) {
            res.status(400).json({
                msg: "Order not found"
            });
            return;
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            msg: "Order is updated successfully",
            order
        });
        return;

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};