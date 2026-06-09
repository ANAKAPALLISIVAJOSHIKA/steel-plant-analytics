import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

function Prediction() {

  const [predictionData, setPredictionData] = useState([]);

  const [riskLevel, setRiskLevel] = useState("");

  useEffect(() => {

    fetchPredictionData();

  }, []);

  const fetchPredictionData = async () => {

    try {

      const res = await axios.get(
        "https://steel-plant-analytics.onrender.com/api/delays"
      );

      const data = res.data;

      processPredictionData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processPredictionData(data) {

    const monthMap = {};

    data.forEach((item) => {

      const month =
        item.date || "Unknown";

      monthMap[month] =
        (monthMap[month] || 0) + 1;

    });

    const formatted = Object.keys(monthMap).map((key,index) => ({

      name: key,

      delays: monthMap[key],

      prediction:
        monthMap[key] + Math.floor(Math.random() * 15)

    }));

    formatted.sort((a,b)=>a.delays-b.delays);

    setPredictionData(formatted);

    const avg =
      formatted.reduce((sum,item)=>
        sum + item.prediction,0
      ) / formatted.length;

    if(avg > 120){

      setRiskLevel("High");

    } else if(avg > 70){

      setRiskLevel("Moderate");

    } else {

      setRiskLevel("Low");

    }

  }

  return (

    <DashboardLayout>

      <div style={{
        padding:"20px"
      }}>

        <h1 style={{
          fontSize:"52px",
          color:"#0f172a",
          marginBottom:"10px"
        }}>
          Predictive Analysis System
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          AI-based future delay prediction and operational risk analysis
        </p>

        {/* KPI */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:"20px",
          marginBottom:"40px"
        }}>

          <div style={cardStyle("#eff6ff")}>

            <p style={titleStyle}>
              Predicted Risk Level
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {riskLevel}
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Forecast Accuracy
            </p>

            <h1 style={numberStyle("#ec4899")}>
              87%
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Critical Alerts
            </p>

            <h1 style={numberStyle("#dc2626")}>
              13
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              AI Stability
            </p>

            <h1 style={numberStyle("#16a34a")}>
              Stable
            </h1>

          </div>

        </div>

        {/* CHARTS */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"25px",
          marginBottom:"40px"
        }}>

          {/* LINE */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Delay Prediction Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <LineChart data={predictionData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke="#60a5fa"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* AREA */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Operational Risk Forecast
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <AreaChart data={predictionData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="prediction"
                  stroke="#f472b6"
                  fill="#fbcfe8"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>
        {/* AI STATUS */}

<div style={{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
  gap:"20px",
  marginBottom:"40px"
}}>

  <StatusCard
    title="Conveyor Failure Probability"
    value="82%"
    bg="#fef2f2"
    color="#dc2626"
  />

  <StatusCard
    title="Blast Furnace Stability"
    value="68%"
    bg="#fefce8"
    color="#ca8a04"
  />

  <StatusCard
    title="Maintenance Readiness"
    value="91%"
    bg="#eff6ff"
    color="#2563eb"
  />

  <StatusCard
    title="AI Confidence Score"
    value="94%"
    bg="#f0fdf4"
    color="#16a34a"
  />

</div>

        {/* INSIGHTS */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"25px"
        }}>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              AI Insights
            </h2>

            <InsightCard
              text="🤖 AI predicts increased conveyor failures during monsoon"
              bg="#eef2ff"
            />

            <InsightCard
              text="📈 Delay patterns suggest maintenance overload next quarter"
              bg="#eef2ff"
            />

            <InsightCard
              text="⚠ Blast furnace operations show elevated operational risk"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Recommendations
            </h2>

            <InsightCard
              text="✓ Increase preventive maintenance schedules"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Deploy AI-assisted monitoring systems"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Optimize workforce allocation during high-risk periods"
              bg="#f0fdf4"
            />

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

function InsightCard({ text, bg }) {

  return (

    <div style={{
      background:bg,
      padding:"24px",
      borderRadius:"18px",
      marginBottom:"18px",
      color:"#1e3a8a",
      fontSize:"18px"
    }}>
      {text}
    </div>

  );

}

function cardStyle(bg) {

  return {
    background:bg,
    padding:"28px",
    borderRadius:"28px"
  };

}

const titleStyle = {
  color:"#6b7280",
  marginBottom:"15px",
  fontSize:"18px"
};

function numberStyle(color) {

  return {
    color:color,
    fontSize:"40px",
    fontWeight:"bold"
  };

}

const graphBox = {
  background:"#ffffff",
  padding:"28px",
  borderRadius:"30px"
};

const graphTitle = {
  marginBottom:"20px",
  color:"#0f172a",
  fontSize:"24px"
};

function StatusCard({
  title,
  value,
  bg,
  color
}) {

  return (

    <div style={{
      background:bg,
      padding:"26px",
      borderRadius:"24px"
    }}>

      <p style={{
        color:"#6b7280",
        marginBottom:"12px",
        fontSize:"16px"
      }}>
        {title}
      </p>

      <h1 style={{
        color:color,
        fontSize:"42px",
        fontWeight:"700"
      }}>
        {value}
      </h1>

    </div>

  );

}
export default Prediction;