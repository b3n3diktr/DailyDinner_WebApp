import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';

const createUploader = (folderName: string, fileName: string, userId: string) => {
    const storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            const uploadPath = path.join(__dirname, '..', 'uploads', userId, folderName);

            await fs.ensureDir(uploadPath);
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, fileName);
        }
    });

    return multer({ storage });
};

export default createUploader;