import { IJobHangler } from './interface';
import { Queue } from 'bull';
import { AutoCancelJob } from './booking/auto-cancel.job';

export class Router {
  static async register(): Promise<Queue[]> {
    const queues: IJobHangler[] = [AutoCancelJob];
    return Promise.all(queues.map((q) => q.register()));
  }
}
