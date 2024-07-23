import { Schema, model } from 'mongoose';
import { IPd } from './pd.interface';

const pdSchema = new Schema<IPd>({
  ticketName: { type: String, required: true },
  userName: { type: String, required: true },
  total: { type: Number, required: true },
  confirmation_time: { type: Date, required: true, default: Date() },
});

export default pdSchema;
