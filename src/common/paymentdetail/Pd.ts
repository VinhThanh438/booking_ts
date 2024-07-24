import { Schema, model } from 'mongoose';
import { IPaymentDetail } from './pd.interface';

const pdSchema = new Schema<IPaymentDetail>({
  ticketName: { type: String, required: true },
  userName: { type: String, required: true },
  total: { type: Number, required: true },
  confirmation_time: { type: Date, required: true, default: Date() },
});

const PaymentDetail = model<IPaymentDetail>('PaymentDetail', pdSchema);

export default PaymentDetail;
