import { ITimestamp } from '@common/timestamp.interface';
import { Schema, model } from 'mongoose';

export interface IPaymentDetailReponse {
    pd_id: string;
    ticket_name: string;
    user_name: string;
    total: number;
}

export interface IPaymentDetail extends Document, ITimestamp {
    _id: Schema.Types.ObjectId;
    ticket_name: string;
    user_name: string;
    total: number;

    transform(): IPaymentDetailReponse;
}

const pdSchema = new Schema<IPaymentDetail>(
    {
        ticket_name: { type: String, required: true, default: null },
        user_name: { type: String, required: true, default: null },
        total: { type: Number, required: true, defaul: null },
    },
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at',
        },
    },
);

pdSchema.method({
    transform(): IPaymentDetailReponse {
        const transformed: IPaymentDetailReponse = {
            pd_id: this._id.toHexString(),
            ticket_name: this.ticket_name,
            user_name: this.user_name,
            total: this.total,
        };

        return transformed;
    },
});

export default model<IPaymentDetail>('PaymentDetail', pdSchema);
