import express from 'express';
import { getAllEvent, createEvent, updateEvent, deleteEvent } from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get('/', getAllEvent);
router.post('/', authMiddleware, upload.single('image'), createEvent);
router.put('/:id', authMiddleware, upload.single('image'), updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export { router as eventRouter };
 