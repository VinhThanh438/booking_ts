import eventbus from '@common/eventbus';
import logger from '@common/logger';
import QueueService from '@common/queue/queue.service'

export default class ticketDetailEvent {
  public static register() {
    eventbus.on('BOOKING_CREATED', ticketDetailEvent.handler);
  }

  public static async handler(id: unknown): Promise<void> {
    const getQueue = await QueueService.getQueue('AUTO_CANCEL')
    await getQueue.add({}, {delay: 7 * 1000})
    logger.info('done.')
  }
}
