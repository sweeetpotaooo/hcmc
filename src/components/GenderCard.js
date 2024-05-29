import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import '../style/Card.scss';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GenderSpendingCard = () => {
  const mySpending = 200; // 나의 금액
  const avgSpending = 150; // 평균 금액
  const maleAvgSpending = 170; // 남성 평균 금액
  const femaleAvgSpending = 130; // 여성 평균 금액

  const data = {
    labels: ['나의 금액', '전체 평균 금액', '남성 평균 금액', '여성 평균 금액'],
    datasets: [
      {
        label: '금액($)',
        data: [mySpending, avgSpending, maleAvgSpending, femaleAvgSpending],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(153, 102, 255, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="cardDiv">
      <h4>나의 동성친구는 얼마나 썼을까?</h4>
      <Bar data={data} options={options} className="bar"/>
    </div>
  );
};

export default GenderSpendingCard;
