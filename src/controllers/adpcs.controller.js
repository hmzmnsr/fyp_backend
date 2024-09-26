import ADPCSModel from '../models/adpcs.model.js';
import { createADPCSValidator, updateADPCSValidator } from "../validators/adpcs.dto.js";

export const createADPCS = async (req, res) => {
    const { error } = createADPCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newADPCS = new ADPCSModel(req.body);
        await newADPCS.save();
        res.status(201).json(newADPCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllADPCS = async (req, res) => {
    try {
        const adpcsRoadmaps = await ADPCSModel.find();
        res.status(200).json(adpcsRoadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getADPCSById = async (req, res) => {
    try {
        const adpcs = await ADPCSModel.findById(req.params.id);
        if (!adpcs) return res.status(404).json({ message: 'ADPCS roadmap not found' });
        res.status(200).json(adpcs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateADPCS = async (req, res) => {
    const { error } = updateADPCSValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedADPCS = await ADPCSModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedADPCS) return res.status(404).json({ message: 'ADPCS roadmap not found' });
        res.status(200).json(updatedADPCS);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteADPCS = async (req, res) => {
    try {
        const deletedADPCS = await ADPCSModel.findByIdAndDelete(req.params.id);
        if (!deletedADPCS) return res.status(404).json({ message: 'ADPCS roadmap not found' });
        res.status(200).json({ message: 'ADPCS roadmap deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateCourseInADPCS = async (req, res) => {
    console.log(req.body);

    const { courseId } = req.params;

    const { courseCode, subjectName, creditHours } = req.body;

    if (!courseCode || !subjectName || !creditHours) {
        return res.status(400).json({ message: 'All fields (courseCode, subjectName, creditHours) are required.' });
    }

    try {
        const adpcs = await ADPCSModel.findByIdAndUpdate(
            req.params.id,
            { $set: { "courses.$[elem]": { courseCode, subjectName, creditHours } } },
            {
                new: true,
                arrayFilters: [{ "elem._id": courseId }],
                runValidators: true,
            }
        );

        if (!adpcs) return res.status(404).json({ message: 'ADPCS roadmap not found' });

        res.status(200).json(adpcs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCourseInADPCS = async (req, res) => {
    const { courseId } = req.params;

    try {
        const adpcs = await ADPCSModel.findById(req.params.id);
        if (!adpcs) return res.status(404).json({ message: 'ADPCS roadmap not found' });

        const updatedCourses = adpcs.courses.filter(course => course._id.toString() !== courseId);
        if (updatedCourses.length === adpcs.courses.length) {
            return res.status(404).json({ message: 'Course not found' });
        }

        adpcs.courses = updatedCourses;
        await adpcs.save();

        res.status(200).json(adpcs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
