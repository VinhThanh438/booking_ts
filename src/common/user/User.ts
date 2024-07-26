import { Schema, model } from 'mongoose';

export interface IUserResponse {
    user_id: string;
    user_name: string;
    balance: number;
}

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    user_name: string;
    password: string;
    balance: number;

    transform(): IUserResponse;
}

const UserSchema = new Schema<IUser>({
    user_name: { type: String, require: true, default: null },
    password: { type: String, require: true, default: null },
    balance: { type: Number, require: true, default: 120000 },
});

UserSchema.method({
    transform(): IUserResponse {
        const transformed: IUserResponse = {
            user_id: this._id.toHexString(),
            user_name: this.user_name,
            balance: this.balance,
        };

        return transformed;
    },
});

export default model<IUser>('User', UserSchema);
