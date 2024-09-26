import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createBSCS, getAllBSCS, getBSCSById, updateBSCS, deleteBSCS, updateCourseInBSCS, deleteCourseInBSCS } from '../controllers/bscs.controller.js';

const router = express.Router();

router.post('/', authMiddleware , createBSCS);
router.get('/', getAllBSCS);
router.get('/:id', getBSCSById);
router.put('/:id', authMiddleware , updateBSCS);
router.delete('/:id', authMiddleware , deleteBSCS);
router.put('/:id/course/:courseId', authMiddleware, updateCourseInBSCS);
router.delete('/:id/course/:courseId', authMiddleware, deleteCourseInBSCS);

export { router as bscsRouter };
