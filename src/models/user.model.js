"use strict";
const { model, Schema, Types } = require("mongoose");
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
module.exports = model(DOCUMENT_NAME, userSchema);
