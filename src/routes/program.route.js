import express from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import { createProgram, getPrograms, getProgramById, updateProgram, deleteProgram } from '../controllers/program.controller.js';
import { createProgramSchema } from '../validators/program.dto.js';

const router = express.Router();

// Routes
router.post('/', validate(createProgramSchema), createProgram);
router.get('/', getPrograms);
router.get('/:id', getProgramById);
router.patch('/:id', validate(createProgramSchema), updateProgram);
router.delete('/:id', deleteProgram);

export { router as programRouter };
