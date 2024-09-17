import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
    documentName: {
        type: String,
        required: true,
        trim: true,
    },
    attachment: {
        type: String, // This can store a URL, file path, or other metadata reference
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

export default downloadSchema;
