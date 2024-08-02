import { StatusCode } from '@config/status-code';
import { NextFunction, Request, Response } from 'express';
import logger from '@common/logger';
import { UserService } from '@common/user/user.service';
import { IUserLogInService, IUserRegisterService } from '@common/user/user-servive.interface';

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as any;

            await UserService.register(body as IUserRegisterService);

            res.status(StatusCode.CREATED).json({
                message: 'registed successfully! ',
            });
        } catch (error) {
            logger.error(error.message);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'cannot register',
                errorMessage: error.message,
            });
        }
    }

    static async logIn(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as any;
            const ip = req.socket.remoteAddress;

            const token = await UserService.logIn(body as IUserLogInService, ip)

            res.status(StatusCode.OK).json({
                message: 'loged in successfully!',
                accessToken: token.accessToken,
            });
        } catch (error) {
            res.status(StatusCode.REQUEST_UNAUTHORIZED).json({
                message: 'can not loged in',
                errorMessage: error.message,
            });
        }
    }

    static async logOut(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            req.headers.accessToken = null;
            res.status(StatusCode.OK).json({
                message: 'loged out sucessfully!',
            });
        } catch (error) {
            res.status(StatusCode.SERVER_ERROR).json(error);
        }
    }
}
