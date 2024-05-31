import React, { useEffect, useState, memo } from "react";
import "../style/VerticalBarChart.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "jan",
  "fab",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const monthMapping = {
  "01": "jan",
  "02": "fab",
  "03": "mar",
  "04": "apr",
  "05": "may",
  "06": "jun",
  "07": "jul",
  "08": "aug",
  "09": "sep",
  "10": "oct", 
  "11": "nov", 
  "12": "dec", 
};

const VerticalBarChart2 = ({ orgRows }) => {
  // 차트에 들어갈 데이터 초기화
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: { legend: { position: "right" } },
    layout: { padding: { bottom: 20 } },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/consumption/premeditate");
        const verDataList = response.data.reduce((acc, item) => {
          const month = item.date.slice(5, 7); // YYYY-MM-DD 중 MM을 선택
          const monthKey = monthMapping[month];
          if (monthKey) {
            const type = item.tag === "지출" ? "Out" : "In";
            const key = `${monthKey}${type}`;
            acc[key] = (acc[key] || 0) + item.amount;
          }
          return acc;
        }, {});

        const chartData = {
          labels: months.map(
            (month) => month.charAt(0).toUpperCase() + month.slice(1)
          ),
          datasets: [
            {
              label: "지출",
              data: months.map((month) => verDataList[`${month}Out`] || 0),
              backgroundColor: "rgba(92, 53, 178, 0.9)",
            },
          ],
        };
        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="verticalChart">
      <Bar options={options} data={data} className="bar" />
    </div>
  );
};

export default memo(VerticalBarChart2);
