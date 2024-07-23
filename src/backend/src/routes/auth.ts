import { Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const router = Router();
const key = process.env.JWT_KEY;
if (!key) {
    throw new Error('JWT_KEY is not set');
}

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email address.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('Email address already registered.');
    }

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send('User registered successfully.');
    } catch (error) {
        res.status(400).send('Error registering user.');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
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

export default router;