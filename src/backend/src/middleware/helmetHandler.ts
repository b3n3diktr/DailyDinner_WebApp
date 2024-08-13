import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
            scriptSrc: ["'self'", 'https:', "'unsafe-inline'"],
            // Add more directives as needed
        },
    },
    referrerPolicy: {
        policy: 'no-referrer' as 'no-referrer', // or one of the other allowed values
    },
    // Add other Helmet options here
};

// Middleware function to apply helmet
export function helmetHandler(req: Request, res: Response, next: NextFunction) {
    helmet(helmetOptions)(req, res, next);
}
