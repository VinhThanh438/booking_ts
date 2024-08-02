export interface IPaymentServiceCreate {
    ticket_id: string;
    user_id: string;
    total: number;
}

export interface IPaymentServiceCancel {
    pd_id: string;
}
