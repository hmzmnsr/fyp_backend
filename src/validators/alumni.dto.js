import Joi from 'joi';

const AlumniSchemaValidator = Joi.object({
    class: Joi.number().required(),
    batch: Joi.string().required().trim(),
    totalStudents: Joi.number().required(),
});

const createAlumniValidator = Joi.object({
    class: Joi.number().required(),
    batch: Joi.string().required().trim(),
    totalStudents: Joi.number().required(),
});

const updateAlumniValidator = Joi.object({
    class: Joi.number().required(),
    batch: Joi.string().required().trim(),
    totalStudents: Joi.number().required(),
}).options({ allowUnknown: true });

export {
    AlumniSchemaValidator,
    createAlumniValidator,
    updateAlumniValidator,
};
