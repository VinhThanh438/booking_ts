import { ConnectMongoose } from '@common/infrastructure/mongoose.connect';
import { ConnectRedis } from '@common/infrastructure/redis.connect';
import { WorkerServer } from './server';

export class Application {
    public static async createApp(): Promise<WorkerServer> {
        await ConnectMongoose.connect();

        await ConnectRedis.connect();

        const server = new WorkerServer();

        await server.setup();

        return;
    }
}
