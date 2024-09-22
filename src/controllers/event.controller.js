import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import EventModel from '../models/event.model.js';
import {  eventSchemaValidator, createEventValidator, updateEventValidator } from '../validators/event.dto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const removeFile = async (fileName) => {
    const filePath = path.join(__dirname, '../uploads/', fileName);
    try {
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        } else {
        }
    } catch (err) {
        console.error(`Error occurred while deleting file: ${fileName}`, err);
        throw new Error('File deletion error');
    }
};

// Get all faculty members
export const getAllEvent = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch faculty members' });
    }
};

// Validate the full schema
export const validateSchema = (req, res) => {
    const { error } = eventSchemaValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    res.status(200).json({ message: 'Schema validation successful!' });
};

// Create a new faculty member
export const createEvent = async (req, res) => {
    const { error } = createEventValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const imageFileName = req.file ? req.file.filename : null;

    try {
        const newEvent = new EventModel({ ...req.body, image: imageFileName });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
};

// Update a faculty member
export const updateEvent = async (req, res) => {
    const { error } = updateEventValidator.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const event = await EventModel.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        const newImageFileName = req.file ? req.file.filename : event.image;
        if (req.file && event.image) {
            await removeFile(event.image);
        }

        const updatedEvent = await EventModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, image: newImageFileName },
            { new: true }
        );

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (deletedEvent.image) {
            try {
                await removeFile(deletedEvent.image);
            } catch (err) {
                console.error('Failed to remove the image file:', err);
                return res.status(500).json({ error: 'Failed to delete the associated image file' });
            }
        }

        res.status(200).json({ id: deletedEvent._id, message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};