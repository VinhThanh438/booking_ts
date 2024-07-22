import Ticket from "@api/ticket/Ticket";
import eventbus from "@common/eventbus";
import logger from "@common/logger";

// update ticket quantity
export default class ticketEvent {
    public static register() {
        eventbus.on('BOOKING_CREATED', ticketEvent.bookingCreateHandler)
    }

    public static async bookingCreateHandler(ticketName: unknown): Promise<void> {
        await Ticket.findOneAndUpdate({ticketName}, {$inc: {quantity: 1}})
        logger.info('Ticket updated')
    }
}