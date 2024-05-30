import React, { useState } from "react";
import "../style/AccountInsert.scss";
import Button from "@mui/material/Button";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const AccountInsert2 = ({ insertRow }) => {
  const [value, setValue] = useState({
    date: "",
    category: "",
    title: "",
    amount: "",
    //tag: "",
  });

  const inputHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      value.date.trimEnd() === "" ||
      value.category.trimEnd() === "" ||
      value.title.trimEnd() === "" ||
      value.amount.trimEnd() === ""
      //value.tag.trimEnd() === ""
    ) {
      return alert("모든 정보를 입력해주세요.");
    }

    const newRow = {
      date: value.date,
      title: value.title,
      category: value.category,
      amount: parseInt(value.amount),
      tag: value.tag,
    };
    insertRow(newRow);

    const sendData = async (data) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/wallet/money",
          data,
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
    sendData([newRow]); // 데이터를 백엔드로 전송

    setValue({
      date: " ",
      category: " ",
      title: " ",
      amount: " ",
      //tag: " ",
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
        <input type="date" name="date" onChange={inputHandler} />
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
            지출
          </option>
          <option>식비</option>
          <option>생필품</option>
          <option>문화/교육비</option>
          <option>기타</option>
          <option>저축</option>
        </select>
      </label>
      <label className="inputTitle">
        <h3>Title</h3>
        <input
          type="text"
          name="title"
          value={value.title}
          onChange={inputHandler}
        />
      </label>

      <label className="inputNumber">
        <h3>Amount</h3>
        <input
          type="number"
          name="amount"
          value={value.amount}
          onChange={inputHandler}
        />
      </label>

      <label className="radioBtn">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="tag"
          value={value.tag}
          onChange={inputHandler}
        >
          <FormControlLabel
            value="수입"
            control={<Radio size="small" />}
            label="수입"
            labelPlacement="start"
          />
          <FormControlLabel
            value="지출"
            control={<Radio size="small" />}
            label="지출"
            labelPlacement="start"
          />
        </RadioGroup>
      </label>

      <Button variant="contained" className="submitBtn" type="submit">
        추가
      </Button>
    </form>
  );
};

export default AccountInsert2;
