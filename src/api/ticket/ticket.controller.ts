import logger from '@common/logger';
import { Request, Response } from 'express';
import Ticket from '@common/ticket-detail/Td';
import { StatusCode } from '@config/status-code';

export class TicketController {
  static async getALL(req: Request, res: Response): Promise<void> {
    try {
      // 1. pagiation is what, how, KIND of pagiantion, and which one is better  => depends on the use case
      const user = req.cookies.user
      let currentPage: number = parseInt(req.params.page)
      let ticketsPerPage  = 12

      // pagination theo price, theo quantity, theo created_at
      const data = await Ticket
      .find()
      .skip((ticketsPerPage * currentPage) - ticketsPerPage)
      .limit(ticketsPerPage)

      res.status(StatusCode.CREATED).json({ data });
    } catch (error) {
      logger.error('can not get tickets');
    }
  }

  static async addTicket(req: Request, res: Response): Promise<void> {
    try {
      const { ticketName, price, quantity } = req.body;
      
      const ticket = new Ticket({ 
        ticket_name: ticketName, 
        price, 
        quantity });

      await ticket.save();

      logger.info('ticket has added');

      res.status(200).json({ message: 'created' });
    } catch (error) {
      logger.error('can not get tickets');
    }
  }
}
