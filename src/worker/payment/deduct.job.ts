import { QueueService } from '@common/queue/queue.service';
import { DoneCallback, Job, Queue } from 'bull';
import { DEDUCT_USER_MONEY } from '@common/constant/jobname.constant';
import logger from '@common/logger';
import User from '@common/user/User';

export class DeductJob {
  static async register(): Promise<Queue> {
    const queue = await QueueService.getQueue<unknown>(DEDUCT_USER_MONEY);
    logger.info(`processing queue ${DEDUCT_USER_MONEY}`);

    await queue.process(DeductJob.handler);

    return queue;
  }

  static async handler(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { userName, total } = job.data;
      const data = await User.findOne({ user_name: userName });
      const newBalance = data.balance - total;

      if (newBalance < 0) {
        logger.error('user balance < total price!');
        return;
      } else {
        User.findOneAndUpdate({ userName }, { $set: { balance: newBalance } });
        logger.info('successfully deducted!');
      }
    } catch (error) {
      logger.error(error);
    }
  }
}
