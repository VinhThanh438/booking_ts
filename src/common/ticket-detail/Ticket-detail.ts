import { ITimestamp } from '@common/timestamp.interface';
import mongoose, { Schema, model } from 'mongoose';

export interface ITicketDetailReponse {
  td_id: string;
  ticket_name: string;
  user_name: string;
  status: string;
}

export interface ITicketDetail extends Document, ITimestamp {
  _id: any;
  ticket_name: string;
  user_name: string;
  status: string;

  transform(): ITicketDetailReponse;
}

const TdSchema = new Schema<ITicketDetail>(
  {
    ticket_name: { type: String, require: true, default: null },
    user_name: { type: String, require: true, default: null },
    status: { type: String, require: true, default: 'booked' },
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
);

TdSchema.method({
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

export default model<ITicketDetail>('TicketDetail', TdSchema);
