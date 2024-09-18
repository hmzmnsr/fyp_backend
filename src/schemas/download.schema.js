import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
    documentName: {
        type: String,
        required: true,
        trim: true,
    },
    attachment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, 
});

export default downloadSchema;
