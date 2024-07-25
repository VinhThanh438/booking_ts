import ticketRoute from './ticket/ticket.route';
import tdRoute from './ticketdetail/td.route';
import paymentRoute from './payment/payment.route'
import express from 'express';
const router = express.Router();

router.use('/', ticketRoute);

router.use('/booking', tdRoute);

router.use('/payment', paymentRoute)

export default router;
