import { connectMongoose } from '@common/infrastructure/mongoose.connect';
import redisConnect from '@common/infrastructure/redis.connect';
import { WorkerServer } from './server';

export class Application {
  public static async createApp(): Promise<WorkerServer> {
    await connectMongoose.connect();
    await redisConnect.connect();
    const server = new WorkerServer();
    await server.setup();
    return;
  }
}
