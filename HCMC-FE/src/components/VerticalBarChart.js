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
  const [verDataList, setVerDataList] = useState({});

  useEffect(() => {
    setVerDataList({
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
    orgRows.map((item) => {
      const month = item.date.slice(5, 7);

      if (item.tag === "지출") {
        if (month === "01") {
          setVerDataList((prev) => ({
            ...prev,
            janOut: prev.janOut + item.amount,
          }));
        } else if (month === "02") {
          setVerDataList((prev) => ({
            ...prev,
            fabOut: prev.fabOut + item.amount,
          }));
        } else if (month === "03") {
          setVerDataList((prev) => ({
            ...prev,
            aprOut: prev.aprOut + item.amount,
          }));
        } else if (month === "05") {
          setVerDataList((prev) => ({
            ...prev,
            mayOut: prev.mayOut + item.amount,
          }));
        } else if (month === "06") {
          setVerDataList((prev) => ({
            ...prev,
            junOut: prev.junOut + item.amount,
          }));
        } else if (month === "07") {
          setVerDataList((prev) => ({
            ...prev,
            julOut: prev.julOut + item.amount,
          }));
        } else if (month === "08") {
          setVerDataList((prev) => ({
            ...prev,
            augOut: prev.augIn + item.amount,
          }));
        } else if (month === "09") {
          setVerDataList((prev) => ({
            ...prev,
            sepOut: prev.sepOut + item.amount,
          }));
        } else if (month === "10") {
          setVerDataList((prev) => ({
            ...prev,
            octOut: prev.octOut + item.amount,
          }));
        } else if (month === "11") {
          setVerDataList((prev) => ({
            ...prev,
            novOut: prev.novOut + item.amount,
          }));
        } else if (month === "12") {
          setVerDataList((prev) => ({
            ...prev,
            decOut: prev.decOut + item.amount,
          }));
        }
      } else if (item.tag === "수입") {
        if (month === "01") {
          setVerDataList((prev) => ({
            ...prev,
            janIn: prev.janIn + item.amount,
          }));
        } else if (month === "02") {
          setVerDataList((prev) => ({
            ...prev,
            fabIn: prev.fabIn + item.amount,
          }));
        } else if (month === "03") {
          setVerDataList((prev) => ({
            ...prev,
            aprIn: prev.aprIn + item.amount,
          }));
        } else if (month === "05") {
          setVerDataList((prev) => ({
            ...prev,
            mayIn: prev.mayIn + item.amount,
          }));
        } else if (month === "06") {
          setVerDataList((prev) => ({
            ...prev,
            junIn: prev.junIn + item.amount,
          }));
        } else if (month === "07") {
          setVerDataList((prev) => ({
            ...prev,
            julIn: prev.julIn + item.amount,
          }));
        } else if (month === "08") {
          setVerDataList((prev) => ({
            ...prev,
            augIn: prev.augIn + item.amount,
          }));
        } else if (month === "09") {
          setVerDataList((prev) => ({
            ...prev,
            sepIn: prev.sepIn + item.amount,
          }));
        } else if (month === "10") {
          setVerDataList((prev) => ({
            ...prev,
            octIn: prev.octIn + item.amount,
          }));
        } else if (month === "11") {
          setVerDataList((prev) => ({
            ...prev,
            novIn: prev.novIn + item.amount,
          }));
        } else if (month === "12") {
          setVerDataList((prev) => ({
            ...prev,
            decIn: prev.decIn + item.amount,
          }));
        }
      }
    });
  }, [orgRows]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
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
      <Bar options={options} data={data} className="bar" />
    </div>
  );
};

export default memo(VerticalBarChart);
