const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  timestamp: {
    type: String,
    required: true,
  },
  products: [
    {
      timestamp: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
