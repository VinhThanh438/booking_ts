import eventbus from '@common/eventbus';
import logger from '@common/logger';
import { ConnectRedis } from '@common/infrastructure/redis.connect';
import { EVENT_USER_LOGIN } from '@common/constant/event.constant';

// update ticket quantity
export class UserEvent {
  public static register() {
    eventbus.on(EVENT_USER_LOGIN, UserEvent.handler);
  }

  public static async handler(userId: string, refreshToken): Promise<void> {
    try {
      await ConnectRedis.set(`RFT-${userId}`, refreshToken);
      logger.info('Refresh token is stored');
    } catch (error) {
      logger.error(error);
    }
  }
}
