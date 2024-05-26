import React, { useState } from "react";
import "../style/Plandetail_free.scss";

const PlanDetail = () => {
  const [form, setForm] = useState({
    planname: "",
    planStart: "",
    planEnd: "",
    details: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

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
        </form>
      </div>
    </div>
  );
};

export default PlanDetail;