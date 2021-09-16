const Joi = require('@hapi/joi');

// Register Validation
const registerandUpdationValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required(),
        name: Joi.string().min(4).required(),
        username: Joi.string().min(4).required(),
        country: Joi.string().min(4).required(),
        city: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

// login Validation
const loginValidation =(data) =>{
    const schema = Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

const getandDeleteValidation =(data) =>{
    const schema = Joi.object({
        email: Joi.string().min(4).required().email(),
    });
    return schema.validate(data);
}



module.exports.registerandUpdationValidation= registerandUpdationValidation;
module.exports.loginValidation= loginValidation;
module.exports.getandDeleteValidation= getandDeleteValidation;
