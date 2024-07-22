import logger from '@common/logger';
import { Request, Response } from 'express';
import Ticket from './Ticket';

export default class ticketController {
  static async getALL(req: Request, res: Response): Promise<void> {
    try {
      const data = await Ticket.find({});
      res.status(201).json({ data });
    } catch (error) {
      logger.error('can not get tickets');
    }
  }

  static async addTicket(req: Request, res: Response): Promise<void> {
    try {
      const { ticketName, price, quantity } = req.body;
      const ticket = new Ticket({ ticketName, price, quantity });
      await ticket.save();
      logger.info('ticket has added');
      res.status(200).json({ message: 'created' });
    } catch (error) {
      logger.error('can not get tickets');
    }
  }
}
