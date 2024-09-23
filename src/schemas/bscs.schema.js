import mongoose from 'mongoose';

const { Schema } = mongoose;

const BSCSSchema = new Schema({
    term: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    semester: { type: Number, required: true },
    courses: [
        {
            courseCode: { type: String, required: true, trim: true },
            subjectName: { type: String, required: true, trim: true },
            creditHours: { type: Number, required: true }
        }
    ]
}, {
    timestamps: true,
});

export default BSCSSchema;
