import { Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailSender';
import * as dotenv from 'dotenv';
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

// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if(username.length < 1) {
        return res.status(434).send('You need to enter an username.');
    }

    if (!emailRegex.test(email)) {
        return res.status(431).send('Invalid email address.');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(432).send('Email address already registered.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(433).send('Username already exists.');
    }

    if(password.length <= 8) {
        return res.status(435).send('Password must be at least 8 characters.');
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

        // Send activation email
        const activationLink = `${process.env.API_URL}/auth/activate/${activationToken}`;
        try {
            await sendEmail(email, 'Account Activation', `Click the following link to activate your account: ${activationLink}`);
            res.status(201).json({ message: 'Registration successful. Check your email to activate your account.' });
        } catch (error) {
            console.error('Error sending email:', error);
            await User.findByIdAndDelete(user._id);
            const params = encodeQueryParams({
                errorCode: '501',
                message: 'Error sending activation email. Please try again.',
                header: 'Error'
            });
            res.redirect(`${frontendUrl}/fallback?${params}`);
        }
    } catch (error: any) {
        const params = encodeQueryParams({
            errorCode: '502',
            message: 'Error registering user.',
            header: 'Error'
        });
        res.redirect(`${frontendUrl}/fallback?${params}`);
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
                errorCode: '412',
                message: 'Invalid token.',
                header: 'Error'
            });
            res.redirect(`${frontendUrl}/fallback?${params}`);
            return;
        }
        if(user.isActive){
            const params = encodeQueryParams({
                errorCode: '413',
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
                errorCode: '504',
                message: 'Internal server error.',
                header: 'Error'
            });
            res.redirect(`${frontendUrl}/fallback?${params}`);
            return;
        }

        const params = encodeQueryParams({
            errorCode: '202',
            message: 'Account activated successfully.',
            header: 'Success'
        });
        res.redirect(`${frontendUrl}/fallback?${params}`);
    } catch (error: any) {
        let params;
        if (error.name === 'TokenExpiredError') {
            params = encodeQueryParams({
                errorCode: '505',
                message: 'Token has expired.',
                header: 'Error'
            });
        } else if (error.name === 'JsonWebTokenError') {
            params = encodeQueryParams({
                errorCode: '506',
                message: 'Invalid web token.',
                header: 'Error'
            });
        } else {
            params = encodeQueryParams({
                errorCode: '507',
                message: 'Internal server error.',
                header: 'Error'
            });
        }
        res.redirect(`${frontendUrl}/fallback?${params}`);
    }
});

export default router;
