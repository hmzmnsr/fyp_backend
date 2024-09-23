import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";
import {
    createDownload,
    updateDownload,
    getAllDownloads,
    getDownloadById,
    deleteDownload
} from '../controllers/download.controller.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('attachment'), createDownload);
router.put('/:id', authMiddleware,  upload.single('attachment'), updateDownload);
router.get('/', getAllDownloads);
router.get('/:id', getDownloadById);
router.delete('/:id', authMiddleware, deleteDownload);

export { router as downloadRouter };
