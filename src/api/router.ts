import ticketRoute from './ticket/ticket.route';
import express from 'express';
const router = express.Router();

router.use('/', ticketRoute);

export default router;
