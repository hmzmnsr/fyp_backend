import mongoose from "mongoose";
import downloadSchema from "../schemas/download.schema.js";

const DownloadModel = mongoose.model('Download', downloadSchema);

export default DownloadModel;
