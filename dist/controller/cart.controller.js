import { menuModel } from "../model/menu.model.js";
import { cartModel } from "../model/cart.model.js";
export const addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const { id } = req.user;
        const menuItem = await menuModel.findById(menuItemId);
        if (!menuItem) {
            res.status(401).json({
                msg: "Menu Item not found"
            });
            return;
        }
        let cart = await cartModel.findOne({ user: id });
        if (!cart) {
            cart = new cartModel({ user: id, items: [] });
        }
        const existingItem = cart.items.find((item) => item.menuItem.toString() === menuItemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({ menuItem: menuItemId, quantity });
        }
        await cart.save();
        res.status(200).json({
            msg: "Item added to Cart"
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
export const getCart = async (req, res) => {
    try {
        const { id } = req.user;
        const cart = await cartModel.findOne({ user: id }).populate("items.menuItem");
        if (!cart) {
            res.status(401).json({
                msg: "Cart not created"
            });
            return;
        }
        res.status(200).json({
            msg: cart
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
export const removeCart = async (req, res) => {
    try {
        const { id } = req.user;
        const { menuItemId } = req.body;
        const cart = await cartModel.findOne({ user: id });
        if (!cart) {
            res.status(401).json({
                msg: "Cart not found"
            });
            return;
        }
        cart.items = cart.items.filter((item) => item.menuItem.toString() !== menuItemId);
        await cart.save();
        res.status(200).json({
            msg: "Item removed"
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
//# sourceMappingURL=cart.controller.js.map