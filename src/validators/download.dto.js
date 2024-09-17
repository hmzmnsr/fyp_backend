import Joi from 'joi';

// Validator for the download schema
const downloadSchemaValidator = Joi.object({
  documentName: Joi.string().required().trim(),
  attachment: Joi.string().required().trim(), // Adjust based on your actual validation needs
});

// Validator for creating a new download
const createDownloadValidator = Joi.object({
  documentName: Joi.string().required().trim(),
  attachment: Joi.string().required().trim(), // Adjust based on your actual validation needs
});

// Validator for updating an existing download
const updateDownloadValidator = Joi.object({
  documentName: Joi.string().optional().trim(),
  attachment: Joi.string().optional().trim(), // Adjust based on your actual validation needs
}).options({ allowUnknown: true });

export {
  downloadSchemaValidator,
  createDownloadValidator,
  updateDownloadValidator,
};
