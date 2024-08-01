import mongoose, { Schema, model } from 'mongoose';

export interface ITicketResponse {
    ticket_id: string;
    ticket_name: string;
    price: number;
    quantity: number;
}

export interface ITicket extends Document {
    _id: Schema.Types.ObjectId;
    ticket_name: string;
    price: number;
    quantity: number;
    locked: boolean

    transform(): ITicketResponse;
}

const TicketSchema: Schema<ITicket> = new Schema(
    {
        ticket_name: { type: String, require: true },
        price: { type: Number, require: true },
        quantity: { type: Number, require: true, default: 5 },
        locked: { type: Boolean, required: true, default: false}
    },
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at',
        },
    },
);

TicketSchema.method({
    /**
     * Transform Sample object to API response
     *
     * @returns
     */
    transform(): ITicketResponse {
        const transformed: ITicketResponse = {
            ticket_id: this._id.toHexString(),
            ticket_name: this.ticket_name,
            price: this.price,
            quantity: this.quantity,
        };

        return transformed;
    },
});

export default model<ITicket>('Ticket', TicketSchema);
