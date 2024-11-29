import mongoose from 'mongoose';

const { Schema } = mongoose;

const FacultySchema = new Schema({
    name: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    position: { 
        type: String, 
        enum: ['Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge'], 
        default: 'Lecturer' 
    },
    areaOfInterest: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    about: { type: String, required: true, trim: true },
    status: {type: String, required: true, trim: true },
}, {
    timestamps: true,
});

export default FacultySchema; 
