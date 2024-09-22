import Joi from 'joi';

const facultySchemaValidator = Joi.object({
    name: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    position: Joi.string().required().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge').default('Lecturer'),
    areaOfInterest: Joi.string().required().trim(),
    email: Joi.string().required().trim().email(),
    about: Joi.string().required().trim(),
});

const createFacultyValidator = Joi.object({
    name: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    position: Joi.string().required().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge').default('Lecturer'),
    areaOfInterest: Joi.string().required().trim(),
    email: Joi.string().required().trim().email(),
    about: Joi.string().required().trim(),
});

const updateFacultyValidator = Joi.object({
    name: Joi.string().optional().trim(),
    qualification: Joi.string().optional().trim(),
    position: Joi.string().optional().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge'),
    areaOfInterest: Joi.string().optional().trim(),
    email: Joi.string().optional().trim().email(),
    about: Joi.string().optional().trim(),
}).options({ allowUnknown: true });

export {
    facultySchemaValidator,
    createFacultyValidator,
    updateFacultyValidator,
};
