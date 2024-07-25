import { ITicket } from './ticket.interface';
import { Schema, model } from 'mongoose';

const TicketSchema = new Schema<ITicket>({
  ticket_name: { type: String, require: true, default: null },
  price: { type: Number, require: true, default: null },
  quantity: { type: Number, require: true, default: null },
});

const Ticket = model<ITicket>('Ticket', TicketSchema);

export default Ticket;
