import React, { useEffect, useState } from "react";
import "../style/ChartArea2.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChartArea2 = ({ totalExpense, amount }) => {
  const [Budget, setBudget] = useState(0);
  const { planId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = planId;
        const response = await axios.get(
          `http://localhost:4000/plandetail_premeditate/consumption/find/${params}`
        );
        if (response.data) {
          setBudget(response.data.budget);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (planId) {
      fetchData();
    }
  }, [planId]);

  return (
    <div className="totalBox">
      <div className="Total totalExpense">
        남은 예산
        <br />
        <span>{totalExpense.toLocaleString()}원 / {(Budget || 0).toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default ChartArea2;