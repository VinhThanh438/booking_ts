import { ConnectMongoose } from '@common/infrastructure/mongoose.connect';
import { ExpressServer } from './server';
import { PORT } from '@config/environment';
import { ConnectRedis } from '@common/infrastructure/redis.connect';
import { TicketEvent } from '@common/ticket/ticket.event';
import { UserEvent } from '@common/user/user.event';
import { PaymentEvent } from '@common/payment/payment.event';
import { BookingEvent } from '@common/booking/booking.event';

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
        BookingEvent.register();
        UserEvent.register();
        PaymentEvent.register();
    }
}
