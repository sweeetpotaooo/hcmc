import React from "react";
import "../style/TotalExpense.scss";

const TotalExpense = ({ totalExpense }) => {
  return (
    <div className="totalExpense">
      총 지출
      <br />
      <span>{totalExpense} 원</span>
    </div>
  );
};

export default TotalExpense;
