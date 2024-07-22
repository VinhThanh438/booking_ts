import { ITicket } from './ticket.interface';
import { Schema, model } from 'mongoose';

const ticketSchema = new Schema<ITicket>({
  ticketName: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
});

const Ticket = model<ITicket>('Ticket', ticketSchema);

export default Ticket;
