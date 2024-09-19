import express from 'express';
import { getAllFaculty, createFaculty, updateFaculty, deleteFaculty } from '../controllers/faculty.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get('/', getAllFaculty);

// POST: Create a new faculty member with image upload (auth + multer)
router.post('/', authMiddleware, upload.single('image'), createFaculty);

router.put('/:id', authMiddleware, upload.single('image'), updateFaculty);

router.delete('/:id', authMiddleware, deleteFaculty);

export { router as facultyRouter };
