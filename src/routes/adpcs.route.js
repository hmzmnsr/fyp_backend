import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createADPCS, getAllADPCS, getADPCSById, updateADPCS, deleteADPCS, updateCourseInADPCS, deleteCourseInADPCS } from '../controllers/adpcs.controller.js';

const router = express.Router();

router.post('/', authMiddleware , createADPCS);
router.get('/', getAllADPCS);
router.get('/:id', getADPCSById);
router.put('/:id', authMiddleware , updateADPCS);
router.delete('/:id', authMiddleware , deleteADPCS);
router.put('/:id/course/:courseId', authMiddleware, updateCourseInADPCS);
router.delete('/:id/course/:courseId', authMiddleware, deleteCourseInADPCS);

export { router as adpcsRouter };
