import mongoose from 'mongoose';
import BSSESchema from "../schemas/bsse.schema.js"

const BSSEModel = mongoose.model('BSSE', BSSESchema);

export default BSSEModel; 
