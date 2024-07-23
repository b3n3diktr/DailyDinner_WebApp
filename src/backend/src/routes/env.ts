import express from 'express';
const router = express.Router();

router.get('/env', (req, res) => {
    res.json({ apiUrl: process.env.API_URL });
});

export default router;
