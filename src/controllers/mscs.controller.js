import MSCSModel from '../models/mscs.model.js';
import { createMSCSValidator, updateMSCSValidator } from "../validators/mscs.dto.js";

export const createMSCS = async (req, res) => {
    const { error } = createMSCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newMSCS = new MSCSModel(req.body);
        await newMSCS.save();
        res.status(201).json(newMSCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllMSCS = async (req, res) => {
    try {
        const mscsRoadmaps = await MSCSModel.find();
        res.status(200).json(mscsRoadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMSCSById = async (req, res) => {
    try {
        const mscs = await MSCSModel.findById(req.params.id);
        if (!mscs) return res.status(404).json({ message: 'MSCS roadmap not found' });
        res.status(200).json(mscs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateMSCS = async (req, res) => {
    const { error } = updateMSCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedMSCS = await MSCSModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMSCS) return res.status(404).json({ message: 'MSCS roadmap not found' });
        res.status(200).json(updatedMSCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteMSCS = async (req, res) => {
    try {
        const deletedMSCS = await MSCSModel.findByIdAndDelete(req.params.id);
        if (!deletedMSCS) return res.status(404).json({ message: 'MSCS roadmap not found' });
        res.status(200).json({ message: 'MSCS roadmap deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateCourseInMSCS = async (req, res) => {
    console.log(req.body);

    const { courseId } = req.params;
    const { courseCode, subjectName, creditHours } = req.body;

    if (!courseCode || !subjectName || !creditHours) {
        return res.status(400).json({ message: 'All fields (courseCode, subjectName, creditHours) are required.' });
    }

    try {
        const mscs = await MSCSModel.findByIdAndUpdate(
            req.params.id,
            { $set: { "courses.$[elem]": { courseCode, subjectName, creditHours } } },
            {
                new: true,
                arrayFilters: [{ "elem._id": courseId }],
                runValidators: true,
            }
        );

        if (!mscs) return res.status(404).json({ message: 'MSCS roadmap not found' });

        res.status(200).json(mscs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCourseInMSCS = async (req, res) => {
    const { courseId } = req.params;

    try {
        const mscs = await MSCSModel.findById(req.params.id);
        if (!mscs) return res.status(404).json({ message: 'MSCS roadmap not found' });

        const updatedCourses = mscs.courses.filter(course => course._id.toString() !== courseId);
        if (updatedCourses.length === mscs.courses.length) {
            return res.status(404).json({ message: 'Course not found' });
        }

        mscs.courses = updatedCourses;
        await mscs.save();

        res.status(200).json(mscs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
