import FacultyModel from '../models/faculty.model.js';
import { facultySchemaValidator, createFacultyValidator, updateFacultyValidator } from '../validators/faculty.dto.js';

// Get all faculty members
export const getAllFaculty = async (req, res) => {
    try {
        const faculties = await FacultyModel.find();
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch faculty members' });
    }
};

// Validate the full schema
export const validateSchema = (req, res) => {
    const { error } = facultySchemaValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    res.status(200).json({ message: 'Schema validation successful!' });
};

// Create a new faculty member
export const createFaculty = async (req, res) => {
    const { error } = createFacultyValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Image is now handled by Multer, so get the image path from req.file
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newFaculty = new FacultyModel({ ...req.body, image: imagePath });
        await newFaculty.save();
        res.status(201).json(newFaculty);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create faculty member' });
    }
};

// Update a faculty member
export const updateFaculty = async (req, res) => {
    const { error } = updateFacultyValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Handle the image path if a new image is uploaded
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const updatedFaculty = await FacultyModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, ...(imagePath && { image: imagePath }) },
            { new: true }
        );
        if (!updatedFaculty) return res.status(404).json({ error: 'Faculty member not found' });
        res.status(200).json(updatedFaculty);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update faculty member' });
    }
};

// Delete a faculty member
export const deleteFaculty = async (req, res) => {
    try {
        const deletedFaculty = await FacultyModel.findByIdAndDelete(req.params.id);
        if (!deletedFaculty) return res.status(404).json({ error: 'Faculty member not found' });
        res.status(200).json({ message: 'Faculty member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete faculty member' });
    }
};
