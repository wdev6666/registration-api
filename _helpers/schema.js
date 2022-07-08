const { validateRequest } = require('../middlewares/validation');

const Joi = require('joi');

const registerSchema = (req, res, next) => { 
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
};

const loginSchema = (req, res, next) =>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

module.exports = { loginSchema, registerSchema };