import express from 'express';
import { TicketDetailController } from './td.controller';
const router = express.Router();

router.post('/', TicketDetailController.addBooking);

export default router;
