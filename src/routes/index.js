"use strict";
const express = require("express");
const router = express.Router();
router.use("/access", require("./access"));
router.use("/cart", require("./cart"));

module.exports = router;
