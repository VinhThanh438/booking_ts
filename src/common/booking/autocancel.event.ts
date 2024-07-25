import { EVENT_BOOKING_CREATED } from '@common/constant/event.constant';
import { AUTO_CANCEL } from '@common/constant/jobname.constant';
import eventbus from '@common/eventbus';
import { QueueService } from '@common/queue/queue.service';

export class TicketDetailEvent {
  public static register() {
    eventbus.on(EVENT_BOOKING_CREATED, TicketDetailEvent.handler);
  }

  public static async handler(id: unknown): Promise<void> {
    const getQueue = await QueueService.getQueue(AUTO_CANCEL);
    await getQueue.add({}, { delay: 7 * 1000 });
  }
}
