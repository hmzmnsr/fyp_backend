import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import DownloadModel from "../models/download.model.js";
import { createDownloadValidator, updateDownloadValidator } from "../validators/download.dto.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const removeFile = async (filePath) => {
    const fullPath = path.join(__dirname, '../uploads/', filePath);
    try {
        if (fs.existsSync(fullPath)) {
            await fs.promises.unlink(fullPath);
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

        const fileName = path.basename(req.file.filename);
        const cleanFileName = fileName.replace(/^\d+_/, '');

        const newDownload = new DownloadModel({
            documentName: req.body.documentName,
            attachment: cleanFileName,
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
        const cleanFileName = fileName.replace(/^\d+_/, '');

        if (req.file && download.attachment) {
            await removeFile(download.attachment);
        }

        const updatedDownload = await DownloadModel.findByIdAndUpdate(
            req.params.id,
            {
                documentName: req.body.documentName,
                attachment: cleanFileName,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Download updated successfully', data: updatedDownload });
    } catch (error) {
        console.error('Error in updateDownload:', error);
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
