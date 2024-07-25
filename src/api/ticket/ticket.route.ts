import express from 'express';
import { TicketController } from './ticket.controller';

const router = express.Router();

router.get('/:field/:option/:page', TicketController.panigate); 

router.get('/:page', TicketController.getALL);

router.post('/', TicketController.addTicket);

export default router;
