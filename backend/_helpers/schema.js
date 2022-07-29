const { validateRequest } = require("../middlewares/validation");

const Joi = require("joi");

const registerSchema = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    //username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().min(10).max(10).required(),
    role: Joi.string().default("Admin"),
    email_otp: Joi.string(),
    mobile_otp: Joi.string(),
  });
  validateRequest(req, next, schema);
};

const loginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

const updateSchema = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    //username: Joi.string().empty(""),
    password: Joi.string().min(6).empty(""),
    email: Joi.string().empty(""),
    mobile: Joi.string().min(10).max(10).empty(""),
    email_otp: Joi.string(),
    mobile_otp: Joi.string(),
  });
  validateRequest(req, next, schema);
};

module.exports = { loginSchema, registerSchema, updateSchema };
