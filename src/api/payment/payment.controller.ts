import logger from '@common/logger';
import { Request, Response } from 'express';
import PaymentDetail from '@common/paymentdetail/Pd';
import eventbus from '@common/eventbus';
import { EVENT_PAYMENT_CREATED } from '@common/constant/event.constant';

export class PaymentController {
  static async confirmPayment(req: Request, res: Response): Promise<void> {
    try {
      const { ticketName, userName, total } = req.body;
      const data = new PaymentDetail({ ticketName, userName, total });

      await data.save();

      eventbus.emit(EVENT_PAYMENT_CREATED, { userName, total });
    } catch (error) {
      logger.error('payment could not be confirmed!', error);
    }
  }
}
