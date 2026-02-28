import mongoose, { Schema } from "mongoose";
const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    isAvailabel: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });
export const menuModel = mongoose.model("menu", menuSchema);
//# sourceMappingURL=menu.model.js.map