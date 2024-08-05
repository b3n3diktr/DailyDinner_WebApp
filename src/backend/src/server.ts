import http from 'http';
import express from 'express';
import './config/logging';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from './routes/auth';

import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { server } from './config/config';

export const application = express();
const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests, please try again later.'});
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.log('----------------------------------------');
    logging.log('Initializing API');
    logging.log('----------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());
    application.use(cookieParser());
    application.use(limiter);

    logging.log('----------------------------------------');
    logging.log('Logging & Configuration');
    logging.log('----------------------------------------');
    application.use(corsHandler);
    application.use(loggingHandler);

    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');
    application.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({ hello: 'world!' });
    });
    application.use('/api/auth', authRoutes);

    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    application.use(routeNotFound);

    logging.log('----------------------------------------');
    logging.log('Connecting to Database');
    logging.log('----------------------------------------');
    mongoose.connect(server.MONGO_URI)
        .catch(error => logging.error(`MongoDB connection error: ${error}`));

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
        logging.log('----------------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();