import { ITicketDetail } from './td.interface';
import { Schema, model } from 'mongoose';

const TdSchema = new Schema<ITicketDetail>({
  ticket_name: { type: String, require: true, default: null },
  user_name: { type: String, require: true, default: null },
  status: { type: String, require: true, default: 'booked' },
  booking_time: { type: Date, required: true, default: Date() },
});

const TicketDetail = model<ITicketDetail>('TicketDetail', TdSchema);

export default TicketDetail;
