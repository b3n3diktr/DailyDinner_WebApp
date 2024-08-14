import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';
import multer from 'multer';

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
        logging.info(`Failed to setup directory and default profile picture for user: ${uuid}`, error);
    }
};

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uuid = req.body.userId;
        if (!uuid) {
            return cb(new Error("User ID is required for profile picture upload"), '');
        }

        const uploadPath = path.join(__dirname, '../../../uploads/users', uuid);

        await fs.ensureDir(uploadPath);
        cb(null, uploadPath);
        logging.info(`AUTH[uploadService] - USERID: [${uuid}]`);
    },
    filename: (req, file, cb) => {
        cb(null, 'profile.jpg');
    }
});

const upload = multer({ storage });

router.post('/upload-profile-picture', upload.single('profile'), async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Profile picture uploaded successfully' });
});

router.get('/profile-picture/:uuid', (req: Request, res: Response) => {
    const {uuid} = req.params;
    const filePath = path.join(__dirname, '../../../uploads/users', uuid, 'profile.jpg');

    if (fs.pathExistsSync(filePath)) {
        res.header('Access-Control-Allow-Origin', 'http://localhost');
        res.header('Access-Control-Allow-Credentials', 'true');
        logging.info(`AUTH[getProfilPictureService] - USERID: [${uuid}]`);
        return res.sendFile(filePath);
    } else {
        return res.status(404).json({ message: 'Profile picture not found' });
    }
});


export default router;
