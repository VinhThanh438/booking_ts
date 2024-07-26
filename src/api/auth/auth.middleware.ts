import { ConnectRedis } from '@common/infrastructure/redis.connect';
import { StatusCode } from '@config/status-code';
import { isTokenExpried, Token } from '@config/token';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export class AuthMidleware {
  public static async requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.accessToken;
      if (!accessToken) {
        res.status(StatusCode.SERVER_AUTH_ERROR).json({ message: 'token is missing' });
      }

      if (isTokenExpried(accessToken)) {
        // decode access token
        const data = jwt.decode(accessToken)
        // get refresh token
        const refreshToken = await ConnectRedis.get(`RFT-${data._id}`)
        // check refresh token expired time
        if (isTokenExpried(refreshToken)) {
            req.headers.accessToken = null
            res.status(StatusCode.VERIFY_FAILED).json({ message: 'user needs to log in again!'})
        } else {
            // create new access token
            const newAccessToken = await Token.accessToken({
                user_id: data.user_id,
                user_name: data.user_name,
                balance: data.balance
            })
            req.headers.accessToken = newAccessToken
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
