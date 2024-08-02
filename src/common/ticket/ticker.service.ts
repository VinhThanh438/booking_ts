import logger from '@common/logger';
import Ticket, { ITicket, ITicketResponse } from './Ticket';
import { ITicketPanigation, ITicketRequest } from './ticket-service.interface';
import { pageNumber } from '@common/constant/page-number';
import { SortOrder } from 'mongoose';

export class TicketService {
    static async getAll(currentPage: number): Promise<ITicket[]> {
        try {
            return await Ticket.find()
                .skip(pageNumber * currentPage - pageNumber)
                .limit(pageNumber);
        } catch (error) {
            logger.error(error);
            throw new Error(error.message)
        }
    }

    static async panigate(req: ITicketPanigation): Promise<ITicket[]> {
        try {
            let num: SortOrder = 1; // asc

            if (req.option == 'desc') num = -1; // desc

            let sortOption: any = { price: num }; // sort by price

            if (req.field == 'quantity') sortOption = { quantity: num }; // sort by quantity

            return await Ticket.find()
                .sort(sortOption)
                .skip(pageNumber * req.page - pageNumber)
                .limit(pageNumber);
        } catch (error) {
            logger.error(error.message);
            throw new Error(error.message)
        }
    }

    static async addTicket(req: ITicketRequest): Promise<ITicket> {
        try {
            return await Ticket.create(new Ticket(req));
        } catch (error) {
            logger.error(error.message);
            throw new Error(error.message)
        }
    }
}
