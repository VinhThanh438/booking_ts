import ioredis, {Redis} from 'ioredis'
import { REDIS_URL } from '@config/environment'
import logger from '@common/logger'

export default class redisConnect {
    private static client: Redis

    public static connect(): Promise<Redis> {
        const tmp = new ioredis(REDIS_URL)

        tmp.on('ready', () => {
            logger.info('Connect to redis successfully!');
        });
        tmp.on('end', () => {
            logger.info('Connect to redis ended!');
        });

        tmp.on('error', (error) => {
            logger.error('Connect to redis error!', error);
        });

        return
    }

    public static set(key: string, value: any) {

    }

    public static get(key: string) {

    }
}