import AlbumModel from "../models/gallery.model.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createAlbumValidator, updateAlbumValidator } from "../validators/gallery.dto.js";

// Calculate __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to remove files
const removeFile = async (filePath) => {
    if (filePath) {
        const fullPath = path.join(__dirname, '../uploads/', filePath);
        try {
            if (fs.existsSync(fullPath)) {
                await fs.promises.unlink(fullPath);
            }
        } catch (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
        }
    }
};

// Get all albums
export const getAllAlbums = async (req, res) => {
    try {
        const albums = await AlbumModel.find();
        res.status(200).json(albums);
    } catch (error) {
        console.error('Failed to fetch albums:', error);
        res.status(500).json({ error: 'Failed to fetch albums' });
    }
};

// Create a new album
export const createAlbum = async (req, res) => {
    const { error } = createAlbumValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name } = req.body;
    const coverPhoto = req.files && req.files.coverPhoto ? req.files.coverPhoto[0].path : '';
    const images = req.files && req.files.images ? req.files.images.map(file => file.path) : [];

    try {
        if (!coverPhoto) {
            return res.status(400).json({ error: 'Cover photo is required' });
        }

        const newAlbum = new AlbumModel({
            name,
            coverPhoto,
            images,
        });

        await newAlbum.save();
        res.status(201).json({
            message: 'Album created successfully',
            album: newAlbum,
        });
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ error: 'Failed to create album' });
    }
};

// Update an album (name, coverPhoto, and/or images can be appended/updated)
export const updateAlbum = async (req, res) => {
    const { error } = updateAlbumValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name } = req.body;
    const coverPhoto = req.files && req.files.coverPhoto ? req.files.coverPhoto[0].path : '';
    const images = req.files && req.files.images ? req.files.images.map(file => file.path) : [];

    try {
        const album = await AlbumModel.findById(req.params.id);
        if (!album) return res.status(404).json({ error: 'Album not found' });

        // Remove old cover photo if a new one is uploaded
        if (coverPhoto && album.coverPhoto) {
            await removeFile(album.coverPhoto);
        }

        // If new images are uploaded, append them to the existing ones
        const updatedImages = images.length > 0 ? [...album.images, ...images] : album.images;

        // Update the album with new or existing data
        const updatedAlbum = await AlbumModel.findByIdAndUpdate(
            req.params.id,
            {
                name: name || album.name,
                coverPhoto: coverPhoto || album.coverPhoto,
                images: updatedImages,
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Album updated successfully',
            album: {
                name: updatedAlbum.name,
                coverPhoto: updatedAlbum.coverPhoto,
                images: updatedAlbum.images,
            },
        });
    } catch (error) {
        console.error('Error during album update:', error);
        res.status(500).json({ error: 'Failed to update album due to server error' });
    }
};

// Delete an album (entire document and associated files)
export const deleteAlbum = async (req, res) => {
    try {
        const deletedAlbum = await AlbumModel.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) return res.status(404).json({ error: 'Album not found' });

        // Remove the cover photo and images from the file system
        if (deletedAlbum.coverPhoto) {
            await removeFile(deletedAlbum.coverPhoto);
        }
        if (deletedAlbum.images && deletedAlbum.images.length > 0) {
            await Promise.all(deletedAlbum.images.map(image => removeFile(image)));
        }

        res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ error: 'Failed to delete album' });
    }
};
