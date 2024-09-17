import multer from 'multer';
import path from 'path';

// Define storage location and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use the 'uploads' directory directly in the project root
        cb(null, path.join(__dirname, '../uploads/')); // '../uploads/' resolves to the 'uploads' folder at the project root
    },
    filename: function (req, file, cb) {
        // Append timestamp to the filename to avoid name clashes
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Create multer instance with storage configuration
const upload = multer({ storage });

export default upload;
