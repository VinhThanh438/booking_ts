import ticketRoute from './ticket/ticket.route';
import bookingRoute from './booking/booking.route';
import userRoute from './user/user.route';
import paymentRoute from './payment/payment.route';
import express from 'express';
const router = express.Router();

router.use('/', ticketRoute, userRoute);

router.use('/booking', bookingRoute);

router.use('/payment', paymentRoute);

export default router;
