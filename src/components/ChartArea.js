import React from "react";
import "../style/ChartArea.scss";
import Chart from "./Chart";
//import VerticalBarChart from "./VerticalBarChart";

const ChartArea = ({ totalExpense, totalIncome, rows, dataList, orgRows }) => {
  return (
    <div className="chartArea">
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
      <Chart dataList={dataList} />
    </div>
  );
};

export default ChartArea;
