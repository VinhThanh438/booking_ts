import eventbus from '@common/eventbus';
import { DoneCallback, Job } from 'bull';
import logger from '@common/logger';
import {
    EVENT_BOOKING_CANCELED,
    EVENT_PAYMENT_CREATED,
} from '@common/constant/event.constant';
import { QueueService } from '@common/queue/queue.service';
import {
    DEDUCT_USER_MONEY,
    REFUND_TO_USER,
    UPDATE_TICKET_QUANTITY,
} from '@common/constant/jobname.constant';
import { IPaymentEvent } from './payment-event.interface';

export class PaymentEvent {
    public static register() {
        eventbus.on(EVENT_PAYMENT_CREATED, PaymentEvent.createdHandler);
        eventbus.on(EVENT_BOOKING_CANCELED, PaymentEvent.canceledHandler);
    }

    public static async createdHandler(
        data: IPaymentEvent,
        done: DoneCallback,
    ): Promise<void> {
        try {
            const { user_id, total } = data;

            const queue = await QueueService.getQueue(DEDUCT_USER_MONEY);
            await queue.add({ user_id, total });
        } catch (error) {
            logger.error('can not update user`s balance!', error);
        }
    }

    public static async canceledHandler(
        data: IPaymentEvent,
        done: DoneCallback,
    ): Promise<void> {
        try {
            const { user_id, ticket_id, total } = data;

            // refund to user (refund money = 90% of ticket price)
            let queue = await QueueService.getQueue(REFUND_TO_USER);
            await queue.add({ user_id, total });
            logger.info('Money has been refunded to user');

            // update ticket quantity
            queue = await QueueService.getQueue(UPDATE_TICKET_QUANTITY);
            await queue.add({ ticket_id });
            logger.info('Quantity has been updated');
        } catch (error) {
            logger.error('can not update user`s balance!', error);
        }
    }
}
