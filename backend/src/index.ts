import express = require("express")
import type { Request, Response } from "express"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import { userRouter } from "./route/user.route.js"
import cookieParser from "cookie-parser"
import { categoryRoute } from "./route/category.route.js"
import { connectCloudinary } from "./config/cloudinary.js"
import { menuItemRouter } from "./route/menu.route.js"
import { cartRouter } from "./route/cart.route.js"
import { orderRouter } from "./route/order.route.js"
import { bookingRouter } from "./route/booking.route.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "")
        console.log("✅ Database connected successfully")
    } catch (error) {
        console.error("❌ Database connection failed", error)
    }
}

connectToDB()
connectCloudinary()

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://restaurant-mern-sable.vercel.app",
    "https://restaurant-mern-augpeomiz-rakshands-projects.vercel.app"
]

app.use(cors({
    origin: function (origin, callback) {

        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        } else {
            return callback(new Error("CORS not allowed"), false)
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}))


app.use(express.json())
app.use(cookieParser())


app.use("/user", userRouter)
app.use("/category", categoryRoute)
app.use("/menu", menuItemRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
app.use("/booking", bookingRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("🚀 Server is running")
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})