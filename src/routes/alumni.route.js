import express from 'express';
import { getAllAlumni, createAlumni, updateAlumni, deleteAlumni } from '../controllers/alumni.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', getAllAlumni);
router.post('/', authMiddleware , createAlumni);
router.put('/:id', authMiddleware, updateAlumni);
router.delete('/:id', authMiddleware, deleteAlumni);

export { router as alumniRouter };
