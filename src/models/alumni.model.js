import mongoose from 'mongoose';
import AlumniSchema from "../schemas/alumni.schema.js";

const AlumniModel = mongoose.model('Alumni', AlumniSchema);

export default AlumniModel;