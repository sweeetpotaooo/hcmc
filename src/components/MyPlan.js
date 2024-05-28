import React from "react";
import "../style/MyPlan.scss";

const MyPlan = () => {
  return (
    <>
      <div className="MyPlanPage">
        <div className="div">
          <div className="mainTitle">내 플랜 관리</div>
          <div className="planContainer">
            <div className="current">
              <div className="plantitle">진행 중</div>
              <div className="currentplan">
                <div>플랜명</div>
                <div>플랜기간</div>
                <div>자유로운 / 계획적인 소비</div>
              </div>
              <div className="currentplan">
                <div>플랜명</div>
                <div>플랜기간</div>
                <div>자유로운 / 계획적인 소비</div>
              </div>
              <div className="currentplan">
                <div>플랜명</div>
                <div>플랜기간</div>
                <div>자유로운 / 계획적인 소비</div>
              </div>
            </div>
            <div className="past">
              <div className="plantitle">진행 완료</div>
              <div className="pastplan">
                <div>플랜명</div>
                <div>플랜기간</div>
                <div>자유로운 / 계획적인 소비</div>
                <div>총 수입 / 총 지출(계획적 소비인 경우 총 지출만?)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPlan;
