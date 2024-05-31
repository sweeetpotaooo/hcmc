import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "../style/Card.scss";

ChartJS.register(BarElement, LinearScale, Tooltip, Legend);

const processData = (userData, averageSpending) => {
  const categories = ["지출", "동문 평균"];
  const backgroundColors = ["rgb(255, 130, 157)", "rgba(54, 162, 235)"];

  const dataList = {
    지출: userData.reduce((sum, item) => sum + item.amount, 0),
    "동문 평균": averageSpending,
  };

  return {
    labels: categories,
    datasets: [
      {
        data: categories.map((tag) => dataList[tag]),
        backgroundColor: backgroundColors,
      },
    ],
  };
};

const UnivSpendingCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userUniversity = "건국대학교"; // 실제 사용자 대학 이름으로 교체 필요

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/wallet/account_premeditate/money"
        );
        const averageResponse = await axios.get(
          `http://localhost:4000/wallet/account_free/average/${encodeURIComponent(
            userUniversity
          )}`
        );
        const chartData = processData(
          response.data,
          averageResponse.data.averageAmount
        );
        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []); // useEffect에 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 함

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="cardDiv">
      <h4>나의 동창들은 얼마나 썼을까?</h4>
      <Bar data={data} options={options} className="bar" />
    </div>
  );
};

export default UnivSpendingCard;