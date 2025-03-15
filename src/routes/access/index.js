"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler, authentication } = require("../../auth/auth.util");
const AcessValidation = require("../../validations/access.validation");
const router = express.Router();

//signup
router.post("/user/login", asyncHandler(accessController.login));

router.post(
  "/user/signup",
  asyncHandler(AcessValidation.signup),
  asyncHandler(accessController.signUp)
);

//authentication
router.use(authentication);
router.post("/user/logout", asyncHandler(accessController.logout));
router.post(
  "/user/handleRefreshToken",
  asyncHandler(accessController.handleRefreshToken)
);

module.exports = router;
