/* eslint-disable @typescript-eslint/ban-types */
declare global {
    namespace Express {
        interface Request {
            user?: unknown;
            rawBody: Buffer;
        }

        interface Response {
            sendJson(data: unknown): this;
        }
    }
}

export {};
