"use strict";
const { model, Schema, Types } = require("mongoose");
const DOCUMENT_NAME = "printing_service";
const COLLECTION_NAME = "printing_services";
const printingServiceSchema = new Schema(
  {
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
module.exports = model(DOCUMENT_NAME, printingServiceSchema);
