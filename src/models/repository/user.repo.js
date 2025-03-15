const { userValidateSchema } = require("../../helpers/validation");
const { convertToObjectIdMongodb } = require("../../utils");
const userModel = require("../user.model");
const RoleShop = {
  SHOP: "SHOP",
  USER: "USER",
};
const createUser = async ({ email, password, name }) => {
  console.log({ email, password, name });
  const { email: emailValidate } = await userValidateSchema.validateAsync({
    email,
    name,
  });
  return await userModel.create({
    email: emailValidate,
    password,
    name,
    roles: [RoleShop.USER],
  });
};
const findUserByEmail = async (email) => {
  return await userModel.findOne({ email }).lean();
};

module.exports = {
  createUser,
  findUserByEmail,
};
