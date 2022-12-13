// import React, { useEffect, useState } from "react";
import "../style/Chart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ dataList }) => {
  const data = {
    labels: ["식비", "생필품", "문화/교육비", "기타", "저축"],
    datasets: [
      {
        label: "합계",
        // data: [12, 19, 3, 5, 2, 3],
        data: [
          dataList.food,
          dataList.goods,
          dataList.edu,
          dataList.etc,
          dataList.save,
        ],
        backgroundColor: [
          "rgb(255, 130, 157)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="chartDiv">
      <h3>소비 분석 레포트 📈</h3>
      <Doughnut
        data={data}
        options={options}
        width="400px"
        height="400px"
        className="chart"
      />
    </div>
  );
};

export default Chart;
