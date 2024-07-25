import { Schema, model, ObjectId } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema = new Schema<IUser>({
  user_id: { type: Schema.Types.ObjectId, auto: true},
  name: { type: String, require: true, default: null },
  password: { type: String, require: true, default: null },
  balance: { type: Number, require: true, default: 120000 },
  create_at: { type: Date, required: true, default: Date() },
});

const User = model<IUser>('User', UserSchema);

export default User;
