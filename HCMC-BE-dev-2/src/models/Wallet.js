const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
