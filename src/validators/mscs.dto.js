import Joi from 'joi';

const MSCSSchemaValidator = Joi.object({
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

const createMSCSValidator = Joi.object({
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

const updateMSCSValidator = Joi.object({
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
    MSCSSchemaValidator,
    createMSCSValidator,
    updateMSCSValidator,
};
