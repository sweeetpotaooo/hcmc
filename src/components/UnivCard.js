import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../style/Card.scss';

ChartJS.register(BarElement, LinearScale, Tooltip, Legend);

const processData = (data, averageSpending) => {
  const categories = ["지출", "전체 평균"];
  const backgroundColors = [
    "rgb(255, 130, 157)", 
    "rgba(54, 162, 235)", 
  ];

  const dataList = {
    "지출": data.reduce((acc, item) => acc + item.amount, 0),
    "전체 평균": averageSpending
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

const UnivSpendingCard = ({ univ }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spendingResponse = await axios.get("http://localhost:5000/wallet/money");
        const averageResponse = await axios.get(`http://localhost:5000/spending/average-spending?univ=${univ}`);
        const chartData = processData(spendingResponse.data, averageResponse.data.averageSpending);
        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [univ]);

  if (loading || !data) {
    return <div>Loading...</div>;
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
      <Bar data={data} options={options} className="bar"/>
    </div>
  );
};

export default UnivSpendingCard;

// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, LinearScale, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';
// import '../style/Card.scss';

// ChartJS.register(BarElement, LinearScale, Tooltip, Legend);

//   const processData = (data) => {
//     const categories = ["지출", "전체 평균"];
//     const backgroundColors = [
//       "rgb(255, 130, 157)", 
//       "rgba(54, 162, 235)", 
//     ];
//   const dataList = categories.reduce((acc, tag) => {
//     acc[tag] = 0;
//     return acc;
//   }, {});

//   data.forEach((item) => {
//     if (dataList[item.tag] !== undefined) {
//       dataList[item.tag] += item.amount;
//     }
//   });
// console.log(dataList);

// return {
//   labels: categories,
//   datasets: [
//       {
//         data: categories.map((tag) => dataList[tag]),
//         backgroundColor: backgroundColors,
//       },
//     ],
//   };
// };

// const UnivSpendingCard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/wallet/money");
//         const chartData = processData(response.data);
//         setData(chartData);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []); // useEffect에 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 함

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="cardDiv">
//       <h4>나의 동창들은 얼마나 썼을까?</h4>
//       <Bar data={data} options={options} className="bar"/>
//     </div>
//   );
// };
    
// export default UnivSpendingCard;