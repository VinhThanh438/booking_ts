import TicketDetail from '@api/ticketdetail/Td';
import eventbus from '@common/eventbus';

export default class ticketDetailEvent {
  public static register() {
    eventbus.on('BOOKING_CREATED', ticketDetailEvent.handler);
  }

  public static async handler(): Promise<void> {}
}
