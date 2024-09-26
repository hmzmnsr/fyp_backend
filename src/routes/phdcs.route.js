import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createPHDCS, getAllPHDCS, getPHDCSById, updatePHDCS, deletePHDCS, updateCourseInPHDCS, deleteCourseInPHDCS } from '../controllers/phdcs.controller.js';

const router = express.Router();

router.post('/', authMiddleware , createPHDCS);
router.get('/', getAllPHDCS);
router.get('/:id', getPHDCSById);
router.put('/:id', authMiddleware , updatePHDCS);
router.delete('/:id', authMiddleware , deletePHDCS);
router.put('/:id/course/:courseId', authMiddleware, updateCourseInPHDCS);
router.delete('/:id/course/:courseId', authMiddleware, deleteCourseInPHDCS);

export { router as phdcsRouter };
