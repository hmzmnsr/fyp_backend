import Joi from 'joi';

const PHDCSSchemaValidator = Joi.object({
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

const createPHDCSValidator = Joi.object({
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

const updatePHDCSValidator = Joi.object({
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
    PHDCSSchemaValidator,
    createPHDCSValidator,
    updatePHDCSValidator,
};
