import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';
import createUploader from '../../middleware/multerHandler';

const router = express.Router();

router.post('/upload-profile-picture', async (req: Request, res: Response) => {
    const { userId } = req.body;
    createUploader("profile", "profile.jpg", userId);
    res.status(200).json({ message: 'Profile picture uploaded successfully' });
});

router.get('/profile-picture/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const filePath = path.join(__dirname, '..', 'uploads', userId, 'profile.jpg');

    if (await fs.pathExists(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ message: 'Profile picture not found' });
    }
});

export default router;
