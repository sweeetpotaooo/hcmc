const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moneyDayLogSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  income: {
    type: Number,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const moneyDayLog = mongoose.model("MoneyDayLog", moneyDayLogSchema);

module.exports = moneyDayLog;
