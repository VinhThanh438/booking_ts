import logger from '@common/logger';
import { Request, Response } from 'express';
import PaymentDetailSchema from '@common/payment/Payment-detail';
import eventbus from '@common/eventbus';
import { EVENT_BOOKING_CANCELED, EVENT_PAYMENT_CREATED } from '@common/constant/event.constant';
import { StatusCode } from '@config/status-code';
import mongoose from 'mongoose';

export class PaymentController {
    static async confirmPayment(req: Request, res: Response): Promise<void> {
        const session = await mongoose.startSession()
        
        try {
            session.startTransaction()

            const { ticketId, userId, total } = req.body;

            const data = await PaymentDetailSchema.create(
                new PaymentDetailSchema({
                    ticket_id: ticketId,
                    user_id: userId,
                    total,
                }),
            );

            eventbus.emit(EVENT_PAYMENT_CREATED, { userId, total });

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

    static async bookingCancel(req: Request, res: Response): Promise<void> {
        const session = await mongoose.startSession()

        try {
            session.startTransaction()

            const { paymentDetailId } = req.body
            console.log(paymentDetailId)

            const data = await PaymentDetailSchema.findByIdAndDelete(paymentDetailId)

            // eventbus.emit(EVENT_BOOKING_CANCELED)

            await session.commitTransaction()

            res.status(StatusCode.OK).json({ message: 'booking has canceled!', data});
        } catch (error) {
            await session.abortTransaction()
            logger.error('payment could not be confirmed!', error);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({ message: 'payment could not be confirmed!' });
        } finally {
            session.endSession()
        }
    }
}
