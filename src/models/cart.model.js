const mongoose = require("mongoose");
const { Schema } = mongoose;
const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";
const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    printRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PrintRequest",
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collation: COLLECTION_NAME,
  }
);

const Cart = mongoose.model(DOCUMENT_NAME, cartSchema);

module.exports = Cart;
