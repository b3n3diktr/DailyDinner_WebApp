import { Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sendEmail } from '../utils/emailSender';
import * as dotenv from 'dotenv';
dotenv.config();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const router = Router();
const key = process.env.JWT_KEY;
if (!key) {
    throw new Error('JWT_KEY is not set');
}

//Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email address.');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).send('Email address already registered.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Username already exists.');
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
            return res.status(500).send('Error sending activation email. Please try again.');
        }
    } catch (error) {
        res.status(400).send('Error registering user.');
    }
});

//Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        if (!user.isActive) {
            return res.status(400).send('Account is not activated. Please check your email for activation link.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password.');
        }

        const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Server error.');
    }
});


//Activate User
router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    try {
        console.log('Verifying token:', token);
        const decoded = jwt.verify(token, key) as { email: string };
        console.log('Decoded token:', decoded);
        const email = decoded.email;
        console.log('Email:', email);
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ error: 'Invalid token or user not found' });
        }
        console.log('Verifying user:', user);

        if (user.isActive) {
            console.log('Account already activated');
            return res.status(400).json({ error: 'Account already activated' });
        }

        console.log('Updating user document...');
        user.isActive = true;
        user.activationToken = '';
        try {
            await user.save({ validateBeforeSave: false });
            console.log('User document updated successfully');
        } catch (err) {
            console.error('Error updating user document:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json({ message: 'Account activated successfully' });
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            res.status(400).json({ error: 'Token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            res.status(400).json({ error: 'Invalid token' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

export default router;
