import mongoose from 'mongoose';

const { Schema } = mongoose;

const AlbumSchema = new Schema({
    name: { type: String, required: true, trim: true },
    coverPhoto: { type: String, required: true },
    images: [{ type: String }],
}, {
    timestamps: true,
});

export default AlbumSchema;
