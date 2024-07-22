import logger from '@common/logger';
import { Request, Response } from 'express';
import TicketDetail from './Td';
import eventbus from '@common/eventbus';

export default class ticketDetailController {

  static async addBooking(req: Request, res: Response): Promise<void> {
    try {
        const {ticketName, userName, bookingTime} = req.body
        const td = new TicketDetail({ticketName, userName})

        await td.save()

        eventbus.emit('BOOKING_CREATED', ticketName)

        logger.info('booking has added')
        res.status(200).json({message: 'created'})
    } catch (error) {
      logger.error('can not get tickets');
    }
  }
}
