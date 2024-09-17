import Joi from 'joi';

export const createProgramSchema = Joi.object({
    programName: Joi.string().required().messages({
        'string.base': 'Program name must be a string.',
        'any.required': 'Program name is required.',
    }),
    roadmap: Joi.array().items(
        Joi.object({
            term: Joi.string().valid('fall', 'spring').required().messages({
                'string.base': 'Term must be a string.',
                'any.required': 'Term is required.',
                'any.only': 'Term must be either "fall" or "spring".',
            }),
            year: Joi.number().integer().min(2023).required().messages({
                'number.base': 'Year must be a number.',
                'number.min': 'Year must be 2023 or later.',
                'any.required': 'Year is required.',
            }),
            semesters: Joi.array().items(
                Joi.object({
                    semester: Joi.number().integer().min(1).max(8).required().messages({
                        'number.base': 'Semester must be a number.',
                        'number.min': 'Semester must be at least 1.',
                        'number.max': 'Semester must be no greater than 8.',
                        'any.required': 'Semester is required.',
                    }),
                    courses: Joi.array().items(
                        Joi.object({
                            courseCode: Joi.string().required().messages({
                                'string.base': 'Course code must be a string.',
                                'any.required': 'Course code is required.',
                            }),
                            subjectName: Joi.string().required().messages({
                                'string.base': 'Subject name must be a string.',
                                'any.required': 'Subject name is required.',
                            }),
                            creditHours: Joi.number().integer().min(1).max(6).required().messages({
                                'number.base': 'Credit hours must be a number.',
                                'number.min': 'Credit hours must be at least 1.',
                                'number.max': 'Credit hours must not exceed 6.',
                                'any.required': 'Credit hours are required.',
                            }),
                        })
                    ).required().messages({
                        'array.base': 'Courses must be an array.',
                        'any.required': 'At least one course is required.',
                    }),
                })
            ).required().messages({
                'array.base': 'Semesters must be an array.',
                'any.required': 'At least one semester is required.',
            }),
        })
    ).required().messages({
        'array.base': 'Roadmap must be an array.',
        'any.required': 'Roadmap is required.',
    }),
});
