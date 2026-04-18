import express from 'express';
import {
  createEventBooking,
  getEventBookings,
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createEventBooking).get(protect, admin, getEventBookings);

export default router;
