import ioredis, { Redis } from 'ioredis';
import { REDIS_URL } from '@config/environment';
import logger from '@common/logger';

export default class redisConnect {
  private static client: Redis;
  private static subcriber: Redis;
  private static allClients: Redis[] = [];

  static async getClient(): Promise<Redis> {
    if (!redisConnect.client) {
      await redisConnect.connect();
    }
    return redisConnect.client;
  }

  static async connect(overrideClient = true): Promise<Redis> {
    const tmp = new ioredis(REDIS_URL);

    tmp.on('ready', () => {
      logger.info('Connect to redis successfully!');
    });
    tmp.on('end', () => {
      logger.info('Connect to redis ended!');
    });

    tmp.on('error', (error) => {
      logger.error('Connect to redis error!', error);
    });

    try {
      await tmp.connect();
    } catch (error) {
      logger.error('Connect to redis error!', error);
      process.exit(1);
    }

    if (overrideClient) {
      redisConnect.client = tmp;
    }

    redisConnect.allClients.push(tmp);

    return tmp;
  }

  static createClient(): Redis {
    const tmp = new ioredis(REDIS_URL);

    tmp.on('ready', () => {
      logger.info('Connect to redis successfully!');
    });
    tmp.on('end', () => {
      logger.info('Connect to redis ended!');
    });

    tmp.on('error', (error) => {
      logger.error('Connect to redis error!', error);
    });

    redisConnect.allClients.push(tmp);

    return tmp;
  }

  static serialize(value: unknown): string {
    if (value) {
      return JSON.stringify(value);
    }
    return value as string;
  }

  static deserialize(value: unknown): unknown {
    if (value && typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  }

  static async get(key: string, shouldDeserialize = false): Promise<unknown> {
    const value = await (await redisConnect.getClient()).get(key);
    return shouldDeserialize ? redisConnect.deserialize(value) : value;
  }

  static async set(key: string, value: unknown, ttl = 0, shouldSerialize = false): Promise<unknown> {
    const stringValue: string = shouldSerialize ? redisConnect.serialize(value) : (value as string);
    if (ttl > 0) {
      return (await redisConnect.getClient()).set(key, stringValue, 'EX', ttl);
    }
    return (await redisConnect.getClient()).set(key, stringValue);
  }
}
