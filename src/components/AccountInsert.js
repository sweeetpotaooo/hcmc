import React, { useState } from "react";
import "../style/AccountInsert.scss";
import Button from "@mui/material/Button";

const AccountInsert = ({ insertRow }) => {
  const [row, setRow] = useState({});

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      date.trimEnd() === "" ||
      category.trimEnd() === "" ||
      title.trimEnd() === "" ||
      amount.trimEnd() === ""
    ) {
      return;
    }

    insertRow([date, title, category, amount]);

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <form className="AccountInsert" onSubmit={submitHandler}>
      <label className="inputDate">
        Date
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </label>

      <label className="inputSelect">
        Category
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option>식비</option>
          <option>생필품</option>
          <option>문화/교육비</option>
          <option>기타</option>
          <option>저축</option>
        </select>
      </label>
      <label className="inputTitle">
        Title
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>

      <label className="inputNumber">
        Amount
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount||""}
          step={10000}
        />
      </label>

      <Button variant="contained" className="submitBtn" type="submit">
        추가
      </Button>
    </form>
  );
};

export default AccountInsert;
