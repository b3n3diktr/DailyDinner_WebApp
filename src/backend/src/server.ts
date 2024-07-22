import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import envRoutes from './routes/env';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
if(!MONGO_URI) {
    throw new Error('MongoDB URI is required.');
}

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/env', envRoutes);

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});