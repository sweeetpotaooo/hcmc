const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// 미들웨어 등록
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../uploads")));

// MongoDB 연동
// database 선택
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB 연결 완료");
  })
  .catch((err) => console.error(err));

// 라우터 설정
app.use("/users", require("./routes/users"));
app.use("/wallet", require("./routes/money"));

// 에러 미들웨어 (에러는 이쪽에서 처리된다.)
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.status(err.message || "Throw Error");
});

// 서버 응답
app.listen(`${process.env.PORT}`, (req, res) => {
  console.log(`${process.env.PORT}`, "에서 서버 실행중");
});
