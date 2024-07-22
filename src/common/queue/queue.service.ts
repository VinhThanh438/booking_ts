import redisConnect from '@common/infrastructure/redis.connect';
import logger from '@common/logger';
import BullQueue, { JobStatusClean, Queue } from 'bull';

export default class QueueService {
  private static queue: Map<string, Queue> = new Map<string, Queue>();
}
