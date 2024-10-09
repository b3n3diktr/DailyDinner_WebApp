import { Request, Response, NextFunction } from 'express';

export function corsHandler(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = [
        'http://192.168.178.169',
        'https://192.168.178.169',
        'http://daily-dinner.com',
        'https://daily-dinner.com',
    ];
    const origin = req.headers.origin as string;

    if (allowedOrigins.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin); // Set the specific allowed origin
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');

        // Respond immediately to OPTIONS requests for preflight checks
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.sendStatus(200);
        }
    } else {
        logging.log(`Blocked Origin: ${origin}`);
        return res.status(403).json({ message: 'CORS policy violation' });
    }

    // Pass to the next handler if the origin is allowed
    next();
}
