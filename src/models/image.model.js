const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  fileFormat: {
    type: String,
    enum: ["jpg", "png", "jpeg"],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },

  material: {
    type: String,
    required: true,
  },

  specialRequests: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: ["processing", "completed", "error"],
    default: "processing",
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
