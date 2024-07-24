import { ITicketDetail } from './td.interface';
import { Schema, model } from 'mongoose';

const TdSchema = new Schema<ITicketDetail>({
  ticketName: { type: String, require: true },
  userName: { type: String, require: true },
  status: { type: String, require: true, default: 'booked' },
  bookingTime: { type: Date, required: true, default: Date() },
});

const TicketDetail = model<ITicketDetail>('TicketDetail', TdSchema);

export default TicketDetail;
