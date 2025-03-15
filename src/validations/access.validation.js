const Joi = require("joi");
const { BadRequestError } = require("../core/error.response");
const signup = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    name: Joi.required(),
    password: Joi.string().trim().min(8).required(),
  });
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
  } catch (error) {
    throw new BadRequestError(error?.message);
  }
  next();
};
const AcessValidation = {
  signup,
};

module.exports = AcessValidation;
