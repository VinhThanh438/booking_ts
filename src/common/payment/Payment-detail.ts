import { ITimestamp } from '@common/timestamp.interface';
import { Schema, model } from 'mongoose';

export interface IPaymentDetailReponse {
    pd_id: string;
    ticket_id: string;
    user_id: string;
    total: number;
}

export interface IPaymentDetail extends Document, ITimestamp {
    _id: Schema.Types.ObjectId;
    ticket_id: string;
    user_id: string;
    total: number;

    transform(): IPaymentDetailReponse;
}

const PaymentDetailSchema = new Schema<IPaymentDetail>(
    {
        ticket_id: { type: String, required: true, default: null },
        user_id: { type: String, required: true, default: null },
        total: { type: Number, required: true, defaul: null },
    },
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at',
        },
    },
);

PaymentDetailSchema.method({
    transform(): IPaymentDetailReponse {
        const transformed: IPaymentDetailReponse = {
            pd_id: this._id.toHexString(),
            ticket_id: this.ticket_name,
            user_id: this.user_name,
            total: this.total,
        };

        return transformed;
    },
});

export default model<IPaymentDetail>('PaymentDetail', PaymentDetailSchema);
