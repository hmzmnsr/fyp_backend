import BSCSModel from '../models/bscs.model.js';
import { createBSCSValidator, updateBSCSValidator } from "../validators/bscs.dto.js";

// Create a new BSCS roadmap
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

// Get all BSCS roadmaps
export const getAllBSCS = async (req, res) => {
    try {
        const bscsRoadmaps = await BSCSModel.find();
        res.status(200).json(bscsRoadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single BSCS roadmap by ID
export const getBSCSById = async (req, res) => {
    try {
        const bscs = await BSCSModel.findById(req.params.id);
        if (!bscs) return res.status(404).json({ message: 'BSCS roadmap not found' });
        res.status(200).json(bscs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a BSCS roadmap by ID
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

// Delete a BSCS roadmap by ID
export const deleteBSCS = async (req, res) => {
    try {
        const deletedBSCS = await BSCSModel.findByIdAndDelete(req.params.id);
        if (!deletedBSCS) return res.status(404).json({ message: 'BSCS roadmap not found' });
        res.status(200).json({ message: 'BSCS roadmap deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
