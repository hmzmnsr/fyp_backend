import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createBSCS, getAllBSCS, getBSCSById, updateBSCS, deleteBSCS } from '../controllers/bscs.controller.js';

const router = express.Router();

router.post('/', authMiddleware , createBSCS);
router.get('/', getAllBSCS);
router.get('/:id', getBSCSById);
router.put('/:id', authMiddleware , updateBSCS);
router.delete('/:id', authMiddleware , deleteBSCS);

export { router as bscsRouter };
