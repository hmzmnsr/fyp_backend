import PHDCSModel from '../models/phdcs.model.js';
import { createPHDCSValidator, updatePHDCSValidator } from "../validators/phdcs.dto.js";

export const createPHDCS = async (req, res) => {
    const { error } = createPHDCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newPHDCS = new PHDCSModel(req.body);
        await newPHDCS.save();
        res.status(201).json(newPHDCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllPHDCS = async (req, res) => {
    try {
        const phdcsRoadmaps = await PHDCSModel.find();
        res.status(200).json(phdcsRoadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPHDCSById = async (req, res) => {
    try {
        const phdcs = await PHDCSModel.findById(req.params.id);
        if (!phdcs) return res.status(404).json({ message: 'PHDCS roadmap not found' });
        res.status(200).json(phdcs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePHDCS = async (req, res) => {
    const { error } = updatePHDCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedPHDCS = await PHDCSModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPHDCS) return res.status(404).json({ message: 'PHDCS roadmap not found' });
        res.status(200).json(updatedPHDCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePHDCS = async (req, res) => {
    try {
        const deletedPHDCS = await PHDCSModel.findByIdAndDelete(req.params.id);
        if (!deletedPHDCS) return res.status(404).json({ message: 'PHDCS roadmap not found' });
        res.status(200).json({ message: 'PHDCS roadmap deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateCourseInPHDCS = async (req, res) => {

    const { courseId } = req.params;
    const { courseCode, subjectName, creditHours } = req.body;

    if (!courseCode || !subjectName || !creditHours) {
        return res.status(400).json({ message: 'All fields (courseCode, subjectName, creditHours) are required.' });
    }

    try {
        const phdcs = await PHDCSModel.findByIdAndUpdate(
            req.params.id,
            { $set: { "courses.$[elem]": { courseCode, subjectName, creditHours } } },
            {
                new: true,
                arrayFilters: [{ "elem._id": courseId }],
                runValidators: true,
            }
        );

        if (!phdcs) return res.status(404).json({ message: 'PHDCS roadmap not found' });

        res.status(200).json(phdcs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCourseInPHDCS = async (req, res) => {
    const { courseId } = req.params;

    try {
        const phdcs = await PHDCSModel.findById(req.params.id);
        if (!phdcs) return res.status(404).json({ message: 'PHDCS roadmap not found' });

        const updatedCourses = phdcs.courses.filter(course => course._id.toString() !== courseId);
        if (updatedCourses.length === phdcs.courses.length) {
            return res.status(404).json({ message: 'Course not found' });
        }

        phdcs.courses = updatedCourses;
        await phdcs.save();

        res.status(200).json(phdcs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
