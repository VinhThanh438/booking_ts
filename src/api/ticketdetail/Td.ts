import { ITd } from './td.interface';
import { Schema, model } from 'mongoose';

const tdSchema = new Schema<ITd>({
  ticketName: { type: String, require: true },
  userName: { type: String, require: true },
  status: { type: String, require: true, default: 'booked' },
  bookingTime: { type: Date, required: true, default: Date() },
});

const TicketDetail = model<ITd>('TicketDetail', tdSchema);

export default TicketDetail;
