import React, { useEffect, useState } from "react";
import "../style/Chart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const processData = (data) => {
  const categories = ["식비", "생필품", "문화/교육비", "기타", "저축"];
  const backgroundColors = [
    "rgb(255, 130, 157)", // 식비
    "rgba(54, 162, 235)", // 생필품
    "rgba(255, 206, 86)", // 문화/교육비
    "rgba(75, 192, 192)", // 기타
    "rgba(60, 179, 113)", // 저축
  ];

  const dataList = categories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});

  data.forEach((item) => {
    if (dataList[item.category] !== undefined) {
      dataList[item.category] += item.amount;
    }
  });
  console.log(dataList);

  return {
    labels: categories,
    datasets: [
      {
        data: categories.map((category) => dataList[category]),
        backgroundColor: backgroundColors,
      },
    ],
  };
};

const Chart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/wallet/money");
        const chartData = processData(response.data);
        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []); // useEffect에 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 함

  const options = {
    responsive: true,
    plugins: { legend: { position: "right" } },
    layout: { padding: { left: 60 } },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chartDiv">
      <div className="charSubDiv">
        <div className="charTitle">소비 분석 레포트 📈</div>
        <Doughnut data={data} options={options} className="chart" />
      </div>
    </div>
  );
};

export default Chart;
