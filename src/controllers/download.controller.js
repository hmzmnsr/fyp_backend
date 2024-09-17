// src/controllers/download.controller.js
import DownloadModel from "../models/download.model.js";
import { createDownloadValidator, updateDownloadValidator } from "../validators/download.dto.js";

// Create a new download
const createDownload = async (req, res) => {
    try {
        // Validate request data
        const { error } = createDownloadValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newDownload = new DownloadModel({
            documentName: req.body.documentName,
            attachment: req.file ? req.file.path : null, // Save the file path
        });

        await newDownload.save();
        res.status(201).json({ message: 'Download created successfully', data: newDownload });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all downloads
const getAllDownloads = async (req, res) => {
    try {
        const downloads = await DownloadModel.find();
        res.status(200).json(downloads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single download by ID
const getDownloadById = async (req, res) => {
    try {
        const download = await DownloadModel.findById(req.params.id);
        if (!download) {
            return res.status(404).json({ message: 'Download not found' });
        }
        res.status(200).json(download);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing download
const updateDownload = async (req, res) => {
    try {
        // Validate request data
        const { error } = updateDownloadValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedDownload = await DownloadModel.findByIdAndUpdate(
            req.params.id,
            {
                documentName: req.body.documentName,
                attachment: req.file ? req.file.path : req.body.attachment, // Preserve existing file if not updating
            },
            { new: true, runValidators: true }
        );

        if (!updatedDownload) {
            return res.status(404).json({ message: 'Download not found' });
        }

        res.status(200).json({ message: 'Download updated successfully', data: updatedDownload });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a download
const deleteDownload = async (req, res) => {
    try {
        const deletedDownload = await DownloadModel.findByIdAndDelete(req.params.id);

        if (!deletedDownload) {
            return res.status(404).json({ message: 'Download not found' });
        }

        res.status(200).json({ message: 'Download deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createDownload,
    getAllDownloads,
    getDownloadById,
    updateDownload,
    deleteDownload,
};
