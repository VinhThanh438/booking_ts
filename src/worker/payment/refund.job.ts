import { QueueService } from '@common/queue/queue.service';
import { DoneCallback, Job, Queue } from 'bull';
import { REFUND_TO_USER } from '@common/constant/jobname.constant';
import logger from '@common/logger';
import User from '@common/user/User';

export class Refund {
    static async register(): Promise<Queue> {
        const queue = await QueueService.getQueue<unknown>(REFUND_TO_USER);

        logger.info(`processing queue ${REFUND_TO_USER}`);

        await queue.process(Refund.handler);

        return queue;
    }

    static async handler(job: Job, done: DoneCallback): Promise<void> {
        try {
            const { userId, total } = job.data;

            const refundMoney = (total / 100) * 90;

            const user = await User.findById(userId);

            if (user) {
                user.balance += refundMoney;

                await user.save();

                logger.info('successfully refunded!');
            } else logger.error('user not found');

            done();
        } catch (error) {
            logger.error(error);
            done(error);
        }
    }
}
