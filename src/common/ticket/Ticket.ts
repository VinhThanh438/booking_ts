import mongoose, { Schema, model } from 'mongoose';


export interface ITicketResponse {
  id: string;
  ticket_name: string;
  price: number;
  quantity: number;
}

export interface ITicket extends Document{
  _id: Schema.Types.ObjectId;
  ticket_name: string;
  price: number;
  quantity: number;

  transform(): ITicketResponse;
}

const TicketSchema: Schema<ITicket> = new Schema({
  ticket_name: { type: String, require: true, default: null },
  price: { type: Number, require: true, default: null },
  quantity: { type: Number, require: true, default: null },
}, 
{
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at'
  }
});

TicketSchema.method({
  /**
   * Transform Sample object to API response
   *
   * @returns
   */
  transform(): ITicketResponse {
      const transformed: ITicketResponse = {
          id: this._id.toHexString(),
          ticket_name: this.ticket_name,
          price: this.price,
          quantity: this.quantity,  
      };

      return transformed;
  },
});


export default model<ITicket>('Ticket', TicketSchema);

