import BSCSModel from '../models/bscs.model.js';
import { createBSCSValidator, updateBSCSValidator } from "../validators/bscs.dto.js";


export const createBSCS = async (req, res) => {
    const { error } = createBSCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newBSCS = new BSCSModel(req.body);
        await newBSCS.save();
        res.status(201).json(newBSCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getAllBSCS = async (req, res) => {
    try {
        const bscsRoadmaps = await BSCSModel.find();
        res.status(200).json(bscsRoadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getBSCSById = async (req, res) => {
    try {
        const bscs = await BSCSModel.findById(req.params.id);
        if (!bscs) return res.status(404).json({ message: 'BSCS roadmap not found' });
        res.status(200).json(bscs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateBSCS = async (req, res) => {
    const { error } = updateBSCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedBSCS = await BSCSModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBSCS) return res.status(404).json({ message: 'BSCS roadmap not found' });
        res.status(200).json(updatedBSCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteBSCS = async (req, res) => {
    try {
        const deletedBSCS = await BSCSModel.findByIdAndDelete(req.params.id);
        if (!deletedBSCS) return res.status(404).json({ message: 'BSCS roadmap not found' });
        res.status(200).json({ message: 'BSCS roadmap deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateCourseInBSCS = async (req, res) => {
    console.log(req.body);

    const { courseId } = req.params;

    const { courseCode, subjectName, creditHours } = req.body;

    if (!courseCode || !subjectName || !creditHours) {
        return res.status(400).json({ message: 'All fields (courseCode, subjectName, creditHours) are required.' });
    }

    try {
        const bscs = await BSCSModel.findByIdAndUpdate(
            req.params.id,
            { $set: { "courses.$[elem]": { courseCode, subjectName, creditHours } } },
            {
                new: true,
                arrayFilters: [{ "elem._id": courseId }],
                runValidators: true,
            }
        );

        if (!bscs) return res.status(404).json({ message: 'BSCS roadmap not found' });

        res.status(200).json(bscs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const deleteCourseInBSCS = async (req, res) => {
    const { courseId } = req.params;

    try {
        const bscs = await BSCSModel.findById(req.params.id);
        if (!bscs) return res.status(404).json({ message: 'BSCS roadmap not found' });

        const updatedCourses = bscs.courses.filter(course => course._id.toString() !== courseId);
        if (updatedCourses.length === bscs.courses.length) {
            return res.status(404).json({ message: 'Course not found' });
        }

        bscs.courses = updatedCourses;
        await bscs.save();

        res.status(200).json(bscs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
