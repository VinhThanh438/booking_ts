import express from 'express';
import { TicketDetailController } from './td.controller';
import { AuthMidleware } from '@api/auth/auth.middleware';
const router = express.Router();

router.post('/',AuthMidleware.requireAuth, TicketDetailController.addBooking);

export default router;
