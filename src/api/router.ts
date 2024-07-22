import ticketRoute from './ticket/ticket.route';
import tdRoute from './ticketdetail/td.route';
import express from 'express';
const router = express.Router();

router.use('/', ticketRoute);

router.use('/booking', tdRoute)

export default router;
