import logger from '@common/logger';
import { Request, Response } from 'express';
import { StatusCode } from '@config/status-code';
import { PaymentService } from '@common/payment/payment.service';
import {
    IPaymentServiceCancel,
    IPaymentServiceCreate,
} from '@common/payment/payment-service.interface';

export class PaymentController {
    static async confirmPayment(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as any;

            const data = await PaymentService.confirmPayment(body as IPaymentServiceCreate);

            res.status(StatusCode.CREATED).json({
                message: 'payment success!',
                data,
            });
        } catch (error) {
            logger.error(error.message);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'payment could not be confirmed!',
            });
        }
    }

    static async bookingCancel(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as any;

            const data = await PaymentService.bookingCancel(body as IPaymentServiceCancel);

            res.status(StatusCode.OK).json({
                message: 'booking has canceled!',
                data,
            });
        } catch (error) {
            logger.error(error.message);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: error.message,
            });
        }
    }
}
