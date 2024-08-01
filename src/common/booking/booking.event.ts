import { EVENT_BOOKING_CREATED } from '@common/constant/event.constant';
import { AUTO_CANCEL } from '@common/constant/jobname.constant';
import eventbus from '@common/eventbus';
import logger from '@common/logger';
import { QueueService } from '@common/queue/queue.service';
import { IBookingEvent } from './booking.interface';

export class BookingEvent {
    public static register() {
        eventbus.on(EVENT_BOOKING_CREATED, BookingEvent.handler);
    }

    public static async handler(data: IBookingEvent): Promise<void> {
        try {
            const getQueue = await QueueService.getQueue(AUTO_CANCEL);

            await getQueue.add(
                {
                    bookingId: data.bookingId,
                    ticketId: data.ticketId,
                },
                { delay: 20 * 1000 },
            ); // 20 seconds
        } catch (error) {
            logger.error(error);
        }
    }
}
