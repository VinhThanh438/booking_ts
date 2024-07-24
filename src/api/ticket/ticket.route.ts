import express, { Request, Response } from 'express';
import { TicketController } from './ticket.controller';

const router = express.Router();

router.get('/', TicketController.getALL);

router.post('/', TicketController.addTicket);

export default router;
