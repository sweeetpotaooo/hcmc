import React from "react";
import "../style/ChartArea2.scss";

const ChartArea2 = ({ totalExpense, totalIncome, rows, dataList, orgRows }) => {
  return (
      <div className="totalBox">
        <div className="total totalExpense">
          남은 예산
          <br />
          <span>{totalExpense} 원 /</span>
        </div>
      </div>
  );
};

export default ChartArea2;
