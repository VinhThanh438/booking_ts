import logger from '@common/logger';
import { QueueService } from '@common/queue/queue.service';
import { Job, DoneCallback, Queue } from 'bull';
import TicketDetail, { StatusConstant } from '@common/ticket-detail/Ticket-detail';
import { AUTO_CANCEL } from '@common/constant/jobname.constant';

export class AutoCancelJob {
    static async register(): Promise<Queue> {
        logger.info(`processing queue ${AUTO_CANCEL}`);

        const queue = await QueueService.getQueue<unknown>(AUTO_CANCEL);

        await queue.clean(5000, 'delayed');
        await queue.process(AutoCancelJob.handler);

        return queue;
    }

    static async handler(job: Job<unknown>, done: DoneCallback): Promise<void> {
        try {
            await TicketDetail.findOneAndDelete({ status: StatusConstant.booked });
            logger.info('Booking has canceled!');
            done();
        } catch (error) {
            logger.error('Can not delete booking');
            done(error);
        }
    }
}
