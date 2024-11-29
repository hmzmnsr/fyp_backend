import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import FacultyModel from '../models/faculty.model.js';
import { facultySchemaValidator, createFacultyValidator, updateFacultyValidator } from '../validators/faculty.dto.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const removeFile = async (fileName) => {
    const filePath = path.join(__dirname, '../uploads/', fileName);
    try {
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    } catch (err) {
        console.error(`Error occurred while deleting file: ${fileName}`, err);
        throw new Error('File deletion error');
    }
};

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

    const imageFileName = req.file ? req.file.filename : null;

    try {
        const newFaculty = new FacultyModel({ ...req.body, image: imageFileName });
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

    try {
        const faculty = await FacultyModel.findById(req.params.id);
        if (!faculty) return res.status(404).json({ error: 'Faculty member not found' });

        const newImageFileName = req.file ? req.file.filename : faculty.image;
        
        if (req.file && faculty.image) {
            try {
                await removeFile(faculty.image);
            } catch (err) {
                console.error('Failed to remove the previous image file:', err);
                return res.status(500).json({ error: 'Failed to delete the associated image file' });
            }
        }

        const updatedFaculty = await FacultyModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, image: newImageFileName },
            { new: true }
        );

        res.status(200).json(updatedFaculty);
    } catch (error) {
        console.error('Error updating faculty:', error);
        res.status(500).json({ error: 'Failed to update faculty member' });
    }
};

// Delete a faculty member
export const deleteFaculty = async (req, res) => {
    try {
        const deletedFaculty = await FacultyModel.findByIdAndDelete(req.params.id);
        if (!deletedFaculty) {
            return res.status(404).json({ error: 'Faculty member not found' });
        }

        if (deletedFaculty.image) {
            await removeFile(deletedFaculty.image);
        }

        res.status(200).json({ id: deletedFaculty._id, message: 'Faculty member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete faculty member' });
    }
}; 
