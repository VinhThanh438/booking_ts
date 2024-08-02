import logger from '@common/logger';
import { IPaymentServiceCancel, IPaymentServiceCreate } from './payment-service.interface';
import mongoose from 'mongoose';
import eventbus from '@common/eventbus';
import { EVENT_BOOKING_CANCELED, EVENT_PAYMENT_CREATED } from '@common/constant/event.constant';
import PaymentDetail, { IPaymentDetail } from './Payment-detail';

export class PaymentService {
    static async confirmPayment(req: IPaymentServiceCreate): Promise<IPaymentDetail> {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const data = await PaymentDetail.create(
                new PaymentDetail({
                    ticket_id: req.ticket_id,
                    user_id: req.user_id,
                    total: req.total,
                }),
            );

            await session.commitTransaction();
            session.endSession();

            eventbus.emit(EVENT_PAYMENT_CREATED, {
                user_id: req.user_id,
                total: req.total,
            });

            return data;
        } catch (error) {
            session.abortTransaction().catch((err) => {
                error = err;
                session.endSession();
            });
            logger.error(error.message);
            throw new Error(error.message);
        }
    }

    static async bookingCancel(req: IPaymentServiceCancel): Promise<void> {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const data = await PaymentDetail.findByIdAndDelete(req.pd_id);

            if (data) {
                await session.commitTransaction();
                session.endSession();

                eventbus.emit(EVENT_BOOKING_CANCELED, {
                    ticket_id: data.ticket_id,
                    user_id: data.user_id,
                    total: data.total,
                });
            } else {
                throw new Error('Cannot found payment detail!');
            }
        } catch (error) {
            session.abortTransaction().catch((err) => {
                error = err;
                session.endSession();
            });
            logger.error(error.message);
            throw new Error(error.message);
        }
    }
}
