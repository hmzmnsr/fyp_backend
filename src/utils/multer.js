import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = join(__dirname, '../uploads/');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname.split('.'); // Split by dot to get the extension
        const extension = originalName.pop(); // Get the extension
        const fileName = originalName.join('.'); // Join back the original name without the extension
        cb(null, `${fileName}.${extension}`); // Save without numeric prefix
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 100 } // 100MB file size limit
});

export default upload;
