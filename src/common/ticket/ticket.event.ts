import Ticket from '@common/ticket/Ticket';
import eventbus from '@common/eventbus';
import logger from '@common/logger';

// update ticket quantity
export default class ticketEvent {
  public static register() {
    eventbus.on('BOOKING_CREATED', ticketEvent.bookingCreateHandler);
  }

  public static async bookingCreateHandler(id: unknown): Promise<void> {
    await Ticket.findOneAndUpdate({ id }, { $inc: { quantity: 1 } });
    logger.info('Ticket updated');
  }
}
