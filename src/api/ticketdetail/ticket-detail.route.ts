import express from 'express';
import { TicketDetailController } from './ticket-detail.controller';
import { AuthMidleware } from '@api/auth/auth.middleware';
const router = express.Router();

// router.post('/', AuthMidleware.requireAuth, TicketDetailController.addBooking);
router.post('/', TicketDetailController.addBooking);

export default router;
