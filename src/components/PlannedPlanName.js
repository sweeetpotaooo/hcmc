import React, { useEffect, useState } from "react";
import "../style/PlanName.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlanName = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { planId } = useParams();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const params = planId;

        const response = await axios.get(
          `http://localhost:4000/plandetail_premeditate/consumption/find/${params}`
        );
        const formattedData = {
          ...response.data,
          planStart: formatDate(response.data.planStart),
          planEnd: formatDate(response.data.planEnd),
        };
        setPlan(formattedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (planId) {
      fetchPlan();
    }
  }, [planId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!plan) {
    return <div>No plan found</div>;
  }

  return (
    <div className="PlanNamePage">
      <div className="Subdiv">
        <div className="planItem">
          <div className="planname">
            <h3>{plan.planName}</h3>
          </div>
          <div className="plandate">
            <p>{plan.description}</p>
          </div>
          <div className="plancontent">
            <br />
            <p>{`${plan.planStart} ~ ${plan.planEnd}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanName;
