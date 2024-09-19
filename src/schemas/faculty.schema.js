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
}, {
    timestamps: true,
});

export default FacultySchema;
