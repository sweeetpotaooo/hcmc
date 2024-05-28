const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/auth", (req, res) => {
  try {
    return res.status(200).json({
      _id: req.user._id,
      id: req.user.id,
      name: req.user.name,
      birth: req.user.birth,
      gender: req.user.gender,
      univ: req.user.univ,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/find", async (req, res) => {
  try {
    const foundUser = await User.findOne({ name: "Saint" });
    if (!foundUser) {
      return res.status(404).send("User not found");
    }
    res.json(foundUser);
  } catch (err) {
    console.error(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.user);
    await user.save();
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.body.id });
    if (!user) {
      return res.status(400).send("아이디가 없습니다.");
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("잘못된 비밀번호 입니다.");
    }
    const payload = {
      userId: user._id.toHexString(),
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ user, accessToken });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/logout", auth, (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
