import { Router } from 'express';
import logging from '../../config/logging';
import { SERVER_HOSTNAME, SERVER_PORT } from "../../config/config";
import {verifySessionID } from "../../core/auth/utils/tokenGenerator";
import {registerService} from "../../core/auth/registerService";
import {activateUserService} from "../../core/auth/activateUserService";
import {changePasswordService} from "../../core/auth/changePasswordService";
import {forgotPasswordService} from "../../core/auth/forgotPasswordService";
import {loginService} from "../../core/auth/loginService";
import {resendActivationEmailService} from "../../core/auth/resendActivationEmailService";
import {resetPasswordService} from "../../core/auth/resetPasswordService";
import {validateSessionIdService} from "../../core/auth/validateSessionIdService";

const backendUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/auth`;
const frontendUrl = 'https://daily-dinner.com';
const router = Router();

const activateUser = new activateUserService();
const changePassword = new changePasswordService();
const forgotPassword = new forgotPasswordService(backendUrl);
const login = new loginService();
const register = new registerService(backendUrl);
const resendActivationEmail = new resendActivationEmailService(backendUrl);
const resetPassword = new resetPasswordService();
const validateSessionID = new validateSessionIdService();

const encodeQueryParams = (params: { [key: string]: string }) => {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};

// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await register.registerUser(username, email, password);
        res.status(201).json({ message: 'Registration successful. Check your email to activate your account.' }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(500).json({ message: error.message }).end();
        return;
    }
});

// Activate User
router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    try {
        await activateUser.activateUser(token);
        const params = encodeQueryParams({
            errorCode: '200',
            message: 'Account activated successfully.',
            header: 'Success'
        });
        res.redirect(`${frontendUrl}/fallback?${params}`);
        return;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            await resendActivationEmail.resendActivationEmail(token)
            const params = encodeQueryParams({
                errorCode: '401',
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
                errorCode: '500',
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
        const { token, userId } = await login.loginUser(email, password, remember);
        res.cookie('sessionID', token, {
            httpOnly: false,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 * 14,
            path: "/",
        });
        res.status(200).json({ token, message: 'Successfully logged in.', userID: userId }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(401).json({ message: 'Invalid email or password.' }).end();
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
        const user = await validateSessionID.validateSession(uuid);
        res.status(200).json({ message: `Successfully validated: ${token}`, uuid: user.uuid, userId: user._id ,username: user.username, email: user.email, accountCreated: user.created }).end();
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
        await changePassword.changePassword(resetToken, newPassword);
        res.status(200).json({ message: 'Successfully changed password. You can now login.' }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(401).json({ message: 'Invalid or expired reset token.' }).end();
        return;
    }
});

// Reset Password
router.get('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const resetToken = await resetPassword.resetPassword(token);
        res.redirect(`${frontendUrl}/reset-password?resetToken=${resetToken}`);
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        const params = encodeQueryParams({
            errorCode: '401',
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
        await forgotPassword.forgotPassword(email);
        res.status(200).json({ message: 'Reset token was sent successfully.' }).end();
        return;
    } catch (error: any) {
        logging.error(`${error}`);
        res.status(500).json({ message: error.message }).end();
        return;
    }
});

export default router;
