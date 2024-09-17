import Joi from 'joi';

// Schema-level validator for Faculty Schema
const facultySchemaValidator = Joi.object({
    name: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    image: Joi.string().required().trim(),
    position: Joi.string().valid('Dean', 'HOD', 'Faculty').default('Faculty'),
});

// Validator for creating a new faculty
const createFacultyValidator = Joi.object({
    name: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    qualification: Joi.string().required().trim(),
    position: Joi.string().optional().valid('Dean', 'HOD', 'Faculty').default('Faculty'),
});

// Validator for updating a faculty
const updateFacultyValidator = Joi.object({
    name: Joi.string().optional().trim(),
    department: Joi.string().optional().trim(),
    qualification: Joi.string().optional().trim(),
    position: Joi.string().optional().valid('Dean', 'HOD', 'Faculty'),
}).options({ allowUnknown: true });

export {
    facultySchemaValidator,
    createFacultyValidator,
    updateFacultyValidator,
};
