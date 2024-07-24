import eventbus from '@common/eventbus';
import { DoneCallback, Job } from 'bull';
import logger from '@common/logger';
import { EVENT_PAYMENT_CREATED } from '@common/constant/event.constant';
import { QueueService } from '@common/queue/queue.service';
import { DEDUCT_USER_MONEY } from '@common/constant/jobname.constant';

export class PaymentEvent {
  public static register() {
    eventbus.on(EVENT_PAYMENT_CREATED, PaymentEvent.handler);
  }

  public static async handler(job: Job, done: DoneCallback): Promise<void> {
    try {
      const {userName, total} = job.data
      const queue = await QueueService.getQueue(DEDUCT_USER_MONEY)
      await queue.add({userName, total})
    } catch (error) {
      logger.error('can not update user`s balance!', error);
    }
  }
}
