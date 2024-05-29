const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moneyCategory = new Schema({
  categoryName: {
    type: String,
    maxLength: 50,
  },
  isDeleted: {
    type: Boolean,
    default: false, // "false": "삭제", "true": 존재
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const MoneyCategory = mongoose.model("MoneyCategory", moneyCategory);

module.exports = MoneyCategory;
