import logger from '@common/logger';
import User from '@common/user/User';
import { Request, Response, NextFunction } from 'express';

export class PaymentMiddleware {
    static async checkUserBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, total } = req.body;
            const userData = await User.findOne({ _id: userId });

            if (userData.balance < total)
                throw new Error('user balance is insufficient for payment!');
            else next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}
