import logger from '@common/logger';
import { QueueService } from '@common/queue/queue.service';
import { Job, DoneCallback, Queue } from 'bull';
import TicketDetail from '@common/booking/Td';

export class AutoCancelJob {
  static async register(): Promise<Queue> {
    const jobName: string = 'AUTO_CANCEL';
    logger.info(`processing queue ${jobName}`);

    const queue = await QueueService.getQueue<unknown>(jobName);

    await queue.clean(7000, 'delayed');
    await queue.process(AutoCancelJob.handler);

    return queue;
  }

  static async handler(job: Job<unknown>, done: DoneCallback): Promise<void> {
    try {
      await TicketDetail.findOneAndDelete({ status: 'booked' });
      logger.info('Booking has canceled!');
      done();
    } catch (error) {
      logger.error('Can not delete booking');
      done(error);
    }
  }
}
