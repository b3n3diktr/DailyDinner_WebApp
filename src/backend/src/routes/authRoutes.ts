import { Router } from 'express';
import { authService } from '../core/auth/authService';
import logging from '../config/logging';
import { server } from "../config/config";
import {verifySessionID } from "../core/auth/tokenGenerator";

const backendUrl = `http://${server.SERVER_HOSTNAME}:${server.SERVER_PORT}/api/auth`;
const frontendUrl = 'http://100.124.248.156:80/';
const router = Router();
const service = new authService(backendUrl);

const encodeQueryParams = (params: { [key: string]: string }) => {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};

// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await service.registerUser(username, email, password);
        res.status(201).json({ message: 'Registration successful. Check your email to activate your account.' }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(400).json({ message: error.message }).end();
        return;
    }
});



// Activate User
router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    try {
        await service.activateUser(token);
        const params = encodeQueryParams({
            errorCode: '200',
            message: 'Account activated successfully.',
            header: 'Success'
        });
        res.redirect(`${frontendUrl}/fallback?${params}`);
        return;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            await service.resendActivationEmail(token)
            const params = encodeQueryParams({
                errorCode: '400',
                message: 'Activate Token Expired, creating a new one.',
                header: 'Error'
            });
            res.redirect(`${frontendUrl}/fallback?${params}`);
            return;
        } else if (error.name === 'JsonWebTokenError') {
            const params = encodeQueryParams({
                errorCode: '400',
                message: 'Invalid web token.',
                header: 'Error'
            });
            res.redirect(`${frontendUrl}/fallback?${params}`);
            return;
        } else {
            const params = encodeQueryParams({
                errorCode: '400',
                message: `Error: ${error.message}`,
                header: 'Error'
            });
            res.redirect(`${frontendUrl}/fallback?${params}`);
            return;
        }
    }
});



// Login User
router.post('/login', async (req, res) => {
    const { email, password, remember } = req.body;
    try {
        const { token, userId } = await service.loginUser(email, password, remember);
        res.cookie('sessionID', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 * 14,
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(201).json({ token, message: 'Successfully logged in.', userID: userId }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(400).json({ message: error.message }).end();
        return;
    }
});



// Validate sessionID
router.post('/validate', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided.' }).end();
        return;
    }

    try {
        const uuid = verifySessionID(token).uuid;
        const user = await service.validateSession(uuid);
        res.status(201).json({ message: `Successfully validated: ${token}`, username: user.username, email: user.email, accountCreated: user.created }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(401).json({ message: 'Token validation failed.' }).end();
        return;
    }
});


// Change Password
router.post('/changepassword', async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
        await service.changePassword(resetToken, newPassword);
        res.status(201).json({ message: 'Successfully changed password. You can now login.' }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(400).json({ message: error.message }).end();
        return;
    }
});


// Reset Password
router.get('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const resetToken = await service.resetPassword(token);
        res.redirect(`${frontendUrl}/reset-password?resetToken=${resetToken}`);
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        const params = encodeQueryParams({
            errorCode: '400',
            message: `Error: ${error.message}`,
            header: 'Error'
        });
        res.redirect(`${frontendUrl}/fallback?${params}`);
        return;
    }
});



// Forgot Password
router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    try {
        await service.forgotPassword(email);
        res.status(201).json({ message: 'Reset token was sent successfully.' }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(400).json({ message: error.message }).end();
        return;
    }
});

export default router;
