import React, { useState } from "react";
import "../style/Plandetail_premeditated.scss";
<<<<<<< HEAD
import { Navigate, useNavigate } from "react-router-dom";
=======
>>>>>>> main

const PlanDetail = () => {
  const [form, setForm] = useState({
    planname: "",
    planStart: "",
    planEnd: "",
    budget: "",
    details: "",
  });

<<<<<<< HEAD
  const navigate = useNavigate();

  const handleChange = (e) => {
=======
  const handleChange = e => {
>>>>>>> main
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    navigate("/planned");
  };

  return (
    <div className="LoginPage">
      <div className="subdiv">
        <h1 className="title">당신의 플랜에 대해 알려주세요</h1>
        <form onSubmit={handleSubmit}>
          <div className="contentTitle">
            <label className="inputtitle" htmlFor="planname">플랜 이름</label>
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
            <label className="inputtitle" htmlFor="budget">예산</label>
            <div className="inputWrite">
              <input
                type="number"
                id="budget"
                name="budget"
                className="input"
                value={form.budget}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>
          <div className="contentTitle">
            <label className="inputtitle" htmlFor="details">세부 설명</label>
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
            <button className="btn" type="submit">제출</button>
          </div>
=======
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // 서버로 폼 데이터 전송 로직 추가
  };

  return (
    <div className="wrapper">
      <div className="signup-container">
        <h1>당신의 플랜에 대해 알려주세요</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="planname">플랜 이름</label>
            <input
              type="text"
              id="planname"
              name="planname"
              value={form.planname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="plan-duration">
            <label>플랜기간</label>
            <input
              type="date"
              id="planStart"
              name="planStart"
              value={form.planStart}
              onChange={handleChange}
              required
            />
            <span> ~ </span>
            <input
              type="date"
              id="planEnd"
              name="planEnd"
              value={form.planEnd}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="budget">예산</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="details">세부 설명</label>
            <input
              id="details"
              name="details"
              value={form.details}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">제출</button>
>>>>>>> main
        </form>
      </div>
    </div>
  );
};

export default PlanDetail;