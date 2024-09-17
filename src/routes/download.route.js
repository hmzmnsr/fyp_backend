import express from 'express';
import upload from "../utils/multer.js";
import {
    createDownload,
    updateDownload,
    getAllDownloads,
    getDownloadById,
    deleteDownload
} from '../controllers/download.controller.js';

const router = express.Router();

router.post('/', upload.single('attachment'), createDownload);
router.put('/:id', upload.single('attachment'), updateDownload);
router.get('/', getAllDownloads);
router.get('/:id', getDownloadById);
router.delete('/:id', deleteDownload);

export { router as downloadRouter };
