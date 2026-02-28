import { bookingModel } from "../model/booking.model.js";
export const createBooking = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, contact, note, date, time, numberOfPeople } = req.body;
        if (!name || !contact || !note || !date || !time || !numberOfPeople) {
            res.status(400).json({
                msg: "All fields are required"
            });
            return;
        }
        const existingBooking = await bookingModel.findOne({
            date, time,
            status: { $ne: "pending" }
        });
        if (existingBooking) {
            res.status(400).json({
                msg: "This time slot is already booked"
            });
        }
        const booking = await bookingModel.create({
            user: id,
            name,
            contact,
            note,
            date,
            time,
            numberOfPeople
        });
        if (!booking) {
            res.status(400).json({
                msg: "Booking not confirmed"
            });
            res.status(200).json({
                msg: "Your booking is confirmed",
                booking
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};
export const getUserBooking = async (req, res) => {
    try {
        const { id } = req.user;
        const booking = await bookingModel.find({ user: id }).sort({ createdAt: -1 });
        if (!booking) {
            res.status(400).json({
                msg: "User not found"
            });
            return;
        }
        res.status(200).json({
            msg: booking
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
        return;
    }
};
export const getAllBooking = async (req, res) => {
    try {
        const { id } = req.user;
        const booking = await bookingModel.find().populate("user", "name email");
        res.status(200).json({
            msg: booking
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
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            res.status(400).json({
                msg: "Booking cant find"
            });
            return;
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({
            msg: "Booking updated successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    }
};
//# sourceMappingURL=booking.controller.js.map