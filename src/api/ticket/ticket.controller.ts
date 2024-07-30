import logger from '@common/logger';
import { Request, Response } from 'express';
import Ticket from '@common/ticket/Ticket';
import { StatusCode } from '@config/status-code';
import { SortOrder } from 'mongoose';

export class TicketController {
    static async getALL(req: Request, res: Response): Promise<void> {
        try {
            // 1. pagiation is what, how, KIND of pagiantion, and which one is better  => depends on the use case
            let currentPage: number = parseInt(req.params.page);
            let ticketsPerPage = 4;

            // pagination theo price, theo quantity, theo created_at
            // handle paginate for serverside
            // sort by create_at (default)
            const data = await Ticket.find()
                .skip(ticketsPerPage * currentPage - ticketsPerPage)
                .limit(ticketsPerPage);

            res.status(StatusCode.OK).json({ data });
        } catch (error) {
            res.status(StatusCode.REQUEST_FORBIDDEN).json({ message: 'can not get tickets', error });
        }
    }

    static async panigate(req: Request, res: Response): Promise<void> {
        try {
            const currentPage: number = parseInt(req.params.page);
            const option = req.params.option;
            const field = req.params.field;
            let ticketsPerPage = 4;
            let num: SortOrder = 1; // asc

            if (option == 'desc') num = -1; // desc

            let sortOption: any = { price: num }; // sort by price

            if (field == 'quantity') sortOption = { quantity: num }; // sort by quantity

            const data = await Ticket.find()
                .sort(sortOption)
                .skip(ticketsPerPage * currentPage - ticketsPerPage)
                .limit(ticketsPerPage);

            res.status(StatusCode.OK).json({ data });
        } catch (error) {
            res.status(StatusCode.REQUEST_FORBIDDEN).json({ message: 'can not get tickets', error });
        }
    }

    static async addTicket(req: Request, res: Response): Promise<void> {
        try {
            const { ticketName, price, quantity } = req.body;

            await Ticket.create(
                new Ticket({
                    ticket_name: ticketName,
                    price,
                    quantity,
                }),
            );

            logger.info('ticket has added');

            res.status(StatusCode.CREATED).json({ message: 'created' });
        } catch (error) {
            logger.error('can not add tickets', error);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({ message: 'can not add tickets' });
        }
    }
}
