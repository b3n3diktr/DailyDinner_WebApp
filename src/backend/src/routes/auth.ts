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
const frontendUrl = process.env.frontendUrl || 'http://localhost:4000/register';

//Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
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
            // Rollback: Delete the user if email sending fails
            await User.findByIdAndDelete(user._id);
            return res.status(501).send('Error sending activation email. Please try again.');
        }
    } catch (error:any ) {
        res.status(502).send(`Error registering user. Error: ${error.message}`);
    }
});

//Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(411).send('Invalid email or password.');
        }

        if (!user.isActive) {
            return res.status(412).send('Account is not activated. Please check your email for activation link.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(413).send('Invalid email or password.');
        }

        const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
        res.json({ token });
    } catch (error: any) {
        res.status(5003).send(`Couldn't login: Internal server error. Error: ${error.message}`);
    }
});

//Activate User
router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, key) as { email: string };
        const email = decoded.email;
        const user = await User.findOne({email});

        if (!user) {
            res.redirect(frontendUrl);
            return res.redirect(frontendUrl);
        }
        if (user.isActive) {
            return res.redirect(frontendUrl);
        }

        user.isActive = true;
        user.activationToken = '';
        try {
            await user.save({ validateBeforeSave: false });
        } catch (error: any) {
            res.redirect(frontendUrl);
            res.status(504).send(`Internal server error. Error: ${error.message}`);
        }

        res.status(202).send('Account activated successfully');
        res.redirect(frontendUrl);
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            res.status(505).send(`Token has expired. Error: ${error.message}`);
        } else if (error.name === 'JsonWebTokenError') {
            res.status(506).send(`Invalid token. Error: ${error.message}`);
        } else {
            res.status(507).send(`Internal server error. Error: ${error.message}`);
        }
    }
});

export default router;
