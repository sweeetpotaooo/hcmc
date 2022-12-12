import React from "react";
import "../style/TotalIncome.scss";

const TotalIncome = ({ totalIncome }) => {
  return (
    <div className="totalIncome">
      총 수입
      <br />
      <span>{totalIncome} 원 </span>
    </div>
  );
};

export default TotalIncome;
