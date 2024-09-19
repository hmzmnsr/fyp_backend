import express from 'express';
import { getAllFaculty, createFaculty, updateFaculty, deleteFaculty } from '../controllers/faculty.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

// GET: Fetch all faculty members
router.get('/', getAllFaculty);

// POST: Create a new faculty member with image upload (auth + multer)
router.post('/', authMiddleware, upload.single('image'), createFaculty);

// PUT: Update a faculty member with optional image upload (auth + multer)
router.put('/:id', authMiddleware, upload.single('image'), updateFaculty);

// DELETE: Delete a faculty member (auth)
router.delete('/:id', authMiddleware, deleteFaculty);

export { router as facultyRouter };
