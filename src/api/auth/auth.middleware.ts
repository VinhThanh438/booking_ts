import { StatusCode } from '@config/status-code';
import { Request, Response, NextFunction } from 'express';

export class AuthMidleware {
  public static async requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.accessToken;
      if (!token) {
        res.status(StatusCode.SERVER_AUTH_ERROR).json({ message: 'token is missing' });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
