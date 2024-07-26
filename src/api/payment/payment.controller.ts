import logger from '@common/logger';
import { Request, Response } from 'express';
import PaymentDetail from '@common/payment-detail/Pd';
import eventbus from '@common/eventbus';
import { EVENT_PAYMENT_CREATED } from '@common/constant/event.constant';
import { StatusCode } from '@config/status-code';

export class PaymentController {
  static async confirmPayment(req: Request, res: Response): Promise<void> {
    try {
      const { ticketName, userName, total } = req.body;

      const data = await PaymentDetail.create(
        new PaymentDetail({
          ticket_name: ticketName,
          user_name: userName,
          total,
        }),
      );
      // const data = new PaymentDetail({
      //   ticket_name: ticketName,
      //   user_name: userName,
      //   total
      // });

      // await data.save();
      // const auth = req.auth;

      // paerformance
      // await PaymentDetail.findOneAndUpdate({
      //   ticket_name: ticketName,
      //   user_name: userName,
      // }, {
      //   total
      // }, {
      //   new:
      //   true,
      //   upsert: true
      // })

      eventbus.emit(EVENT_PAYMENT_CREATED, { userName, total });

      res.status(StatusCode.CREATED).json({ message: 'payment success!' });
    } catch (error) {
      logger.error('payment could not be confirmed!', error);
      res.status(StatusCode.REQUEST_FORBIDDEN).json({ message: 'payment could not be confirmed!' });
    }
  }
}
