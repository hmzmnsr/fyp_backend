import Joi from 'joi';

const UserSchemaValidator = Joi.object({
  _id: Joi.any().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isActive: Joi.boolean().optional().default(true),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const createUserBodyValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isActive: Joi.boolean().optional().default(true), 
});

const loginSchemaValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updatePasswordValidator = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
}).options({ allowUnknown: true });

const updateUserProfileValidator = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
}).options({ allowUnknown: true });

export {
  UserSchemaValidator,
  createUserBodyValidator,
  loginSchemaValidator,
  updatePasswordValidator,
  updateUserProfileValidator,
};
