import express from 'express';
import { PaymentController } from './payment.controller';
import { PaymentMiddleware } from './payment.middelware';
const router = express.Router();

router.post('/', PaymentMiddleware.checkUserBalance, PaymentController.confirmPayment);

router.post('/cancel', PaymentController.bookingCancel);

export default router;
