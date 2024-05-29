const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");

// 내역 추가
router.post("/money", async (req, res) => {
  try {
    const data = req.body;
    await Wallet.insertMany(data);
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

// 내역 불러오기
router.get("/money", async (req, res) => {
  try {
    const wallet = await Wallet.find().sort({ createdAt: -1 });
    res.json(wallet);
  } catch (err) {
    console.error(err);
  }
});

// 클릭한 게시글 ObjectId 찾기
router.post("/money/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = new mongoose.Types.ObjectId(id);
    const wallet = await Wallet.findById(ObjectId);

    console.log(wallet);
    res.json(wallet);
  } catch (err) {
    console.error(err);
  }
});

// 내역 수정 기능 만들기
router.post(`/money/update/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = new mongoose.Types.ObjectId(id);
    const wallet = await Wallet.findById(ObjectId);
    const body = req.body;
    console.log(id);
    await wallet.updateOne(body);
    console.log("수정한 내역: \n", wallet);
  } catch (err) {
    console.error(err);
  }
});

// 리스트 내역 삭제
router.post(`/money/delete/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = new mongoose.Types.ObjectId(id);
    const wallet = await Wallet.findById(ObjectId);

    console.log("지운 내역: \n", wallet);
    await wallet.deleteOne();
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
