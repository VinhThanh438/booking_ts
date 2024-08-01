import { EVENT_BOOKING_CREATED } from '@common/constant/event.constant';
import { AUTO_CANCEL } from '@common/constant/jobname.constant';
import eventbus from '@common/eventbus';
import logger from '@common/logger';
import { QueueService } from '@common/queue/queue.service';

export class TicketDetailEvent {
    public static register() {
        eventbus.on(EVENT_BOOKING_CREATED, TicketDetailEvent.handler);
    }

    public static async handler(data: any): Promise<void> {
        try {
            const getQueue = await QueueService.getQueue(AUTO_CANCEL);

            await getQueue.add({ 
                ticketDetailId: data.ticketDetailId, 
                ticketId: data.ticketId 
            }, 
            { delay: 10 * 1000 }); // 10 seconds

        } catch (error) {
            logger.error(error);
        }
    }
}
