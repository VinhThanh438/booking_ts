import { ITimestamp } from '@common/timestamp.interface';
import { Schema, model } from 'mongoose';

export enum Status {
    BOOKED = 'booked',
}

export interface ITicketDetailReponse {
    td_id: string;
    ticket_name: string;
    user_name: string;
    status: string;
}

export interface ITicketDetail extends Document, ITimestamp {
    _id: Schema.Types.ObjectId;
    ticket_name: string;
    user_name: string;
    status: Status;

    transform(): ITicketDetailReponse;
}

const TicketDetailSchema = new Schema<ITicketDetail>(
    {
        ticket_name: { type: String, require: true },
        user_name: { type: String, require: true },
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
            ticket_name: this.ticket_name,
            user_name: this.user_name,
            status: this.status,
        };

        return transformed;
    },
});

export default model<ITicketDetail>('TicketDetail', TicketDetailSchema);
