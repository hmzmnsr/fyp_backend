import express from 'express';
import { getAllAlbums, createAlbum, updateAlbum, deleteAlbum } from "../controllers/gallery.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";
const router = express.Router();

// Routes for handling albums
router.get('/', getAllAlbums);

router.post( '/', authMiddleware, upload.fields([ { name: 'coverPhoto', maxCount: 1 }, { name: 'images', maxCount: 20 }]), createAlbum );

// Route for updating an album
router.put( '/:id', authMiddleware, upload.fields([{ name: 'coverPhoto', maxCount: 1 }, { name: 'images', maxCount: 20 } ]), updateAlbum );

// Route for deleting an album
router.delete('/:id', authMiddleware, deleteAlbum);

export { router as albumRouter };
