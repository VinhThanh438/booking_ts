import logger from '@common/logger';
import { QueueService } from '@common/queue/queue.service';
import { Job, DoneCallback, Queue } from 'bull';
import Booking, { Status } from '@common/booking/Booking';
import { AUTO_CANCEL } from '@common/constant/jobname.constant';
import mongoose from 'mongoose';
import Ticket from '@common/ticket/Ticket';

export class AutoCancelJob {
    static async register(): Promise<Queue> {
        logger.info(`processing queue ${AUTO_CANCEL}`);

        const queue = await QueueService.getQueue<unknown>(AUTO_CANCEL);

        await queue.clean(5000, 'delayed');
        await queue.process(AutoCancelJob.handler);

        return queue;
    }

    static async handler(job: Job<any>, done: DoneCallback): Promise<void> {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            await Booking.findOneAndDelete({
                _id: job.data.bookingId,
                status: Status.BOOKED,
            });

            // update ticket quantity
            await Ticket.findOneAndUpdate(
                { _id: job.data.ticketId },
                {
                    $inc: {
                        quantity: 1,
                    },
                    locked: false,
                },
            );

            logger.info('Booking has been canceled!');
            await session.commitTransaction();
            done();
        } catch (error) {
            logger.error('Can not delete booking', error);
            await session.abortTransaction();
            done(error);
        } finally {
            session.endSession();
        }
    }
}
