import React from "react";
import "../style/ChartArea.scss";

const ChartArea = ({ totalExpense, totalIncome, rows, dataList, orgRows }) => {
  return (
    <div className="totalBox">
      <div className="total totalExpense">
        총 지출
        <br />
        <span>{totalExpense} 원</span>
      </div>
      <div className="total totalIncome">
        총 수입
        <br />
        <span>{totalIncome} 원 </span>
      </div>
    </div>
  );
};

export default ChartArea;