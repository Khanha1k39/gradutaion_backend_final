const mongoose = require("mongoose");
const { Schema } = mongoose;

const printRequestSchema = new Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["processing", "completed", "error"],
    default: "processing",
  },
});

const PrintRequest = mongoose.model("PrintRequest", printRequestSchema);

module.exports = PrintRequest;
