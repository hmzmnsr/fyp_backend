import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
    name: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    about: {type:String, required: true, trim:true},
    image: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

export default EventSchema;
