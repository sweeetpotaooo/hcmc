import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import '../style/Card.scss';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const UnivSpendingCard = () => {
  const mySpending = 200; // 나의 금액
  const avgSpending = 150; // 평균 금액

  const data = {
    labels: ['나의 금액', '평균 금액'],
    datasets: [
      {
        label: '금액($)',
        data: [mySpending, avgSpending],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
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
      <h4>나의 동창들은 얼마나 썼을까?</h4>
      <div className="card-body">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UnivSpendingCard;
