import mongoose from "mongoose";
import PHDCSSchema from "../schemas/phdcs.schema.js";

const PHDCSModel = mongoose.model('PHDCS', PHDCSSchema);

export default PHDCSModel;