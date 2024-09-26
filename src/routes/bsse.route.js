import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createBSSE, getAllBSSE, getBSSEById, updateBSSE, deleteBSSE, updateCourseInBSSE, deleteCourseInBSSE } from "../controllers/bsse.controller.js";

const router = express.Router();

router.post('/', authMiddleware , createBSSE);
router.get('/', getAllBSSE);
router.get('/:id', getBSSEById);
router.put('/:id', authMiddleware , updateBSSE);
router.delete('/:id', authMiddleware , deleteBSSE);
router.put('/:id/course/:courseId', authMiddleware, updateCourseInBSSE);
router.delete('/:id/course/:courseId', authMiddleware, deleteCourseInBSSE);

export { router as bsseRouter };
