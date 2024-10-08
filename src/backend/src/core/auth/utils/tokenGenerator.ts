import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../../config/config";

const key = JWT_SECRET;

if (!key) {
    throw new Error('JWT_KEY is not set');
}

export const generateTokenEmail = (email: string) => {
    return jwt.sign({ email: email}, key, { expiresIn: '1d' });
};

export const generateSessionID = (uuid: string, remember: boolean) => {
    return jwt.sign({ uuid: uuid}, key, { expiresIn: remember ? '14d' : '1d'});
};

export const verifySessionID = (token: string) => {
    return jwt.verify(token, key) as {uuid: string};
};