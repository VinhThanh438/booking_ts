import { connectMongoose } from '@common/infrastructure/mongoose.connect';
import ExpressServer from './server';
import { PORT } from '@config/environment';
import redisConnect from '@common/infrastructure/redis.connect';
import ticketEvent from '@common/ticket/ticket.event';

export class Application {
  public static async createApp(): Promise<ExpressServer> {
    await connectMongoose.connect();
    await redisConnect.connect();

    this.registerEvent();

    const expressServer = new ExpressServer();
    expressServer.setup(PORT);

    return expressServer;
  }

  public static registerEvent() {
    ticketEvent.register();
  }
}
