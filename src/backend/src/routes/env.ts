import express from 'express';
const router = express.Router();

router.get('/env', (req, res) => {
    res.json({ apiUrl: process.env.REACT_APP_API_URL });
});

export default router;
