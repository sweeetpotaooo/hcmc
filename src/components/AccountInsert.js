import React, { useState } from "react";
import "../style/AccountInsert.scss";
import Button from "@mui/material/Button";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const AccountInsert = ({ insertRow }) => {
  const [row, setRow] = useState({});

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();
  const [tag, setTag] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      date.trimEnd() === "" ||
      category.trimEnd() === "" ||
      title.trimEnd() === "" ||
      amount.trimEnd() === ""
    ) {
      return alert("모든 정보를 입력해주세요.")
    }

    insertRow([date, title, category, tag, amount]);

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
        <select onChange={(e) => setCategory(e.target.value)} value={category} required>
          <option disabled>지출</option>
          <option>식비</option>
          <option>생필품</option>
          <option>문화/교육비</option>
          <option>기타</option>
          <option>저축</option>
          <option disabled>수입</option>
          <option>월급</option>
          <option>기타소득</option>
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
          value={amount || ""}
          step={10000}
        />
      </label>

      <label className="radioBtn">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="지출"
        >
          <FormControlLabel
            value="수입"
            control={
              <Radio
                size="small"
                onChange={(e) => setTag(e.target.value)}
              />
            }
            label="수입"
            labelPlacement="start"
          />
          <FormControlLabel
            value="지출"
            control={
              <Radio
                size="small"
                onChange={(e) => setTag(e.target.value)}
              />
            }
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

export default AccountInsert;
