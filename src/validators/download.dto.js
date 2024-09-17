import Joi from 'joi';

const downloadSchemaValidator = Joi.object({
  documentName: Joi.string().required().trim(),
  attachment: Joi.string().required().trim(),
});

const createDownloadValidator = Joi.object({
    documentName: Joi.string().required().trim(),
  });

const updateDownloadValidator = Joi.object({
    documentName: Joi.string().optional().trim(),
  }).options({ allowUnknown: true });

export {
  downloadSchemaValidator,
  createDownloadValidator,
  updateDownloadValidator,
};
