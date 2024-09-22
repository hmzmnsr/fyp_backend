import path from 'path'; // Import path module to handle file paths
import fs from 'fs'; // Import fs module for file system operations
import DownloadModel from "../models/download.model.js";
import { createDownloadValidator, updateDownloadValidator } from "../validators/download.dto.js";

// Helper function to remove a file
const removeFile = async (filePath) => {
    const fullPath = path.join(__dirname, '../uploads/', filePath); // Define the full path to the file
    try {
        if (fs.existsSync(fullPath)) {
            await fs.promises.unlink(fullPath); // Remove the file
        }
    } catch (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
    }
};

// Create a new download
const createDownload = async (req, res) => {
    try {
        const { error } = createDownloadValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Attachment is required' });
        }

        const fileName = path.basename(req.file.filename); // Get the filename without the path
        const cleanFileName = fileName.replace(/^\d+_/, ''); // Remove leading numbers and underscore

        const newDownload = new DownloadModel({
            documentName: req.body.documentName,
            attachment: cleanFileName, // Store the cleaned file name
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
        const { error } = updateDownloadValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const download = await DownloadModel.findById(req.params.id);
        if (!download) {
            return res.status(404).json({ message: 'Download not found' });
        }

        const fileName = req.file ? path.basename(req.file.filename) : download.attachment;
        const cleanFileName = fileName.replace(/^\d+_/, ''); // Clean the file name again if necessary

        // Remove the old file if a new file is uploaded
        if (req.file && download.attachment) {
            await removeFile(download.attachment);
        }

        const updatedDownload = await DownloadModel.findByIdAndUpdate(
            req.params.id,
            {
                documentName: req.body.documentName,
                attachment: cleanFileName, // Store the cleaned file name
            },
            { new: true, runValidators: true }
        );

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

        // Remove the attachment file associated with the deleted download
        if (deletedDownload.attachment) {
            await removeFile(deletedDownload.attachment);
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
