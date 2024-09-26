import Joi from 'joi';

const BSSESchemaValidator = Joi.object({
    term: Joi.string().required().trim(),
    year: Joi.number().required(),
    semester: Joi.number().required(),
    courses: Joi.array().items(
        Joi.object({
            courseCode: Joi.string().required().trim(),
            subjectName: Joi.string().required().trim(),
            creditHours: Joi.number().required(),
        })
    ).required()
});

const createBSSEValidator = Joi.object({
    term: Joi.string().required().trim(),
    year: Joi.number().required(),
    semester: Joi.number().required(),
    courses: Joi.array().items(
        Joi.object({
            courseCode: Joi.string().required().trim(),
            subjectName: Joi.string().required().trim(),
            creditHours: Joi.number().required(),
        })
    ).required()
});

const updateBSSEValidator = Joi.object({
    term: Joi.string().required().trim(),
    year: Joi.number().required(),
    semester: Joi.number().required(),
    courses: Joi.array().items(
        Joi.object({
            courseCode: Joi.string().required().trim(),
            subjectName: Joi.string().required().trim(),
            creditHours: Joi.number().required(),
        })
    ).required()
}).options({ allowUnknown: true });

export {
    BSSESchemaValidator,
    createBSSEValidator,
    updateBSSEValidator,
};
