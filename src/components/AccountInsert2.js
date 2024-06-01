import React, { useState } from "react";
import "../style/AccountInsert.scss";
import Button from "@mui/material/Button";
import axios from "axios";

const AccountInsert2 = ({ insertRow, userId }) => {
  const [value, setValue] = useState({
    date: "",
    category: "",
    title: "",
    amount: "",
    tag: "",
  });

  const inputHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      value.date.trim() === "" ||
      value.category.trim() === "" ||
      value.title.trim() === "" ||
      value.amount.trim() === ""
    ) {
      return alert("모든 정보를 입력해주세요.");
    }

    const newRow = {
      userId,
      date: value.date,
      title: value.title,
      category: value.category,
      amount: parseInt(value.amount),
      tag: "",
    };
    console.log("Inserting Row:", newRow);
    insertRow(newRow);

    const sendData = async (data) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/wallet/account_premeditate/money",
          data,
          { params: { userId: userId, planId: data._id } },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    };
    sendData(newRow); // Send data to the backend

    setValue({
      date: "",
      category: "",
      title: "",
      amount: "",
      tag: "",
    });
  };

  return (
    <form
      className="AccountInsert"
      onSubmit={submitHandler}
      target="insertSubmit"
    >
      <label className="inputDate">
        <h3>Date</h3>
        <input
          type="date"
          name="date"
          value={value.date}
          onChange={inputHandler}
          required
        />
      </label>

      <label className="inputSelect">
        <h3>Category</h3>
        <select
          name="category"
          value={value.category}
          onChange={inputHandler}
          required
        >
          <option value="" disabled>
            카테고리 선택
          </option>
          <option value="식비">식비</option>
          <option value="생필품">생필품</option>
          <option value="문화/교육비">문화/교육비</option>
          <option value="기타">기타</option>
          <option value="저축">저축</option>
        </select>
      </label>

      <label className="inputTitle">
        <h3>Title</h3>
        <input
          type="text"
          name="title"
          value={value.title}
          onChange={inputHandler}
          required
        />
      </label>

      <label className="inputNumber">
        <h3>Amount</h3>
        <input
          type="number"
          name="amount"
          value={value.amount}
          onChange={inputHandler}
          required
        />
      </label>

      <Button variant="contained" className="submitBtn" type="submit">
        추가
      </Button>
    </form>
  );
};

export default AccountInsert2;
