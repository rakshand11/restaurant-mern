import { Request, Response } from "express";
import { menuModel } from "../model/menu.model.js";
import { cartModel } from "../model/cart.model.js";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { menuItemId, quantity } = req.body;
        const userId = req.user
        if (!userId) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }
        console.log("User:", req.user);
        console.log("UserId:", req.userId);
        console.log("Body:", req.body);
        const menuItem = await menuModel.findById(menuItemId);

        if (!menuItem) {
            return res.status(404).json({
                msg: "Menu Item not found"
            });
        }

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            cart = new cartModel({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(
            (item) => item.menuItem.toString() === menuItemId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ menuItem: menuItemId, quantity });
        }

        await cart.save();

        res.status(200).json({
            msg: "Item added to cart"
        });

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

export const getCart = async (req: Request, res: Response) => {
    try {


        const { id } = req.user
        const cart = await cartModel.findOne({ user: id }).populate("items.menuItem")
        if (!cart) {
            res.status(401).json({
                msg: "Cart not created"
            })
            return
        }
        res.status(200).json({
            msg: cart
        })
        return
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }

}

export const removeCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.user
        const { menuItemId } = req.params

        const cart = await cartModel.findOne({ user: id })
        if (!cart) {
            res.status(401).json({
                msg: "Cart not found"
            })
            return
        }
        cart.items = cart.items.filter(
            (item: any) => item.menuItem.toString() !== menuItemId
        ) as any
        await cart.save()
        res.status(200).json({
            msg: "Item removed"
        })
        return
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}
