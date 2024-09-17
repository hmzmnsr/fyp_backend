import DownloadModel from "../models/download.model.js";

const validateDocumentId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const document = await DownloadModel.findById(id);
        if (!document) {
            return res.status(404).json({ message: 'Download not found' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { validateDocumentId };
