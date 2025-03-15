const { createTokenPair, verifyJWT } = require("../auth/auth.util");
const KeyStokenService = require("./keyToken.service");

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const RoleShop = {
  SHOP: "SHOP",
  USER: "USER",
};
const crypto = require("crypto");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { findByEmail } = require("./user.service");
const { getInfoData } = require("../utils");
const {
  createUser,
  findUserByEmail,
} = require("../models/repository/user.repo");
class AccessService {
  static signUp = async ({ name, email, password }) => {
    email = email.toLowerCase();
    console.log("reqboy", name, email, password);
    const hodelUser = await findUserByEmail(email);
    if (hodelUser) {
      throw new BadRequestError("User already register");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      name,
      email,
      password: passwordHash,
    });
    if (newUser) {
      console.log("newuser", newUser);
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      console.log({ privateKey, publicKey });

      const tokens = await createTokenPair(
        { userId: newUser._id, email },
        publicKey,
        privateKey
      );
      await KeyStokenService.createKey({
        userId: newUser._id,
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken,
      });
      return {
        user: newUser,
        tokens,
      };
    }
    return {
      metadata: null,
    };
  };
  static login = async ({ name, email, password }) => {
    const foundUser = await findUserByEmail(email);
    console.log("foundUser", foundUser);

    if (!foundUser) {
      throw new BadRequestError("User is not registered");
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      throw new AuthFailureError("Password is not match");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    const tokens = await createTokenPair(
      { userId: foundUser._id, email },
      publicKey,
      privateKey
    );
    await KeyStokenService.createKey({
      userId: foundUser._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });
    return {
      user: getInfoData({
        fields: ["_id", "email", "name"],
        object: foundUser,
      }),
      tokens,
    };
  };

  static logout = async ({ keyStore }) => {
    const delKey = await KeyStokenService.removeKeyById(keyStore._id);
    console.log("del key", delKey);
    return delKey;
  };
  static handleRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const foundToken = await KeyStokenService.findByRefreshTokenUsed(
      refreshToken
    );
    if (foundToken) {
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );
      console.log({ userId, email });
      await KeyStokenService.deleteKeyByUserId(userId);
      throw new BadRequestError("Something went wrong! Please login");
    }
    const holdToken = await KeyStokenService.findByRefreshToken(refreshToken);
    if (!holdToken) {
      throw new AuthFailureError("Shop is not registered");
    }
    const { userId, email } = await verifyJWT(
      refreshToken,
      holdToken.privateKey
    );
    console.log("--2", { userId, email });

    const foundShop = findByEmail({ email });

    if (!foundShop) {
      throw new AuthFailureError("Shop is not registered");
    }
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      holdToken.publicKey,
      holdToken.privateKey
    );
    await holdToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      user: { email, userId },
      tokens,
    };
  };
}

module.exports = AccessService;
