import logger from '@common/logger';
import { Request, Response } from 'express';
import { StatusCode } from '@config/status-code';
import { BookingSerVice } from '@common/booking/booking.service';
import { IBookingService } from '@common/booking/booking-service.interface';

export class BookingController {
    static async addBooking(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as any;

            await BookingSerVice.addBooking(body as IBookingService);

            res.status(StatusCode.OK).json({ message: 'created' });
        } catch (error) {
            logger.error('can not get tickets');
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'can not get tickets!',
            });
        }
    }
}
