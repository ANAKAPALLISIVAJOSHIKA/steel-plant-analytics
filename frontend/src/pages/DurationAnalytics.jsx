import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

function DurationAnalytics() {

  const [durationData, setDurationData] = useState([]);

  const [totalDuration, setTotalDuration] = useState(0);

  const [avgDuration, setAvgDuration] = useState(0);

  useEffect(() => {

    fetchDurationData();

  }, []);

  const fetchDurationData = async () => {

    try {

      const res = await axios.get(
        "https://steel-plant-analytics.onrender.com/api/delays"
      );

      const data = res.data;

      processDurationData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processDurationData(data) {

    const durationMap = {};

    let total = 0;

    data.forEach((item) => {

      const dept =
        item.department || "Unknown";

      const duration =
        Number(item.duration) || 0;

      total += duration;

      durationMap[dept] =
        (durationMap[dept] || 0) + duration;

    });

    const formatted = Object.keys(durationMap).map((key) => ({

      name: key,

      duration: durationMap[key]

    }));

    formatted.sort((a,b)=>b.duration-a.duration);

    setDurationData(formatted);

    setTotalDuration(total);

    setAvgDuration(
      Math.round(total / data.length)
    );

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
          Duration Analytics
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          Delay duration comparison and operational impact analysis
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
              Total Delay Duration
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {totalDuration}
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              Average Delay
            </p>

            <h1 style={numberStyle("#16a34a")}>
              {avgDuration}m
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Peak Impact
            </p>

            <h1 style={numberStyle("#ec4899")}>
              High
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Efficiency Rating
            </p>

            <h1 style={numberStyle("#dc2626")}>
              79%
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
              Department Duration Comparison
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <BarChart data={durationData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="duration"
                  fill="#60a5fa"
                  radius={[10,10,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* AREA */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Duration Impact Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <AreaChart data={durationData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="duration"
                  stroke="#f472b6"
                  fill="#fbcfe8"
                />

              </AreaChart>

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
              Duration Insights
            </h2>

            <InsightCard
              text="⏱ Conveyor systems contribute maximum downtime duration"
              bg="#eef2ff"
            />

            <InsightCard
              text="⚠ Mechanical failures have highest repair times"
              bg="#eef2ff"
            />

            <InsightCard
              text="📈 Delay duration increases during maintenance shifts"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Recommendations
            </h2>

            <InsightCard
              text="✓ Improve preventive maintenance schedules"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Deploy faster incident response systems"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Optimize manpower allocation during peak periods"
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
    fontSize:"52px",
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

export default DurationAnalytics;