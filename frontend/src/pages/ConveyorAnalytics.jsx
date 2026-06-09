import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

function ConveyorAnalytics() {

  const [conveyorData, setConveyorData] = useState([]);

  const [topConveyor, setTopConveyor] = useState("");

  useEffect(() => {

    fetchConveyorData();

  }, []);

  const fetchConveyorData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/delays"
      );

      const data = res.data;

      processConveyorData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processConveyorData(data) {

  const conveyorMap = {};

  data.forEach((item) => {

    const equipment =
      item.delayType || "Unknown";

    conveyorMap[equipment] =
      (conveyorMap[equipment] || 0) + 1;

  });

  const formatted = Object.keys(conveyorMap).map((key) => ({

    name: key,

    value: conveyorMap[key]

  }));

  formatted.sort((a,b)=>b.value-a.value);

  setConveyorData(formatted.slice(0,10));

  if(formatted.length > 0){
    setTopConveyor(formatted[0].name);
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
          Conveyor Analytics
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          Conveyor downtime and operational monitoring analysis
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
              Critical Conveyor
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {topConveyor}
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Conveyor Stability
            </p>

            <h1 style={numberStyle("#ec4899")}>
              74%
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Downtime Alerts
            </p>

            <h1 style={numberStyle("#dc2626")}>
              21
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              Operational Health
            </p>

            <h1 style={numberStyle("#16a34a")}>
              Moderate
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

          {/* BAR */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Conveyor Failure Comparison
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <BarChart data={conveyorData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#60a5fa"
                  radius={[10,10,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* LINE */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Conveyor Downtime Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <LineChart data={conveyorData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f472b6"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* INSIGHTS */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"25px"
        }}>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Conveyor Insights
            </h2>

            <InsightCard
              text="🔄 Conveyor motor overheating causes frequent downtime"
              bg="#eef2ff"
            />

            <InsightCard
              text="⚠ Belt alignment failures increase during monsoon"
              bg="#eef2ff"
            />

            <InsightCard
              text="📈 Conveyor load imbalance affects operational efficiency"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Recommendations
            </h2>

            <InsightCard
              text="✓ Deploy predictive conveyor monitoring systems"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Improve lubrication and alignment schedules"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Use automated belt inspection sensors"
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

export default ConveyorAnalytics;