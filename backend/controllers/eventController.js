import EventBooking from '../models/EventBooking.js';

// @desc    Create new event booking
// @route   POST /api/events
// @access  Public
export const createEventBooking = async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      eventType,
      date,
      location,
      guestCount,
      floralPreferences,
    } = req.body;

    const booking = new EventBooking({
      user: req.user ? req.user._id : undefined,
      clientName,
      clientEmail,
      clientPhone,
      eventType,
      date,
      location,
      guestCount,
      floralPreferences,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: 'Invalid booking data' });
  }
};

// @desc    Get all event bookings
// @route   GET /api/events
// @access  Private/Admin
export const getEventBookings = async (req, res) => {
  const bookings = await EventBooking.find({});
  res.json(bookings);
};
