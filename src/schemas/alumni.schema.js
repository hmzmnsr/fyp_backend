import mongoose from 'mongoose';

const { Schema } = mongoose;

const AlumniSchema = new Schema({
    class: { type: Number, required: true, trim: true },
    batch: { type: String, required: true, trim: true },
    totalStudents: { type: Number, required: true, trim: true },
}, {
    timestamps: true,
});

export default AlumniSchema; 
