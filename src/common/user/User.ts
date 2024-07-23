import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, require: true },
  password: { type: String, require: true },
  balance: { type: Number, require: true, default: 120000 },
  create_at: { type: Date, required: true, default: Date() },
});

const User = model<IUser>('User', userSchema);

export default User;
