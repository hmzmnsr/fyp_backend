import mongoose from "mongoose";
import EventSchema from "../schemas/event.schema.js"; 

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel; 
 