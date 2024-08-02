import logger from '@common/logger';
import { IUserLogInService, IUserRegisterService } from './user-servive.interface';
import User, { IUser } from './User';
import bcrypt from 'bcrypt';
import { Token } from '@config/token';
import eventbus from '@common/eventbus';
import { EVENT_USER_LOGIN } from '@common/constant/event.constant';
import { IToken } from '@config/token.interface';

export class UserService {
    static async register(req: IUserRegisterService): Promise<IUser> {
        try {
            const existedUser = await User.findOne({
                user_name: req.user_name,
            });

            if (existedUser) {
                throw new Error('user name already exits!');
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.password, salt);

                return await User.create(
                    new User({
                        user_name: req.user_name,
                        password: hashed,
                    }),
                );
            }
        } catch (error) {
            logger.error(error.message);
            throw new Error(error.message)
        }
    }

    static async logIn(req: IUserLogInService, ip: any): Promise<IToken> {
        try {
            const userData = await User.findOne({ user_name: req.user_name });

            // check user name
            if (!userData)
                throw new Error('user not found!')

            // compare password
            const result = await bcrypt.compare(req.password, userData.password);

            if (!result)
                throw new Error('incorrect password!')

            // set token
            const token = await Token.getToken(userData.transform());

            // save refresh token to redis
            eventbus.emit(EVENT_USER_LOGIN, {
                userId: userData._id,
                ip: ip,
                refreshToken: token.refreshToken,
            });

            return token
        } catch (error) {
            logger.error(error.message);
            throw new Error(error.message)
        }
    }
}
