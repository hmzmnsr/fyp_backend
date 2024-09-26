import BSSEModel from '../models/bscs.model.js';
import { createBSSEValidator, updateBSSEValidator } from "../validators/bsse.dto.js";

export const createBSSE = async (req, res) => {
    const { error } = createBSSEValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newBSSE = new BSSEModel(req.body);
        await newBSSE.save();
        res.status(201).json(newBSSE);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllBSSE = async (req, res) => {
    try {
        const bsseRoadmaps = await BSSEModel.find();
        res.status(200).json(bsseRoadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getBSSEById = async (req, res) => {
    try {
        const bsse = await BSSEModel.findById(req.params.id);
        if (!bsse) return res.status(404).json({ message: 'BSSE roadmap not found' });
        res.status(200).json(bsse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateBSSE = async (req, res) => {
    const { error } = updateBSSEValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedBSSE = await BSSEModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBSSE) return res.status(404).json({ message: 'BSSE roadmap not found' });
        res.status(200).json(updatedBSSE);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteBSSE = async (req, res) => {
    try {
        const deletedBSSE = await BSSEModel.findByIdAndDelete(req.params.id);
        if (!deletedBSSE) return res.status(404).json({ message: 'BSSE roadmap not found' });
        res.status(200).json({ message: 'BSSE roadmap deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateCourseInBSSE = async (req, res) => {
    console.log(req.body);
    const { courseId } = req.params;
    const { courseCode, subjectName, creditHours } = req.body;

    if (!courseCode || !subjectName || !creditHours) {
        return res.status(400).json({ message: 'All fields (courseCode, subjectName, creditHours) are required.' });
    }

    try {
        const bsse = await BSSEModel.findByIdAndUpdate(
            req.params.id,
            { $set: { "courses.$[elem]": { courseCode, subjectName, creditHours } } },
            {
                new: true,
                arrayFilters: [{ "elem._id": courseId }],
                runValidators: true,
            }
        );

        if (!bsse) return res.status(404).json({ message: 'BSSE roadmap not found' });

        res.status(200).json(bsse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCourseInBSSE = async (req, res) => {
    const { courseId } = req.params;

    try {
        const bsse = await BSSEModel.findById(req.params.id);
        if (!bsse) return res.status(404).json({ message: 'BSSE roadmap not found' });

        const updatedCourses = bsse.courses.filter(course => course._id.toString() !== courseId);
        if (updatedCourses.length === bsse.courses.length) {
            return res.status(404).json({ message: 'Course not found' });
        }

        bsse.courses = updatedCourses;
        await bsse.save();

        res.status(200).json(bsse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
