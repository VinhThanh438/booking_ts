import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URL } from '@config/environment';
import logger from '@common/logger';

export class ConnectMongoose {
    static async connect(): Promise<void> {
        try {
            logger.info(`mongo url ${MONGO_URL}`);
            await mongoose.connect(MONGO_URL);
            logger.info('db connected successfully!');
        } catch (error) {
            logger.error('can not connect to db!');
        }
    }
}
