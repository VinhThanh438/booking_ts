import { QueueService } from '@common/queue/queue.service';
import { DoneCallback, Job, Queue } from 'bull';
import { REFUND_TO_USER } from '@common/constant/jobname.constant';
import logger from '@common/logger';
import User from '@common/user/User';
import mongoose from 'mongoose';

export class Refund {
    static async register(): Promise<Queue> {
        const queue = await QueueService.getQueue<unknown>(REFUND_TO_USER);

        logger.info(`processing queue ${REFUND_TO_USER}`);

        await queue.process(Refund.handler);

        return queue;
    }

    static async handler(job: Job, done: DoneCallback): Promise<void> {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const { user_id, total } = job.data;

            const refundMoney = (total / 100) * 90;

            const user = await User.findById(user_id);

            if (user) {
                user.balance += refundMoney;

                await user.save();

                await session.commitTransaction();
                session.endSession();
                logger.info('successfully refunded!');
            } else logger.error('user not found');

            done();
        } catch (error) {
            session.abortTransaction().finally(() => {
                logger.error(error);
                session.endSession();
                done(error);
            });
        }
    }
}
