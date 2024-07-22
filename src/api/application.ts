import { connectMongoose } from '@common/infrastructure/mongoose.connect';
import ExpressServer from './server';
import { PORT } from '@config/environment';

export class Application {

    public static async createApp(): Promise<ExpressServer> {
        await connectMongoose.connect()

        const expressServer = new ExpressServer()
        expressServer.setup(PORT)
        
        return expressServer
    }
}
