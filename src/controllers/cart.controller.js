"use strict";

const { CreatedResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class CartController {
  addPrintingRequestToCart = async (req, res, next) => {
    console.log("[p]::::", req.body);
    new CreatedResponse({
      message: "Handle refreshtoken successfully",
      //   metadata: await AccessService.handleRefreshToken({
      //     refreshToken: req.refreshToken,
      //     user: req.user,
      //     keyStore: req.keyStore,
      //   }),
    }).send(res);
  };
}
module.exports = new CartController();
