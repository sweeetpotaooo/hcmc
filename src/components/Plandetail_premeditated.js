import React, { useState } from "react";
import "../style/Plandetail_premeditated.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlanDetail = () => {
  const [value, setValue] = useState({
    planName: "",
    planStart: "",
    planEnd: "",
    budget: "",
    description: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const sendData = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/plandetail_premeditated/consumption",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        navigate("/planned");
      }
    } catch (err) {
      console.error(err);
      alert("데이터 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      value.planName.trimEnd() === "" ||
      value.planStart.trimEnd() === "" ||
      value.planEnd.trimEnd() === "" ||
      value.budget.trimEnd() === "" ||
      value.description.trimEnd() === ""
    ) {
      return alert("모든 정보를 입력해주세요");
    }

    const newRow = {
      planName: value.planName,
      planStart: value.planStart,
      planEnd: value.planEnd,
      budget: value.budget,
      description: value.description,
    };
    sendData(newRow);

    setValue({
      planName: "",
      planStart: "",
      planEnd: "",
      budget: "",
      description: "",
    });
  };

  return (
    <div className="LoginPage">
      <div className="subdiv">
        <h1 className="title">당신의 플랜에 대해 알려주세요</h1>
        <form onSubmit={submitHandler}>
          <div className="contentTitle">
            <label className="inputtitle" htmlFor="planName">
              플랜 이름
            </label>
            <div className="inputWrite">
              <input
                type="text"
                id="planName"
                name="planName"
                className="input"
                value={value.planName}
                onChange={inputHandler}
                required
              />
            </div>
          </div>
          <div className="contentTitle">
            <label className="inputtitle">플랜기간</label>
            <div className="plan-duration inputWrite">
              <input
                type="date"
                id="planStart"
                name="planStart"
                className="input"
                value={value.planStart}
                onChange={inputHandler}
                required
              />
              <span> ~ </span>
              <input
                type="date"
                id="planEnd"
                name="planEnd"
                className="input"
                value={value.planEnd}
                onChange={inputHandler}
                required
              />
            </div>
          </div>
          <div className="contentTitle">
            <label className="inputtitle" htmlFor="budget">
              예산
            </label>
            <div className="inputWrite">
              <input
                type="number"
                id="budget"
                name="budget"
                className="input"
                value={value.budget}
                onChange={inputHandler}
                required
              />
            </div>
          </div>
          <div className="contentTitle">
            <label className="inputtitle" htmlFor="details">
              세부 설명
            </label>
            <div className="inputWrite">
              <input
                id="description"
                name="description"
                className="input"
                value={value.description}
                onChange={inputHandler}
                required
              />
            </div>
          </div>
          <div className="button">
            <button className="btn" type="submit">
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanDetail;
