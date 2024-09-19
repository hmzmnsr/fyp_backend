import mongoose from 'mongoose';
import FacultySchema from '../schemas/faculty.schema.js';

const FacultyModel = mongoose.model('Faculty', FacultySchema);

export default FacultyModel;
 