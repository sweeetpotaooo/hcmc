import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Plan.scss";

export default function Plan() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/plandetail_free");
  };
  const handle2Navigate = () => {
    navigate("/plandetail_premeditated");
  }

  return (
    <div className="PlanPage">
      <div className="Title">돈, 어떻게 쓰고 싶나요?</div>

      <div>
        <button className="plan" onClick={handle2Navigate}>
          <div className="planTitle">계획적인 소비</div>
          <div className="planContent">
            <p align="left">예산을 설정하고 예산 안에서</p>
            <p align="left">소비하는 습관을 기릅니다.</p>
          </div>
        </button>
      </div>

      <div>
        <button className="plan" onClick={handleNavigate}>
          <div className="planTitle">자유로운 소비</div>
          <div className="planContent">
            <p align="left">예산 없이 일정 기간동안</p>
            <p align="left">소비한 내용을 기록합니다.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
