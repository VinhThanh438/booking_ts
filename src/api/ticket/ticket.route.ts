import express, { Request, Response } from 'express';
import ticketController from './ticket.controller';

const ticketRoute = express.Router();

ticketRoute.get('/', ticketController.getALL);

ticketRoute.post('/', ticketController.addTicket)

export default ticketRoute;
