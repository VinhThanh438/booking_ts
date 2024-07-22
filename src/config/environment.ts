import path from 'path';
import dotenv from 'dotenv-safe';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

export const PORT: number = parseInt(process.env.PORT, 10) || 3000;
export const MONGO_URL: string = process.env.MONGO_URL;
export const LOG_LEVEL: string = process.env.LOG_LEVEL || 'debug';
