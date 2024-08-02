import logger from "@common/logger"
import { IBookingService } from "./booking-service.interface"
import Booking from "./Booking"
import eventbus from "@common/eventbus"
import { EVENT_BOOKING_CREATED } from "@common/constant/event.constant"

export class BookingSerVice {
    static async addBooking(req: IBookingService): Promise<void> {
        try {
            const data = await Booking.create(
                new Booking({
                    ticket_id: req.ticket_id,
                    user_id: req.user_id
                })
            )

            eventbus.emit(EVENT_BOOKING_CREATED, {
                bookingId: data._id,
                ticketId: data.ticket_id
            })
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
        }
    }
}