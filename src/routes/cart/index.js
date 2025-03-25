"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler, authentication } = require("../../auth/auth.util");
const AcessValidation = require("../../validations/access.validation");
const { uploadDisk } = require("../../configs/multer.config");
const cartController = require("../../controllers/cart.controller");
const router = express.Router();

// router.use(authentication);
router.post(
  "/addtocart",
  uploadDisk.single("file"),
  asyncHandler(cartController.addPrintingRequestToCart)
);
// router.post(
//   "/user/handleRefreshToken",
//   asyncHandler(accessController.handleRefreshToken)
// );

module.exports = router;
