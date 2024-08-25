import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
            scriptSrc: ["'self'", 'https:', "'unsafe-inline'"],
        },
    },
    referrerPolicy: {
        policy: 'no-referrer' as 'no-referrer', // or one of the other allowed values
    },
};

export function helmetHandler(req: Request, res: Response, next: NextFunction) {
    helmet(helmetOptions)(req, res, next);
}
