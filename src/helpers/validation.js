const joi = require("joi");
const userValidateSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  name: joi.string(),
});
module.exports = { userValidateSchema };
