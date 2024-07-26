import logger from '@common/logger';
import { Request, Response } from 'express';
import TicketDetail from '@common/ticket-detail/Ticket-detail';
import eventbus from '@common/eventbus';
import { EVENT_BOOKING_CREATED } from '@common/constant/event.constant';
import { StatusCode } from '@config/status-code';

export class TicketDetailController {
  static async addBooking(req: Request, res: Response): Promise<void> {
    try {
      const { ticketName, userName } = req.body;

      const td = new TicketDetail({
        icket_name: ticketName,
        user_name: userName,
      });

      const data = await td.save();

      eventbus.emit(EVENT_BOOKING_CREATED, { id: data._id });

      res.status(StatusCode.OK).json({ message: 'created' });
    } catch (error) {
      logger.error('can not get tickets');
      res.status(StatusCode.REQUEST_FORBIDDEN).json({ message: 'can not get tickets!' });
    }
  }
}
