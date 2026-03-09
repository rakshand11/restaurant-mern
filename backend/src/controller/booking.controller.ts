import { Request, Response } from "express";
import { bookingModel } from "../model/booking.model.js";

export const createBooking = async (req: Request, res: Response) => {
    try {

        // Check authentication
        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }

        const { id } = req.user;
        const { name, contact, note, date, time, numberOfPeople, email } = req.body;

        // Validation
        if (!name || !contact || !date || !time || !numberOfPeople || !email) {
            return res.status(400).json({
                msg: "All required fields must be filled"
            });
        }

        // Check if slot already booked
        const existingBooking = await bookingModel.findOne({
            date,
            time,
            status: { $ne: "pending" }
        });

        if (existingBooking) {
            return res.status(400).json({
                msg: "This time slot is already booked"
            });
        }

        // Create booking
        const booking = await bookingModel.create({
            user: id,
            name,
            contact,
            note,
            date,
            time,
            email,
            numberOfPeople
        });

        return res.status(201).json({
            msg: "Your booking is confirmed",
            booking,
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};



export const getUserBooking = async (req: Request, res: Response) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }

        const { id } = req.user;

        const booking = await bookingModel
            .find({ user: id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            bookings: booking,
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};



export const getAllBooking = async (req: Request, res: Response) => {
    try {

        const booking = await bookingModel
            .find()
            .populate("user", "name email");

        return res.status(200).json({
            bookings: booking,
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};



export const updateBookingStatus = async (req: Request, res: Response) => {
    try {

        const { bookingId } = req.params;
        const { status } = req.body;

        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                msg: "Booking not found"
            });
        }

        booking.status = status;

        await booking.save();

        return res.status(200).json({
            msg: "Booking updated successfully",
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};