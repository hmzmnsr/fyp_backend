import Joi from 'joi';

// Schema-level validator for Faculty Schema (without image field)
const facultySchemaValidator = Joi.object({
    name: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    position: Joi.string().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge').default('Lecturer'),
});

// Validator for creating a new faculty (without image field)
const createFacultyValidator = Joi.object({
    name: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    position: Joi.string().optional().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge').default('Lecturer'),
});

// Validator for updating a faculty (without image field)
const updateFacultyValidator = Joi.object({
    name: Joi.string().optional().trim(),
    department: Joi.string().optional().trim(),
    qualification: Joi.string().optional().trim(),
    position: Joi.string().optional().valid('Dean', 'HOD', 'Professor', 'Assistant Professor', 'Lecturer', 'Incharge'),
}).options({ allowUnknown: true });

export {
    facultySchemaValidator,
    createFacultyValidator,
    updateFacultyValidator,
};
