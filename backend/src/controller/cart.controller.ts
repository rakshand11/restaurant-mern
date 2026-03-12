import { Request, Response } from "express";
import { menuModel } from "../model/menu.model.js";
import { cartModel } from "../model/cart.model.js";


// ADD TO CART
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { menuItemId, quantity } = req.body;
        const { id } = req.user;

        if (!id) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }

        const menuItem = await menuModel.findById(menuItemId);

        if (!menuItem) {
            return res.status(404).json({
                msg: "Menu Item not found"
            });
        }

        let cart = await cartModel.findOne({ user: id });

        if (!cart) {
            cart = new cartModel({ user: id, items: [] });
        }

        const existingItem = cart.items.find(
            (item) => item.menuItem.toString() === menuItemId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                menuItem: menuItemId,
                quantity
            });
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



// GET CART
export const getCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;

        const cart = await cartModel
            .findOne({ user: id })
            .populate("items.menuItem");

        if (!cart) {
            return res.status(200).json({
                items: []
            });
        }

        // ✅ Remove deleted menu items safely
        const validItems = cart.items.filter((item: any) => item.menuItem !== null);

        cart.set("items", validItems);   // important fix
        await cart.save();

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};



// REMOVE ITEM FROM CART
export const removeCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { menuItemId } = req.params;

        const cart = await cartModel.findOne({ user: id });

        if (!cart) {
            return res.status(404).json({
                msg: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item: any) => item.menuItem.toString() !== menuItemId
        ) as any;

        await cart.save();

        res.status(200).json({
            msg: "Item removed"
        });

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};