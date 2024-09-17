import ProgramModel from '../models/program.model.js';
import { createProgramSchema } from '../validators/program.dto.js';

// Create a new program
export const createProgram = async (req, res) => {
    try {
        const { error } = createProgramSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const program = new ProgramModel(req.body);
        await program.save();
        return res.status(201).json({ message: 'Program created successfully', program });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Fetch all programs
export const getPrograms = async (req, res) => {
    try {
        const programs = await ProgramModel.find();
        return res.status(200).json(programs);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Fetch a single program by ID
export const getProgramById = async (req, res) => {
    try {
        const program = await ProgramModel.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        return res.status(200).json(program);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update a program by ID
export const updateProgram = async (req, res) => {
    try {
        const { error } = createProgramSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedProgram = await ProgramModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }

        return res.status(200).json({ message: 'Program updated successfully', program: updatedProgram });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete a program by ID
export const deleteProgram = async (req, res) => {
    try {
        const deletedProgram = await ProgramModel.findByIdAndDelete(req.params.id);
        if (!deletedProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }

        return res.status(200).json({ message: 'Program deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
