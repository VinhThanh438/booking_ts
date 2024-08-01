import express from 'express';
import { BookingController } from './booking.controller';
import { AuthMidleware } from '@api/auth/auth.middleware';
const router = express.Router();

// router.post('/', AuthMidleware.requireAuth, TicketDetailController.addBooking);
router.post('/', BookingController.addBooking);

export default router;
