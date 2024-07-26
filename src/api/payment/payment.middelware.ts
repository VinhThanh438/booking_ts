import logger from '@common/logger';
import User from '@common/user/User';
import { Request, Response, NextFunction } from 'express';

export class PaymentMiddleware {
    static async checkUserBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userName, total } = req.body;
            const userData = await User.findOne({ user_name: userName });

            if (userData.balance < total) {
                logger.error('user balance is insufficient for payment!');
                return;
            } else next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}
