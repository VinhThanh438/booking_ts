import { ITimestamp } from '@common/timestamp.interface';
import { Schema, model } from 'mongoose';

export enum Status {
    BOOKED = 'booked',
}

export interface ITicketDetailReponse {
    td_id: string;
    ticket_id: string;
    user_id: string;
    status: string;
}

export interface ITicketDetail extends Document, ITimestamp {
    _id: Schema.Types.ObjectId;
    ticket_id: string;
    user_id: string;
    status: Status;

    transform(): ITicketDetailReponse;
}

const TicketDetailSchema = new Schema<ITicketDetail>(
    {
        ticket_id: { type: String, require: true },
        user_id: { type: String, require: true },
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.BOOKED,
        },
    },
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at',
        },
    },
);

TicketDetailSchema.method({
    transform(): ITicketDetailReponse {
        const transformed: ITicketDetailReponse = {
            td_id: this._id.toHexString(),
            ticket_id: this.ticket_name,
            user_id: this.user_name,
            status: this.status,
        };

        return transformed;
    },
});

export default model<ITicketDetail>('TicketDetail', TicketDetailSchema);
