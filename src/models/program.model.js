import mongoose from "mongoose";
import ProgramSchema from "../schemas/program.schema.js"

const ProgramModel = mongoose.model('Program', ProgramSchema);

export default ProgramModel;
