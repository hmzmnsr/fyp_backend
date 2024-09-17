import mongoose from 'mongoose';
import AlbumSchema from '../schemas/album.schema.js';

const AlbumModel = mongoose.model('Album', AlbumSchema);

export default AlbumModel;
