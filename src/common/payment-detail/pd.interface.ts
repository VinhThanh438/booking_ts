// payment detail interface

import { Schema } from "mongoose";

export interface IPaymentDetail {
  pd_id: any;
  ticket_name: string;
  user_name: string;
  total: number;
  confirmation_time: any;
}
