import { Request, Response, NextFunction } from 'express';

export function corsHandler(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = ['http://192.168.178.169', 'https://192.168.178.169', 'http://daily-dinner.com', 'https://daily-dinner.com', 'http://localhost:8080'];
    const origin = req.headers.origin as string;

    if (allowedOrigins.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin || '*');
    } else {
        logging.log(`Blocked Origin: ${origin}`);
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
}
