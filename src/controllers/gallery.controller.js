import AlbumModel from "../models/gallery.model.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createAlbumValidator, updateAlbumValidator } from "../validators/gallery.dto.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const coverPhoto = req.files && req.files.coverPhoto ? req.files.coverPhoto[0].filename : '';
    const images = req.files && req.files.images ? req.files.images.map(file => file.filename) : [];

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

// Update an album
export const updateAlbum = async (req, res) => {
    const { error } = updateAlbumValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name } = req.body;
    const coverPhoto = req.files && req.files.coverPhoto ? req.files.coverPhoto[0].filename : '';
    const images = req.files && req.files.images ? req.files.images.map(file => file.filename) : [];

    try {
        const album = await AlbumModel.findById(req.params.id);
        if (!album) return res.status(404).json({ error: 'Album not found' });

        if (coverPhoto && album.coverPhoto) {
            await removeFile(album.coverPhoto);
        }

        const updatedImages = images.length > 0 ? [...album.images, ...images] : album.images;

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

// Delete an album
export const deleteAlbum = async (req, res) => {
    try {
        const deletedAlbum = await AlbumModel.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) return res.status(404).json({ error: 'Album not found' });

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
