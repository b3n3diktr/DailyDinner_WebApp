// backend/src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/dailydinner');

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
