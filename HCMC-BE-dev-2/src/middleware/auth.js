const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next) => {
  const authHeader = req.Headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: docode.userId });
    if (!user) {
      return res.status(400).send("올바르지 않은 토큰입니다.");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = auth;
