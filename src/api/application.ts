import { ConnectMongoose } from '@common/infrastructure/mongoose.connect';
import ExpressServer from './server';
import { PORT } from '@config/environment';
import { ConnectRedis } from '@common/infrastructure/redis.connect';
import { TicketEvent } from '@common/ticket/ticket.event';
import { TicketDetailEvent } from '@common/booking/autocancel.event';

export class Application {
  public static async createApp(): Promise<ExpressServer> {
    await ConnectMongoose.connect();
    await ConnectRedis.connect();

    this.registerEvent();

    const expressServer = new ExpressServer();
    expressServer.setup(PORT);

    return expressServer;
  }

  public static registerEvent() {
    TicketEvent.register();
    TicketDetailEvent.register();
  }
}
