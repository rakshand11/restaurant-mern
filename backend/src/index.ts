import express = require("express")
import type { Request, Response } from "express"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import { userRouter } from "./route/user.route.js"
import cookieParser from "cookie-parser";
import { categoryRoute } from "./route/category.route.js"
import { connectCloudinary } from "./config/cloudinary.js"
import { menuItemRouter } from "./route/menu.route.js"
import { cartRouter } from "./route/cart.route.js"
import { orderRouter } from "./route/order.route.js"
import { bookingRouter } from "./route/booking.route.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT

const connectToDB = async () => {
    const Mongo_URI = process.env.MONGO_URI
    try {
        await mongoose.connect(Mongo_URI || "")
        console.log("database connected successfully")
    } catch (error) {
        console.error("database connection failed")
    }
}

connectToDB()
connectCloudinary()


app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://restaurant-mern-sable.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
    res.send("hello from the server")
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


