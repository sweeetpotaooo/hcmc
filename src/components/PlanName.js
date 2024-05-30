import React, { useEffect } from "react";
import "../style/PlanName.scss";
import axios from "axios";

const PlanName = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/");
      } catch (err) {
        console.error(err);
      }
    };
  }, []);

  return (
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
