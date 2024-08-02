import logger from '@common/logger';
import { Request, Response } from 'express';
import { StatusCode } from '@config/status-code';
import { BookingService } from '@common/booking/booking.service';
import { IBookingService } from '@common/booking/booking-service.interface';

export class BookingController {
    static async addBooking(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as any;

            await BookingService.addBooking(body as IBookingService);

            res.status(StatusCode.OK).json({ message: 'created' });
        } catch (error) {
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'can not get tickets!',
            });
        }
    }
}
