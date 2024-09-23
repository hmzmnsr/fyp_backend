import Joi from 'joi';

// Schema validator for the BSCS roadmap
const BSCSSchemaValidator = Joi.object({
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

// Validator for creating a new BSCS roadmap
const createBSCSValidator = Joi.object({
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

// Validator for updating an existing BSCS roadmap
const updateBSCSValidator = Joi.object({
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
    BSCSSchemaValidator,
    createBSCSValidator,
    updateBSCSValidator,
};
