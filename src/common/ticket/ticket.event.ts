import Ticket from '@common/ticket/Ticket';
import eventbus from '@common/eventbus';
import logger from '@common/logger';
import { EVENT_BOOKING_CREATED } from '@common/constant/event.constant';

// update ticket quantity
export class TicketEvent {
    public static register() {
        eventbus.on(EVENT_BOOKING_CREATED, TicketEvent.bookingCreatedHandler);
    }

    public static async bookingCreatedHandler(data: any): Promise<void> {
        try {
            await Ticket.findOneAndUpdate({ _id: data.ticketId }, { $inc: { quantity: -1 } });
            logger.info('Ticket updated');
        } catch (error) {
            logger.error(error.message);
            throw Error(error.message);
        }
    }
}
