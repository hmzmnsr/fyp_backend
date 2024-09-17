import AlbumModel from "../models/gallery.model.js";
import { albumSchemaValidator, createAlbumValidator, updateAlbumValidator } from "../validators/gallery.dto.js";

// Get all albums
export const getAllAlbums = async (req, res) => {
    try {
        const albums = await AlbumModel.find();
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch albums' });
    }
};

// Validate the full schema
export const validateSchema = (req, res) => {
    const { error } = albumSchemaValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    res.status(200).json({ message: 'Schema validation successful!' });
};

// Create a new album
// Create a new album
export const createAlbum = async (req, res) => {
    const { error } = createAlbumValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name } = req.body;
    const coverPhoto = req.file ? req.file.path : ''; // Assuming `coverPhoto` is uploaded with `multer`
    const images = req.files.images ? req.files.images.map(file => file.path) : []; // Assuming multiple files for images

    try {
        const newAlbum = new AlbumModel({
            name,
            coverPhoto,
            images,
        });
        await newAlbum.save();
        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create album' });
    }
};

// Update an album
export const updateAlbum = async (req, res) => {
    const { error } = updateAlbumValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name } = req.body;
    const coverPhoto = req.file ? req.file.path : ''; // Update cover photo if a new file is uploaded
    const images = req.files.images ? req.files.images.map(file => file.path) : []; // Update images if new files are uploaded

    try {
        const updatedAlbum = await AlbumModel.findByIdAndUpdate(
            req.params.id,
            { name, coverPhoto, images },
            { new: true }
        );
        if (!updatedAlbum) return res.status(404).json({ error: 'Album not found' });
        res.status(200).json(updatedAlbum);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update album' });
    }
};

// Delete an album
export const deleteAlbum = async (req, res) => {
    try {
        const deletedAlbum = await AlbumModel.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) return res.status(404).json({ error: 'Album not found' });
        res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete album' });
    }
};
