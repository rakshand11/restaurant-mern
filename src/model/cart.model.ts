import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    items: [

        {
            menuItem: {
                type: Schema.Types.ObjectId,
                ref: "menu",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            }
        }

    ]
}, { timestamps: true })
export const cartModel = mongoose.model("cart", cartSchema)