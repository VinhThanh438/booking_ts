import logger from '@common/logger';
import { Request, Response } from 'express';
import eventbus from '@common/eventbus';
import { EVENT_BOOKING_CREATED } from '@common/constant/event.constant';
import { StatusCode } from '@config/status-code';
import Booking from '@common/booking/Booking';

export class BookingController {
    static async addBooking(req: Request, res: Response): Promise<void> {
        try {
            const { ticketId, userId } = req.body;

            const booking = new Booking({
                ticket_id: ticketId,
                user_id: userId,
            });

            const data = await booking.save();

            eventbus.emit(EVENT_BOOKING_CREATED, {
                bookingId: data._id,
                ticketId: data.ticket_id,
            });

            res.status(StatusCode.OK).json({ message: 'created' });
        } catch (error) {
            logger.error('can not get tickets');
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'can not get tickets!',
            });
        }
    }
}
