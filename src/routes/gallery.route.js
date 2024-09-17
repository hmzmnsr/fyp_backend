import express from 'express';
import multer from 'multer';
import { getAllAlbums, createAlbum, updateAlbum, deleteAlbum } from "../controllers/gallery.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', getAllAlbums);
router.post('/', authMiddleware, upload.single('coverPhoto'), upload.array('images'), createAlbum);
router.put('/:id', authMiddleware, upload.single('coverPhoto'), upload.array('images'), updateAlbum);
router.delete('/:id', authMiddleware, deleteAlbum);

export { router as albumRouter };
