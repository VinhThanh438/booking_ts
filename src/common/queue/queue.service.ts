import redisConnect from '@common/infrastructure/redis.connect';
import logger from '@common/logger';
import BullQueue, { JobStatusClean, Queue } from 'bull';
import { error } from 'console';

export default class QueueService {
  private static queues: Map<string, Queue> = new Map<string, Queue>();

  static async getQueue<T = unknown>(jobName: string): Promise<Queue<unknown>> {
    let q = QueueService.queues.get(jobName);

    if (!q) {
      q = new BullQueue<T>(jobName);
      q.on('error', (error) => logger.error('can not process queue'));
      QueueService.queues.set(jobName, q);
    }

    return q;
  }
}
