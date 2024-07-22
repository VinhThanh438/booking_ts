import logger from '@common/logger';
import { Request, Response } from 'express';
import Ticket from './Ticket';

export default class ticketController {
  static async getALL(req: Request, res: Response): Promise<void> {
    try {
      const ticketData = await Ticket.find();
      if (Ticket) res.sendJson(ticketData);
      else {
        console.log(ticketData)
        logger.info('Ticket table is empty!', ticketData);
      }
    } catch (error) {
      logger.error('can not get tickets');
    }
  }
}
