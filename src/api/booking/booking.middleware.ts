import logger from '@common/logger';
import Ticket from '@common/ticket/Ticket';
import { StatusCode } from '@config/status-code';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export class BookingMiddleware {
    static async checkQuantity(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const ticketId = req.body.ticketId;

            const data = await Ticket.findOneAndUpdate(
                {
                    _id: ticketId,
                    quantity: { $lte: 1 }, // <= 1
                },
                {
                    locked: true,
                },
                session,
            );

            if (!data) {
                // quantity > 1
                next();
            }

            if (data.locked) {
                // quantity <= 1 && locked = true
                await session.commitTransaction();
                session.endSession();
                res.status(StatusCode.REQUEST_FORBIDDEN).json({
                    message: 'tickets are sold out',
                });
            } else next(); // quantity <= 1 && locked = false => first person
        } catch (error) {
            logger.error(error);
            session.abortTransaction().finally(() => {
                session.endSession();
            });
        }
    }
}
