import logger from "@common/logger";
import { Request, Response } from "express";
import PaymentDetail from "@common/paymentdetail/Pd";
import eventbus from "@common/eventbus";

export default class paymentController {
    static async confirmPayment(req: Request, res: Response): Promise<void> {
        try {
            const {ticketName, userName, total} = req.body
            const data = new PaymentDetail({ticketName, userName, total})

            await data.save()

            eventbus.emit('PAYMENT_CREATED', {userName, total})
        } catch (error) {
            logger.error('payment could not be confirmed!', error)
        }
    }
}