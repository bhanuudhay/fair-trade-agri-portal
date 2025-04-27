const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
  },
  quantityToSell: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Produce", produceSchema);
