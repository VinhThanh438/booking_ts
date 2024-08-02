import logger from '@common/logger';
import { Request, Response } from 'express';
import { StatusCode } from '@config/status-code';
import { TicketService } from '@common/ticket/ticker.service';
import {
    ITicketPanigation,
    ITicketRequest,
} from '@common/ticket/ticket-service.interface';

export class TicketController {
    static async getALL(req: Request, res: Response): Promise<void> {
        try {
            let currentPage: number = parseInt(req.params.page);

            const data = await TicketService.getAll(currentPage);

            res.status(StatusCode.OK).json({ data });
        } catch (error) {
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'can not get tickets',
                errorMessage: error.message,
            });
        }
    }

    static async panigate(req: Request, res: Response): Promise<void> {
        try {
            const params = req.params as any;

            const data = await TicketService.panigate(
                params as ITicketPanigation,
            );

            res.status(StatusCode.OK).json({ data });
        } catch (error) {
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'can not get tickets',
                errorMessage: error.message,
            });
        }
    }

    static async addTicket(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as any;

            await TicketService.addTicket(body as ITicketRequest);

            logger.info('ticket has added');

            res.status(StatusCode.CREATED).json({ message: 'created' });
        } catch (error) {
            logger.error('can not add tickets', error);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'can not add tickets',
                errorMessage: error.message
            });
        }
    }
}
