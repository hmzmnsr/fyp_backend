import Joi from 'joi';

// Schema-level validator for Album Schema
const albumSchemaValidator = Joi.object({
    name: Joi.string().required().trim(),
    coverPhoto: Joi.string().required().trim(),
    images: Joi.array().items(Joi.string()).default([]),
});

// Validator for creating a new album
const createAlbumValidator = Joi.object({
    name: Joi.string().required().trim(),
    coverPhoto: Joi.string().required().trim(),
    images: Joi.array().items(Joi.string()).default([]),
});

// Validator for updating an album
const updateAlbumValidator = Joi.object({
    name: Joi.string().optional().trim(),
    coverPhoto: Joi.string().optional().trim(),
    images: Joi.array().items(Joi.string()).default([]),
}).options({ allowUnknown: true });

export {
    albumSchemaValidator,
    createAlbumValidator,
    updateAlbumValidator,
};
