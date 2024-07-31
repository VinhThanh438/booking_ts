import logger from '@common/logger';
import { Request, Response } from 'express';
import PaymentDetail from '@common/payment/Payment-detail';
import eventbus from '@common/eventbus';
import { EVENT_PAYMENT_CREATED } from '@common/constant/event.constant';
import { StatusCode } from '@config/status-code';
import mongoose from 'mongoose';

export class PaymentController {
    static async confirmPayment(req: Request, res: Response): Promise<void> {
        const session = await mongoose.startSession()
        
        try {
            session.startTransaction()

            const { ticketName, userName, total } = req.body;

            const data = await PaymentDetail.create(
                new PaymentDetail({
                    ticket_name: ticketName,
                    user_name: userName,
                    total,
                }),
            );

            eventbus.emit(EVENT_PAYMENT_CREATED, { userName, total });

            await session.commitTransaction()

            res.status(StatusCode.CREATED).json({ message: 'payment success!', data });
        } catch (error) {
            await session.abortTransaction()
            logger.error('payment could not be confirmed!', error);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({ message: 'payment could not be confirmed!' });
        } finally {
            session.endSession()
        }
    }
}
