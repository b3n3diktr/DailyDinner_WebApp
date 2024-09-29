import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';
import multer from 'multer';
import sharp from 'sharp';

const router = express.Router();

const DEFAULT_PROFILE_PICTURE_PATH = path.join(__dirname, '../../../uploads/default/profile.jpg');

export const setupUserDirectoryAndProfilePicture = async (uuid: string) => {
    try {
        const userDir = path.join(__dirname, '../../../uploads/users', uuid);
        await fs.ensureDir(userDir);
        const userProfilePicturePath = path.join(userDir, 'profile.jpg');
        await fs.copyFile(DEFAULT_PROFILE_PICTURE_PATH, userProfilePicturePath);

        logging.info(`Directory created and default profile picture set for user: ${uuid}`);
    } catch (error) {
        logging.error(`Failed to setup directory and default profile picture for user: ${uuid}`, error);
    }
};

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post('/upload-profile-picture', upload.single('profile'), async (req: Request, res: Response) => {
    try {
        const uuid = req.body.uuid;
        const allowedMimeTypes = ['image/jpeg', 'image/png'];

        if (!uuid || !req.file) {
            return res.status(400).json({ message: 'User ID and file are required' });
        }

        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            return res.status(415).json({ message: 'Invalid file type. Only JPEG and PNG files are allowed.' });
        }

        const uploadPath = path.join(__dirname, '../../../uploads/users', uuid);
        const profilePicturePath = path.join(uploadPath, 'profile.jpg');

        await fs.ensureDir(uploadPath);

        await sharp(req.file.buffer)
            .resize(512, 512)
            .jpeg({ quality: 90 })
            .toFile(profilePicturePath);

        logging.info(`Profile picture uploaded and resized successfully for user: ${uuid}`);
        res.status(200).json({ message: 'Profile picture uploaded and resized successfully' });
    } catch (error) {
        logging.error('Error processing profile picture:', error);
        res.status(500).json({ message: 'Failed to process profile picture' });
    }
});

router.get('/profile-picture/:uuid', (req: Request, res: Response) => {
    const { uuid } = req.params;
    const filePath = path.join(__dirname, '../../../uploads/users', uuid, 'profile.jpg');

    if (fs.pathExistsSync(filePath)) {
        res.header('Access-Control-Allow-Origin', 'http://localhost');
        res.header('Access-Control-Allow-Credentials', 'true');
        logging.info(`AUTH[getProfilePictureService] - USERID: [${uuid}]`);
        return res.sendFile(filePath);
    } else {
        return res.status(404).json({ message: 'Profile picture not found' });
    }
});

export default router;
