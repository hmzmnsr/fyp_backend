import mongoose from 'mongoose';
import MSCSSchema from "../schemas/mscs.schema.js";

const MSCSModel = mongoose.model('MSCS', MSCSSchema);

export default MSCSModel;
