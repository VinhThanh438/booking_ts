/* eslint-disable @typescript-eslint/ban-types */

import { IAuthUser } from '@common/auth/auth.interface';

declare global {
    namespace Express {
        interface Request {
            user?: IAuthUser;
            rawBody: Buffer;
        }

        interface Response {
            sendJson(data: unknown): this;
        }
    }
}

export {};
