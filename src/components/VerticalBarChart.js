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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart = ({ orgRows }) => {
  // const [state, dispatch] = useReducer(reducer, 0);

  // 차트에 들어갈 데이터 초기화
  const [verDataList, setVerDataList] = useState({
    janIn: 0,
    janOut: 0,
    fabIn: 0,
    fabOut: 0,
    marIn: 0,
    marOut: 0,
    aprIn: 0,
    aprOut: 0,
    mayIn: 0,
    mayOut: 0,
    junIn: 0,
    junOut: 0,
    julIn: 0,
    julOut: 0,
    augIn: 0,
    augOut: 0,
    sepIn: 0,
    sepOut: 0,
    octIn: 0,
    octOut: 0,
    novIn: 0,
    novOut: 0,
    decIn: 0,
    decOut: 0,
  });

  useEffect(() => {
    orgRows.map((item) => {
      const month = item.date.slice(5, 7);

      if (item.tag === "지출") {
        if (month === "01") {
          setVerDataList((prev) => ({
            ...prev,
            janOut: (verDataList.janOut += item.amount),
          }));
        } else if (month === "02") {
          setVerDataList((prev) => ({
            ...prev,
            fabOut: (verDataList.fabOut += item.amount),
          }));
        } else if (month === "03") {
          setVerDataList((prev) => ({
            ...prev,
            aprOut: (verDataList.aprOut += item.amount),
          }));
        } else if (month === "05") {
          setVerDataList((prev) => ({
            ...prev,
            mayOut: (verDataList.mayOut += item.amount),
          }));
        } else if (month === "06") {
          setVerDataList((prev) => ({
            ...prev,
            junOut: (verDataList.junOut += item.amount),
          }));
        } else if (month === "07") {
          setVerDataList((prev) => ({
            ...prev,
            julOut: (verDataList.julOut += item.amount),
          }));
        } else if (month === "08") {
          setVerDataList((prev) => ({
            ...prev,
            augOut: (verDataList.augIn += item.amount),
          }));
        } else if (month === "09") {
          setVerDataList((prev) => ({
            ...prev,
            sepOut: (verDataList.sepOut += item.amount),
          }));
        } else if (month === "10") {
          setVerDataList((prev) => ({
            ...prev,
            octOut: (verDataList.octOut += item.amount),
          }));
        } else if (month === "11") {
          setVerDataList((prev) => ({
            ...prev,
            novOut: (verDataList.novOut += item.amount),
          }));
        } else if (month === "12") {
          setVerDataList((prev) => ({
            ...prev,
            decOut: (verDataList.decOut += item.amount),
          }));
        }
      } else if (item.tag === "수입") {
        if (month === "01") {
          setVerDataList((prev) => ({
            ...prev,
            janIn: (verDataList.janIn += item.amount),
          }));
        } else if (month === "02") {
          setVerDataList((prev) => ({
            ...prev,
            fabIn: (verDataList.fabIn += item.amount),
          }));
        } else if (month === "03") {
          setVerDataList((prev) => ({
            ...prev,
            aprIn: (verDataList.aprIn += item.amount),
          }));
        } else if (month === "05") {
          setVerDataList((prev) => ({
            ...prev,
            mayIn: (verDataList.mayIn += item.amount),
          }));
        } else if (month === "06") {
          setVerDataList((prev) => ({
            ...prev,
            junIn: (verDataList.junIn += item.amount),
          }));
        } else if (month === "07") {
          setVerDataList((prev) => ({
            ...prev,
            julIn: (verDataList.julIn += item.amount),
          }));
        } else if (month === "08") {
          setVerDataList((prev) => ({
            ...prev,
            augIn: (verDataList.augIn += item.amount),
          }));
        } else if (month === "09") {
          setVerDataList((prev) => ({
            ...prev,
            sepIn: (verDataList.sepIn += item.amount),
          }));
        } else if (month === "10") {
          setVerDataList((prev) => ({
            ...prev,
            octIn: (verDataList.octIn += item.amount),
          }));
        } else if (month === "11") {
          setVerDataList((prev) => ({
            ...prev,
            novIn: (verDataList.novIn += item.amount),
          }));
        } else if (month === "12") {
          setVerDataList((prev) => ({
            ...prev,
            decIn: (verDataList.decIn += item.amount),
          }));
        }
      }
    });
  }, [orgRows]);

  console.log("렌더링");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Bar Chart",
      // },
    },
  };

  const labels = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "지출",
        data: [
          verDataList.janOut,
          verDataList.fabOut,
          verDataList.marOut,
          verDataList.aprOut,
          verDataList.mayOut,
          verDataList.janOut,
          verDataList.julOut,
          verDataList.augOut,
          verDataList.sepOut,
          verDataList.octOut,
          verDataList.novOut,
          verDataList.decOut,
        ],
        backgroundColor: "rgba(92, 53, 178, 0.9)",
      },
      {
        label: "수입",
        data: [
          verDataList.janIn,
          verDataList.fabIn,
          verDataList.marIn,
          verDataList.aprIn,
          verDataList.mayIn,
          verDataList.janIn,
          verDataList.julIn,
          verDataList.augIn,
          verDataList.sepIn,
          verDataList.octIn,
          verDataList.novIn,
          verDataList.decIn,
        ],
        backgroundColor: "rgba(30, 136, 229, 0.9)",
      },
    ],
  };

  return (
    <div className="verticalChart">
      <Bar options={options} data={data} />
    </div>
  );
};

export default memo(VerticalBarChart);
