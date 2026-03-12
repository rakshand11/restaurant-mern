import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
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
                required: true
            }
        }
    ],
    address: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    discountApplied: {
        type: Boolean,
        default: false
    },
    finalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "preparing", "delivered"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        default: "Cash on delivery"
    }


}, { timestamps: true })
export const orderModel = mongoose.model("order", orderSchema)