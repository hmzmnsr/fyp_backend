import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
    programName: {
        type: String,
        required: true,
    },
    roadmap: [{
        term: { type: String, required: true },
        year: { type: Number, required: true },
        semesters: [{
            semester: { type: Number, required: true },
            courses: [{
                courseCode: { type: String, required: true },
                subjectName: { type: String, required: true },
                creditHours: { type: Number, required: true },
            }],
        }],
    }],
}, { timestamps: true });

export default ProgramSchema;
