import mongoose from 'mongoose';
import ADPCSSchema from "../schemas/adpcs.schema.js";

const ADPCSModel = mongoose.model('ADPCS', ADPCSSchema);

export default ADPCSModel;
