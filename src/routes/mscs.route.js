import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createMSCS, getAllMSCS, getMSCSById, updateMSCS, deleteMSCS, updateCourseInMSCS, deleteCourseInMSCS } from '../controllers/mscs.controller.js';

const router = express.Router();

router.post('/', authMiddleware , createMSCS);
router.get('/', getAllMSCS);
router.get('/:id', getMSCSById);
router.put('/:id', authMiddleware , updateMSCS);
router.delete('/:id', authMiddleware , deleteMSCS);
router.put('/:id/course/:courseId', authMiddleware, updateCourseInMSCS);
router.delete('/:id/course/:courseId', authMiddleware, deleteCourseInMSCS);

export { router as mscsRouter };
