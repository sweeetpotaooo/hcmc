const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
    },
    id: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 5,
    },
    birth: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      default: "0", // "0": "여자", "1": "남자"
    },
    univ: {
      type: String,
      default: "",
      maxLength: 50,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    console.error(err);
    next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
