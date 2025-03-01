import express from 'express';
import { BookingController } from './booking.controller';
import { AuthMidleware } from '@api/auth/auth.middleware';
import { BookingMiddleware } from './booking.middleware';
const router = express.Router();

// router.post('/', BookingMiddleware.checkQuantity, BookingController.addBooking);
router.post(
    '/',
    AuthMidleware.requireAuth,
    BookingMiddleware.checkQuantity,
    BookingController.addBooking,
);

export default router;
