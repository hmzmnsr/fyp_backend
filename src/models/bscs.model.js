import mongoose from 'mongoose';
import BSCSSchema from "../schemas/bscs.schema.js";

const BSCSModel = mongoose.model('BSCS', BSCSSchema);

export default BSCSModel;
