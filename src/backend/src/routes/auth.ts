import { Router } from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailSender';
import * as dotenv from 'dotenv';
import { validatePassword } from "../utils/passwordValidator";
import mongoose from "mongoose";
dotenv.config();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const router = Router();
const key = process.env.JWT_KEY;
if (!key) {
    throw new Error('JWT_KEY is not set');
}
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';

const encodeQueryParams = (params: { [key: string]: string }) => {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};

const logStatus = (res: any, status: number, message: string) => {
    console.log(`HTTP Response: ${status}, Message: ${message}`);
    res.status(status).json({ message });
};

const logRedirect = (req: any, res: any, errorCode: string, message: string, header: string) => {
    const params = encodeQueryParams({
        errorCode,
        message,
        header
    });
    console.log(`Redirected from: ${frontendUrl}${req.originalUrl} , to ${frontendUrl}/fallback?${params}`);
    res.redirect(`${frontendUrl}/fallback?${params}`);
}

const sendActivationEmail = async (user: mongoose.Document) => {
    const activationToken = jwt.sign({ email: (user as IUser).email }, key, { expiresIn: '1d' });
    (user as IUser).activationToken = activationToken;
    await (user as IUser).save();

    const activationLink = `${process.env.API_URL}/auth/activate/${activationToken}`;
    await sendEmail((user as IUser).email, 'Account Activation', `Click the following link to activate your account: ${activationLink}`);
};

// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (username.length < 1) {
        return logStatus(res, 400, 'You need to enter a username.');
    }

    if (!emailRegex.test(email)) {
        return logStatus(res, 400, 'Invalid email address.');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return logStatus(res, 409, 'Email address already registered.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return logStatus(res, 409, 'Username already exists.');
    }

    const { valid, message } = validatePassword(password);
    if (!valid) {
        return logStatus(res, 400, message);
    }

    try {
        const activationToken = jwt.sign({ email }, key, { expiresIn: '1d' });
        const user = new User({
            username,
            email,
            password,
            isActive: false,
            activationToken
        });
        await user.save();

        try {
            await sendActivationEmail(user);
            return logStatus(res, 201, 'Registration successful. Check your email to activate your account.');
        } catch (error) {
            await User.findByIdAndDelete(user._id);
            return logRedirect(req, res, '500', 'Error sending activation email. Please try again.', 'Error');
        }
    } catch (error: any) {
        return logRedirect(req, res, '500', 'Error registering user.', 'Error');
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return logStatus(res, 401, 'Invalid email or password.');
        }

        if (!user.isActive) {
            return logStatus(res, 403, 'Account is not activated. Please check your emails for the activation link.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return logStatus(res, 401, 'Invalid email or password.');
        }

        const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
        return res.status(201).json({ token , message: `Successfully logged in.` });
    } catch (error) {
        return logStatus(res, 500, 'Server error.');
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
            return logRedirect(req, res, '400', 'Invalid token.', 'Error');
        }
        if (user.isActive) {
            return logRedirect(req, res, '409', 'Account already active.', 'Error');
        }

        user.isActive = true;
        user.activationToken = '';
        try {
            await user.save({ validateBeforeSave: true });
        } catch (error: any) {
            return logRedirect(req, res, '500', 'Internal server error.', 'Error');
        }

        return logRedirect(req, res, '201', 'Account activated successfully.', 'Success');
    } catch (error: any) {
        let params;
        if (error.name === 'TokenExpiredError') {
            const decoded = jwt.decode(token) as { email: string };
            const user = await User.findOne({ email: decoded.email });
            if (user) {
                try {
                    await sendActivationEmail(user);
                    return logRedirect(req, res, '400', 'Token has expired. A new activation link has been sent to your email.', 'Error');
                } catch (sendError) {
                    return logRedirect(req, res, '500', 'Error resending activation email. Please try again.', 'Error');
                }
            }
        } else if (error.name === 'JsonWebTokenError') {
            return logRedirect(req, res, '400', 'Invalid web token.', 'Error');
        } else {
            return logRedirect(req, res, '500', 'Internal server error.', 'Error');
        }
    }
});

export default router;
