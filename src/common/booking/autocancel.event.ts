import TicketDetail from '@api/ticketdetail/Td';
import eventbus from '@common/eventbus';
import logger from '@common/logger';
import QueueService from '@common/queue/queue.service'
import { AutoCancelJob } from '@worker/booking/auto-cancel.job';

export default class ticketDetailEvent {
  public static register() {
    eventbus.on('BOOKING_CREATED', ticketDetailEvent.handler);
  }

  public static async handler(id: unknown): Promise<void> {
    await AutoCancelJob.register()
  }
}
