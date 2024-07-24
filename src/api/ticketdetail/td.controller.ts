import logger from '@common/logger';
import { Request, Response } from 'express';
import TicketDetail from '@common/booking/Td';
import eventbus from '@common/eventbus';
import { EVENT_BOOKING_CREATED } from '@common/constant/event.constant';

export class TicketDetailController {
  static async addBooking(req: Request, res: Response): Promise<void> {
    try {
      const { ticketName, userName, bookingTime } = req.body;
      const td = new TicketDetail({ ticketName, userName });

      const data = await td.save();

      eventbus.emit(EVENT_BOOKING_CREATED, { id: data._id });

      logger.info('booking has added');
      res.status(200).json({ message: 'created' });
    } catch (error) {
      logger.error('can not get tickets');
    }
  }
}
