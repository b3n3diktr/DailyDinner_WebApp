import dotenv from 'dotenv';

dotenv.config();

export const PRODUCTION = process.env.NODE_ENV === 'production';

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME  ?? 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ?? '1337';
export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost';
export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL_USER = process.env.EMAIL_USER ?? '';
export const EMAIL_PASS = process.env.EMAIL_PASS ?? '';