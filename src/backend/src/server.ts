import http from 'http';
import express from 'express';
import './config/logging';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRoutes from './routes/user/authRoutes';
import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { helmetHandler } from "./middleware/helmetHandler";
import { SERVER_HOSTNAME, SERVER_PORT, MONGO_URI } from "./config/config";
import uploadRoutes from "./routes/user/uploadProfilePictureRoutes";
import recipesRoutes from "./routes/recipes/recipesRoutes";

export const application = express();

export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    application.use(corsHandler);
    logging.log('----------------------------------------');
    logging.log('Logging & Configuration');
    logging.log('----------------------------------------');
    application.use(loggingHandler);

    logging.log('----------------------------------------');
    logging.log('Initializing API');
    logging.log('----------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());
    application.use(cookieParser());

    logging.log('----------------------------------------');
    logging.log('Security Headers');
    logging.log('----------------------------------------');
    application.use(helmetHandler);

    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');
    application.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({ hello: 'world!' });
    });
    application.use('/api/auth', authRoutes);
    application.use('/api/user/', uploadRoutes);
    application.use('/api/recipes/', recipesRoutes);
    application.set('trust proxy', 1);

    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    application.use(routeNotFound);

    logging.log('----------------------------------------');
    logging.log('Connecting to Database');
    logging.log('----------------------------------------');
    await mongoose.connect(MONGO_URI)
        .catch(error => { logging.error(`MongoDB connection error: ${error}`); });

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${SERVER_HOSTNAME}:${SERVER_PORT}`);
        logging.log('----------------------------------------');
    });
};

Main();