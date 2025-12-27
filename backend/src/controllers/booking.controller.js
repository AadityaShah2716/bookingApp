const { Booking } = require('../models');
const { Op } = require('sequelize');

exports.createBooking = async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            bookingDate,
            bookingType,
            bookingSlot,
            fromTime,
            toTime
        } = req.body;

        const existingBookings = await Booking.findAll({
            where: { bookingDate }
        });


        for (const booking of existingBookings) {

            if (booking.bookingType === 'FULL') {
                return res.status(400).json({ message: 'Full day already booked' });
            }

            if (bookingType === 'FULL') {
                return res.status(400).json({ message: 'Day already partially booked' });
            }

            if (bookingType === 'HALF') {
                if (
                    booking.bookingType === 'HALF' &&
                    booking.bookingSlot === bookingSlot
                ) {
                    return res.status(400).json({ message: 'Half day slot already booked' });
                }

                if (booking.bookingType === 'CUSTOM') {
                    if (
                        (bookingSlot === 'FIRST_HALF' && booking.fromTime < '12:00') ||
                        (bookingSlot === 'SECOND_HALF' && booking.fromTime >= '12:00')
                    ) {
                        return res.status(400).json({ message: 'Time overlaps with custom booking' });
                    }
                }
            }

            if (bookingType === 'CUSTOM') {
                if (booking.bookingType === 'HALF') {
                    if (
                        (booking.bookingSlot === 'FIRST_HALF' && fromTime < '12:00') ||
                        (booking.bookingSlot === 'SECOND_HALF' && fromTime >= '12:00')
                    ) {
                        return res.status(400).json({ message: 'Overlaps with half day booking' });
                    }
                }

                if (booking.bookingType === 'CUSTOM') {
                    if (!(toTime <= booking.fromTime || fromTime >= booking.toTime)) {
                        return res.status(400).json({ message: 'Custom time overlaps' });
                    }
                }
            }
        }

        const newBooking = await Booking.create({
            customerName,
            customerEmail,
            bookingDate,
            bookingType,
            bookingSlot,
            fromTime,
            toTime
        });

        res.status(201).json(newBooking);

    } catch (err) {
        res.status(500).json({ message: 'Booking failed' });
    }
};
