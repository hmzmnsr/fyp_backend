import Joi from "joi";

/**
 * @param {Joi.ObjectSchema} schema
 * @returns {Function}
 */
const validate = (schema) => {
  return (req, res, next) => {
    // console.log(req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};

export { validate };
