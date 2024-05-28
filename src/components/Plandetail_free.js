import React, { useState } from "react";
import "../style/Plandetail_premeditated.scss";
import { useNavigate } from "react-router-dom";

const PlanDetail = () => {
  const [form, setForm] = useState({
    planname: "",
    planStart: "",
    planEnd: "",
    budget: "",
    details: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    navigate("/free");
  };

  return (
    <div className="LoginPage">
      <div className="subdiv">
        <h1 className="title">당신의 플랜에 대해 알려주세요</h1>
        <form onSubmit={handleSubmit}>
          <div className="contentTitle">
            <label className="inputtitle" htmlFor="planname">
              플랜 이름
            </label>
            <div className="inputWrite">
              <input
                type="text"
                id="planname"
                name="planname"
                className="input"
                value={form.planname}
                onChange={handleChange}
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
                value={form.planStart}
                onChange={handleChange}
                required
              />
              <span> ~ </span>
              <input
                type="date"
                id="planEnd"
                name="planEnd"
                className="input"
                value={form.planEnd}
                onChange={handleChange}
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
                id="details"
                name="details"
                className="input"
                value={form.details}
                onChange={handleChange}
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
