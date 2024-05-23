import React from "react";
import "../style/ChartArea2.scss";
import Chart from "./Chart";
import VerticalBarChart from "./VerticalBarChart";

const ChartArea2 = ({ totalExpense, totalIncome, rows, dataList, orgRows }) => {
  return (
    <div className="chartArea2">
      <div className="totalBox">
        <div className="total totalExpense">
          남은 예산
          <br />
          <span>{totalExpense} 원 /</span>
        </div>
      </div>
      <VerticalBarChart orgRows={orgRows} />
      <Chart dataList={dataList} />
    </div>
  );
};

export default ChartArea2;
