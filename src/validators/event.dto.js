import Joi from 'joi';

const eventSchemaValidator = Joi.object({
    name: Joi.string().required().trim(),
    venue: Joi.string().required().trim(),
    date: Joi.date().required(),
});

const createEventValidator = Joi.object({
    name: Joi.string().required().trim(),
    venue: Joi.string().required().trim(),
    about: Joi.string().required().trim(),
    date: Joi.date().required(),
});

const updateEventValidator = Joi.object({
    name: Joi.string().optional().trim(),
    venue: Joi.string().optional().trim(),
    about: Joi.string().required().trim(),
    date: Joi.date().optional(),
}).options({ allowUnknown: true });

export {
    eventSchemaValidator,
    createEventValidator,
    updateEventValidator,
};
