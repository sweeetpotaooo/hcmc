import React from "react";
//import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 가져옵니다.
//import PlanDetail from "./Plandetail_free";
import "../style/PlanName.scss";

const PlanName = ({PlanDetail}) => {
  

  return (
    // <div className="PlanNamePage">
    //   <div className="Subdiv">
    //     <div className="plantitle">플랜명</div>
    //     <div className="plandate">플랜기간</div>
    //     <div className="plancontent">플랜설명</div>
    //   </div>
    // </div>

    <div className="PlanNamePage">
      <div className="Subdiv">
        <div className="planname">플랜명</div>
        <div className="plandate">플랜기간</div>
        <div className="plancontent">플랜설명</div>
      </div>
    </div>
  );
};

export default PlanName;