const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moneyDetailLogSchema = new Schema(
  {
    money_type: {
      type: Boolean,
      default: false, // "false": "지출", "true": "수입"
    },
    money: {
      type: Number,
      defalut: 0,
    },
    description: {
      type: String,
    },
    limit: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false, // "false": "삭제", "true": 존재
    },
    budget: {
      type: Number,
      default: 0,
    },
    plan: {
      type: Boolean,
      default: false, // "false": "자유로운 소비", "true": "계획적인 소비"
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "MoneyCategory",
    },
    daylog_id: {
      type: Schema.Types.ObjectId,
      ref: "MoneyDayLog",
    },
  },
  { timestamps: true }
);

const MoneyDetailLog = mongoose.model("MoneyDetailLog", moneyDetailLogSchema);

module.exports = MoneyDetailLog;
