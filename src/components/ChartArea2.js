import React from "react";
import "../style/ChartArea2.scss";

const ChartArea2 = ({ totalExpense, totalIncome, rows, dataList, orgRows }) => {
  return (
      <div className="totalBox">
        <div className="Total totalExpense">
          남은 예산
          <br />
          <span>{totalExpense.toLocaleString()} 원 /</span>
        </div>
      </div>
  );
};

export default ChartArea2;
