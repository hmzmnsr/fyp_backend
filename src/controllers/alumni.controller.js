import AlumniModel from '../models/alumni.model.js';
import { AlumniSchemaValidator, createAlumniValidator, updateAlumniValidator } from '../validators/alumni.dto.js';

// Get all alumni
export const getAllAlumni = async (req, res) => {
    try {
        const alumni = await AlumniModel.find();
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch all alumni' });
    }
};

// Validate the full schema
export const validateSchema = (req, res) => {
    const { error } = AlumniSchemaValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    res.status(200).json({ message: 'Schema validation successful!' });
};

// Create a new faculty member
export const createAlumni = async (req, res) => {
    console.log(req.body);
    const { error } = createAlumniValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const newAlumni = new AlumniModel(req.body);
        await newAlumni.save();
        res.status(201).json(newAlumni);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create alumni' });
    }
};

// Update a faculty member
export const updateAlumni = async (req, res) => {
    const { error } = updateAlumniValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const updatedAlumni = await AlumniModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAlumni) return res.status(404).json({ error: 'Alumni not found' });
        res.status(200).json(updatedAlumni);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update alumni' });
    }
};

// Delete a alumni
export const deleteAlumni = async (req, res) => {
    try {
      const deletedAlumni = await AlumniModel.findByIdAndDelete(req.params.id);
      if (!deletedAlumni) {
        return res.status(404).json({ error: 'Alumni not found' });
      }
      res.status(200).json({ id: deletedAlumni._id, message: 'Alumni deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete alumni' });
    }
  };
