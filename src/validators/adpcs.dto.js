import Joi from 'joi';

const ADPCSSchemaValidator = Joi.object({
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

const createADPCSValidator = Joi.object({
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

const updateADPCSValidator = Joi.object({
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
    ADPCSSchemaValidator,
    createADPCSValidator,
    updateADPCSValidator,
};
