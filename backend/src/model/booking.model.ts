import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberOfPeople: {
        type: String,
        required: true,
        min: 1
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending"
    }
}, { timestamps: true })

export const bookingModel = mongoose.model("booking", bookingSchema)