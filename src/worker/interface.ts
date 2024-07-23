import { Job, DoneCallback, Queue } from 'bull';

export default interface IJobHangler {
  register(): Promise<Queue>;
  handler(job: Job, done: DoneCallback): Promise<void>;
}
