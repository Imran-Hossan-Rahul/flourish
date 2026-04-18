import mongoose from 'mongoose';

const eventBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional, so guests can book events
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    clientPhone: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true, // e.g., 'Wedding', 'Corporate', 'Birthday', 'Other'
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
    },
    floralPreferences: {
      type: String,
    },
    budget: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const EventBooking = mongoose.model('EventBooking', eventBookingSchema);

export default EventBooking;
