import { QueueService } from '@common/queue/queue.service';
import { DoneCallback, Job, Queue } from 'bull';
import {
    REFUND_TO_USER,
    UPDATE_TICKET_QUANTITY,
} from '@common/constant/jobname.constant';
import logger from '@common/logger';
import Ticket from '@common/ticket/Ticket';

export class UpdateQuantity {
    static async register(): Promise<Queue> {
        const queue = await QueueService.getQueue<unknown>(
            UPDATE_TICKET_QUANTITY,
        );

        logger.info(`processing queue ${UPDATE_TICKET_QUANTITY}`);

        await queue.process(UpdateQuantity.handler);

        return queue;
    }

    static async handler(job: Job, done: DoneCallback): Promise<void> {
        try {
            const { ticketId } = job.data;

            await Ticket.findOneAndUpdate(
                {
                    _id: ticketId,
                },
                {
                    $inc: { quantity: 1 },
                },
            );

            logger.info('Quantity updated!');

            done();
        } catch (error) {
            logger.error(error);
            done(error);
        }
    }
}
