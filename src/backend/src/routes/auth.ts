import { Router } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailSender';
import * as dotenv from 'dotenv';
import { validatePassword } from "../utils/passwordValidator";
import mongoose, {Schema} from "mongoose";
import ResetPassword, {IResetPassword} from "../models/ResetPassword";
import {server} from "../config/config";

dotenv.config();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const router = Router();
const key = process.env.JWT_KEY;
if (!key) {
    throw new Error('JWT_KEY is not set');
}
const frontendUrl = 'http://192.168.178.156';
const API_URL = `http://192.168.178.156:${server.SERVER_PORT}`;

const encodeQueryParams = (params: { [key: string]: string }) => {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};

/*export const logRedirect = (req: any, res: any, errorCode: string, message: string, header: string) => {
    const params = encodeQueryParams({
        errorCode,
        message,
        header
    });
    console.log(`Redirected from: ${frontendUrl}${req.originalUrl} , to ${frontendUrl}/fallback?${params}`);
    res.redirect(`${frontendUrl}/fallback?${params}`);
}*/

const sendActivationEmail = async (user: mongoose.Document) => {
    const activationToken = jwt.sign({ email: (user as IUser).email }, key, { expiresIn: '1d' });
    (user as IUser).activationToken = activationToken;
    await (user as IUser).save();

    const activationLink = `${API_URL}/auth/activate/${activationToken}`;
    await sendEmail((user as IUser).email, 'Account Activation', `Click the following link to activate your account: ${activationLink}`);
};

const sendResetPasswordEmail = async (email: mongoose.Document) => {
    const resetToken = jwt.sign({ email: (email as IResetPassword) }, key, { expiresIn: '1d' });
    (email as IResetPassword).token = resetToken;
    await (email as IResetPassword).save();

    const resetLink = `${API_URL}/auth/reset/${resetToken}`;
    await sendEmail((email as IResetPassword).email, 'Reset Password', `Click the following link to reset your password: ${resetLink}`);
};



// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (username.length < 1) {
        return res.status(400).json({message: 'You need to enter a username.'}).end();
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({message: 'Invalid email address.'}).end();
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(409).json({message: 'Email address already registered.'}).end();
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({message: 'Username already exists.'}).end();
    }

    const { valid, message } = validatePassword(password);
    if (!valid) {
        return res.status(400).json({message: message}).end();
    }

    let uuid;
    let exists;
    do {
        uuid = crypto.randomUUID();
        exists = await User.findOne({ uuid });
    } while (exists);

    try {
        const date = new Date();
        const created = date.toLocaleString();
        const activationToken = jwt.sign({ email }, key, { expiresIn: '1d' });
        const user = new User({
            username,
            email,
            password,
            isActive: false,
            uuid,
            created,
            activationToken
        });
        await user.save();

        try {
            await sendActivationEmail(user);
            logging.info('AUTH[Registration] - USERNAME: [${user.username}]- USERID: [${user._id}] - EMAIL: [${user.email}]');
            return res.status(201).json({message: 'Registration successful. Check your email to activate your account.'}).end();
        } catch (error) {
            await User.findByIdAndDelete(user._id);
            const params = encodeQueryParams({
                errorCode: '500',
                message: 'Error sending activation email. Please try again.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        }
    } catch (error: any) {
        const params = encodeQueryParams({
            errorCode: '500',
            message: 'Error registering user.',
            header: 'Error'
        });
        return res.redirect(`${frontendUrl}/fallback?${params}`);
    }
});



// Reset Password
router.post('/reset', async (req, res) => {
    console.log("1");
    const email = req.body;
    console.log("2");
    try {
        console.log("3");
        const user = await User.findOne({ email });
        console.log("4");
        if(!user){
            console.log("5");
            return res.status(401).json({message: 'Could not find an account with the provided email address.'}).end();
        }
        console.log("6");
        if(!user.isActive){
            console.log("7");
            return res.status(403).json({message: 'Account is not activated. Please activate your account first, before you can reset your password.'}).end();
        }
        console.log("8");
        const token = jwt.sign({ email }, key, { expiresIn: '1d' });
        const date = new Date();
        const created = date.toLocaleString();
        console.log("9");
        const resetPassword = new ResetPassword({
            token,
            userId: user._id,
            email,
            created
        });
        console.log("10");
        await resetPassword.save();
        console.log("11");
        try{
            console.log("12");
            await sendResetPasswordEmail(email);
            console.log("13");
            const params = encodeQueryParams({
                errorCode: '201',
                message: 'Reset token was send successfully.',
                header: 'Success'
            });
            logging.info('AUTH[Password Reset] - USERNAME: [${user.username}]- USERID: [${user._id}] - EMAIL: [${user.email}]');
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        }catch (error: any){
            await ResetPassword.findOneAndDelete({ email });
            const params = encodeQueryParams({
                errorCode: '500',
                message: 'Error sending password reset email. Please try again.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        }
    }catch (error: any) {
        const params = encodeQueryParams({
            errorCode: '500',
            message: 'Error sending password reset email. Please try again.',
            header: 'Error'
        });
        return res.redirect(`${frontendUrl}/fallback?${params}`);
    }
});



// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'}).end();
        }

        if (!user.isActive) {
            return res.status(403).json({message: 'Account is not activated. Pleaes check your emails for the activation link.'}).end();
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid email or password.'}).end();
        }

        const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
        res.cookie('sessionID', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 * 14,
            secure: process.env.NODE_ENV === 'production'});
        logging.info('AUTH[Login] - USERNAME: [${user.username}]- USERID: [${user._id}] - EMAIL: [${user.email}]');
        return res.status(201).json({token, message: `Successfully logged in.`, userID: user._id}).end();
    } catch (error) {
        return res.status(500).json({message: 'Internal server error.'}).end();
    }
});

//Validate sessionID
router.post('/validate', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided.'}).end();
    }

    try {
        const decoded = jwt.verify(token, key) as { userId: string };
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        return res.status(201).json({message: `Successfully validated: ${token}`, username: user.username, email: user.email, accountCreated: user.created}).end();
    } catch (error) {
        return res.status(401).json({ message: 'Token validation failed.' });
    }
});



// Activate User
router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, key) as { email: string };
        const email = decoded.email;
        const user = await User.findOne({ email });

        if (!user) {
            const params = encodeQueryParams({
                errorCode: '400',
                message: 'Invalid token.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        }
        if (user.isActive) {
            const params = encodeQueryParams({
                errorCode: '409',
                message: 'Account already active.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        }

        user.isActive = true;
        user.activationToken = '';
        try {
            await user.save({ validateBeforeSave: true });
        } catch (error: any) {
            const params = encodeQueryParams({
                errorCode: '500',
                message: 'Internal server error.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        }
        const params = encodeQueryParams({
            errorCode: '200',
            message: 'Account activated successfully.',
            header: 'Success'
        });
        logging.info("AUTH[Activation] - USERNAME: [${user.username}]- USERID: [${user._id}] - EMAIL: [${user.email}]");
        return res.redirect(`${frontendUrl}/fallback?${params}`);
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            const decoded = jwt.decode(token) as { email: string };
            const user = await User.findOne({ email: decoded.email });
            if (user) {
                try {
                    await sendActivationEmail(user);
                    const params = encodeQueryParams({
                        errorCode: '400',
                        message: 'Token has expired. A new activation link has been sent to your email.',
                        header: 'Error'
                    });
                    return res.redirect(`${frontendUrl}/fallback?${params}`);
                } catch (sendError) {
                    const params = encodeQueryParams({
                        errorCode: '500',
                        message: 'Error resending activation email. Please try again',
                        header: 'Error'
                    });
                    return res.redirect(`${frontendUrl}/fallback?${params}`);
                }
            }
        } else if (error.name === 'JsonWebTokenError') {
            const params = encodeQueryParams({
                errorCode: '400',
                message: 'Invalid web token.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        } else {
            const params = encodeQueryParams({
                errorCode: '500',
                message: 'Internal server error.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        }
    }
});

export default router;
