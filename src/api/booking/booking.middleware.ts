import logger from '@common/logger';
import Ticket from '@common/ticket/Ticket';
import { StatusCode } from '@config/status-code';
import { Request, Response, NextFunction } from 'express';

export class BookingMiddleware {
    static async checkQuantity(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const ticketId = req.body.ticketId;

            const data = await Ticket.findOne({
                _id: ticketId,
                quantity: { $lte: 0 },
            });

            if (data) {
                res.status(StatusCode.REQUEST_FORBIDDEN).json({
                    message: 'tickets are sold out',
                });
            } else next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}
