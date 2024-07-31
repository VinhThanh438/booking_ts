import { StatusCode } from '@config/status-code';
import { Request, Response } from 'express';
import { Token } from '@config/token';
import User, { IUser } from '@common/user/User';
import bcrypt from 'bcrypt';
import logger from '@common/logger';
import eventbus from '@common/eventbus';
import { EVENT_USER_LOGIN } from '@common/constant/event.constant';

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { userName, password } = req.body;

            const existedUser = await User.findOne({ user_name: userName });

            if (existedUser) {
                res.status(StatusCode.AUTH_ACCOUNT_EXISTS).json({
                    message: 'user name existed!',
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);

                await User.create(
                    new User({
                        user_name: userName,
                        password: hashed,
                    }),
                );

                res.status(StatusCode.CREATED).json({
                    message: 'registed successfully! ',
                });
            }
        } catch (error) {
            logger.error(error);
            res.status(StatusCode.REQUEST_FORBIDDEN).json({
                message: 'cannot register',
                error,
            });
        }
    }

    static async logIn(req: Request, res: Response): Promise<void> {
        try {
            const { userName, password } = req.body;

            const userData = await User.findOne({ user_name: userName });

            // check user name
            if (!userData)
                res.status(StatusCode.AUTH_ACCOUNT_NOT_FOUND).json({
                    message: 'user not found ',
                });

            // compare password
            const result = await bcrypt.compare(password, userData.password);

            if (!result)
                res.status(StatusCode.VERIFY_FAILED).json({
                    message: 'password incorrect!',
                });

            // set token
            const token = await Token.getToken(userData.transform());

            const ip = req.socket.remoteAddress;

            // save refresh token to redis
            eventbus.emit(EVENT_USER_LOGIN, {
                userId: userData._id,
                ip: ip,
                refreshToken: token.refreshToken,
            });

            res.status(StatusCode.OK).json({
                message: 'loged in successfully!',
                accessToken: token.accessToken,
            });
        } catch (error) {
            res.status(StatusCode.REQUEST_UNAUTHORIZED).json({
                message: 'can not loged in',
                error,
            });
        }
    }
}
