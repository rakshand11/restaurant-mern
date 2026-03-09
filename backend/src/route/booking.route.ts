import { Router } from "express";
import { adminOnly, authMiddleware } from "../middlewares/middleware.js";
import { createBooking, getAllBooking, getUserBooking, updateBookingStatus } from "../controller/booking.controller.js";

export const bookingRouter = Router()

bookingRouter.post("/create", authMiddleware, createBooking)
bookingRouter.get("/my-booking", authMiddleware, getUserBooking)
bookingRouter.get("/bookings", adminOnly, getAllBooking)
bookingRouter.put("/update/:bookingId", adminOnly, updateBookingStatus)