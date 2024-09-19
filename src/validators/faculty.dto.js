import Joi from 'joi';

const facultySchemaValidator = Joi.object({
    name: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    position: Joi.string().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge').default('Lecturer'),
});

const createFacultyValidator = Joi.object({
    name: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    position: Joi.string().optional().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge').default('Lecturer'),
});

const updateFacultyValidator = Joi.object({
    name: Joi.string().optional().trim(),
    qualification: Joi.string().optional().trim(),
    position: Joi.string().optional().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge'),
}).options({ allowUnknown: true });

export {
    facultySchemaValidator,
    createFacultyValidator,
    updateFacultyValidator,
};
