import { Schema, model } from 'mongoose';
import { IPaymentDetail } from './pd.interface';

const pdSchema = new Schema<IPaymentDetail>({
  pd_id: { type: Schema.Types.ObjectId, auto: true},
  ticket_name: { type: String, required: true, default: null },
  user_name: { type: String, required: true, default: null },
  total: { type: Number, required: true, defaul: null },
  confirmation_time: { type: Date, required: true, default: Date() },
});

const PaymentDetail = model<IPaymentDetail>('PaymentDetail', pdSchema);

export default PaymentDetail;
