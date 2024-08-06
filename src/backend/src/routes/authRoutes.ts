import { Router } from 'express';
import { authService } from '../core/auth/authService';
import logging from '../config/logging';
import { server } from "../config/config";
import {verifySessionID } from "../core/auth/tokenGenerator";

const backendUrl = `http://${server.SERVER_HOSTNAME}:${server.SERVER_PORT}/api/auth`;
const frontendUrl = 'http://192.168.178.156';
const router = Router();
const service = new authService(backendUrl);

const encodeQueryParams = (params: { [key: string]: string }) => {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};

// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await service.registerUser(username, email, password);
        return res.status(201).json({ message: 'Registration successful. Check your email to activate your account.' }).end();
    } catch (error: any) {
        logging.error(`${error}`);
        return res.status(400).json({ message: error.message }).end();
    }
});



// Activate User
router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const user = await service.activateUser(token);
        const params = encodeQueryParams({
            errorCode: '200',
            message: 'Account activated successfully.',
            header: 'Success'
        });
        return res.redirect(`${frontendUrl}/fallback?${params}`);
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            await service.resendActivationEmail(token)
            const params = encodeQueryParams({
                errorCode: '400',
                message: 'Activate Token Expired, creating a new one.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        } else if (error.name === 'JsonWebTokenError') {
            const params = encodeQueryParams({
                errorCode: '400',
                message: 'Invalid web token.',
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
        } else {
            const params = encodeQueryParams({
                errorCode: '400',
                message: `Error: ${error.message}`,
                header: 'Error'
            });
            return res.redirect(`${frontendUrl}/fallback?${params}`);
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
        return res.status(201).json({ token, message: 'Successfully logged in.', userID: userId }).end();
    } catch (error: any) {
        logging.error(`${error}`);
        return res.status(400).json({ message: error.message }).end();
    }
});



// Validate sessionID
router.post('/validate', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' }).end();
    }

    try {
        const uuid = verifySessionID(token).uuid;
        const user = await service.validateSession(uuid);
        return res.status(201).json({ message: `Successfully validated: ${token}`, username: user.username, email: user.email, accountCreated: user.created }).end();
    } catch (error: any) {
        logging.error(`${error}`);
        return res.status(401).json({ message: 'Token validation failed.' }).end();
    }
});


// Change Password
router.post('/changepassword', async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
        await service.changePassword(resetToken, newPassword);
        return res.status(201).json({ message: 'Successfully changed password. You can now login.' }).end();
    } catch (error: any) {
        logging.error(`${error}`);
        return res.status(400).json({ message: error.message }).end();
    }
});


// Reset Password
router.get('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const resetToken = await service.resetPassword(token);
        return res.redirect(`${frontendUrl}/reset-password?resetToken=${resetToken}`);
    } catch (error: any) {
        logging.error(`${error}`);
        const params = encodeQueryParams({
            errorCode: '400',
            message: `Error: ${error.message}`,
            header: 'Error'
        });
        return res.redirect(`${frontendUrl}/fallback?${params}`);
    }
});



// Forgot Password
router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    try {
        await service.forgotPassword(email);
        return res.status(201).json({ message: 'Reset token was sent successfully.' }).end();
    } catch (error: any) {
        logging.error(`${error}`);
        return res.status(400).json({ message: error.message }).end();
    }
});

export default router;

