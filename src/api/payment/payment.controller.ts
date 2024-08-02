import logger from '@common/logger';
import { Request, Response } from 'express';
import PaymentDetailSchema from '@common/payment/Payment-detail';
import eventbus from '@common/eventbus';
import {
    EVENT_BOOKING_CANCELED,
    EVENT_PAYMENT_CREATED,
} from '@common/constant/event.constant';
import { StatusCode } from '@config/status-code';
import mongoose from 'mongoose';

export class PaymentController {
    static async confirmPayment(req: Request, res: Response): Promise<void> {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const { ticketId, userId, total } = req.body;

            const data = await PaymentDetailSchema.create(
                new PaymentDetailSchema({
                    ticket_id: ticketId,
                    user_id: userId,
                    total,
                }),
            );

            eventbus.emit(EVENT_PAYMENT_CREATED, { userId, total });

            await session.commitTransaction();

            res.status(StatusCode.CREATED).json({
                message: 'payment success!',
                data,
            });
        } catch (error) {
            session.abortTransaction().finally(() => {
                logger.error('payment could not be confirmed!', error);
                session.endSession();
                res.status(StatusCode.REQUEST_FORBIDDEN).json({
                    message: 'payment could not be confirmed!',
                });
            });
        }
    }

    static async bookingCancel(req: Request, res: Response): Promise<void> {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const { paymentDetailId } = req.body;

            const data = await PaymentDetailSchema.findByIdAndDelete(
                paymentDetailId,
            );

            if (data) {
                eventbus.emit(EVENT_BOOKING_CANCELED, {
                    ticketId: data.ticket_id,
                    userId: data.user_id,
                    total: data.total,
                });
            } else {
                res.status(StatusCode.REQUEST_NOT_FOUND).json({
                    message: 'Cannot find payment detail!',
                });
            }

            await session.commitTransaction();
            session.endSession();

            res.status(StatusCode.OK).json({
                message: 'booking has canceled!',
                data,
            });
        } catch (error) {
            session.abortTransaction().finally(() => {
                session.endSession();
                res.status(StatusCode.REQUEST_FORBIDDEN).json({
                    message: 'payment could not be confirmed!',
                    error,
                });
            });
        }
    }
}
