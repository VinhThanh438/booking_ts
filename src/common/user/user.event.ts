import eventbus from '@common/eventbus';
import logger from '@common/logger';
import { ConnectRedis } from '@common/infrastructure/redis.connect';
import { EVENT_USER_LOGIN } from '@common/constant/event.constant';

// update ticket quantity
export class UserEvent {
    public static register() {
        eventbus.on(EVENT_USER_LOGIN, UserEvent.handler);
    }

    public static async handler(data): Promise<void> {
        try {
            await ConnectRedis.set(
                `RFT-${data.userId}-${data.ip}`,
                data.refreshToken,
            );
            logger.info('Refresh token has stored');
        } catch (error) {
            logger.error(error);
        }
    }
}
