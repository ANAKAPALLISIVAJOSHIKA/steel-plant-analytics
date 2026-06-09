import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend
} from "recharts";

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#f472b6",
  "#facc15",
  "#a78bfa",
  "#fb7185",
  "#22c55e"
];

function DelayDescriptionAnalytics() {

  const [descriptionData, setDescriptionData] = useState([]);

  const [topCause, setTopCause] = useState("");

  useEffect(() => {

    fetchDescriptionData();

  }, []);

  const fetchDescriptionData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/delays"
      );

      const data = res.data;

      processDescriptionData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processDescriptionData(data) {

    const descMap = {};

    data.forEach((item) => {

      const desc =
        item.delayDescription || "Unknown";

      descMap[desc] =
        (descMap[desc] || 0) + 1;

    });

    const formatted = Object.keys(descMap).map((key) => ({

      name: key,

      value: descMap[key]

    }));

    formatted.sort((a,b)=>b.value-a.value);

    const top10 = formatted.slice(0,10);

    setDescriptionData(top10);

    if(top10.length > 0){
      setTopCause(top10[0].name);
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
          Delay Description Analytics
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          Root cause analysis of operational delays
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
              Top Delay Cause
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {topCause}
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Root Cause Severity
            </p>

            <h1 style={numberStyle("#ec4899")}>
              High
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Maintenance Alerts
            </p>

            <h1 style={numberStyle("#dc2626")}>
              17
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              Resolution Rate
            </p>

            <h1 style={numberStyle("#16a34a")}>
              82%
            </h1>

          </div>

        </div>

        {/* CHARTS */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"1.5fr 1fr",
          gap:"25px",
          marginBottom:"40px"
        }}>

          {/* BAR */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Delay Cause Comparison
            </h2>

            <ResponsiveContainer
              width="100%"
              height={450}
            >

              <BarChart data={descriptionData}>

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

          {/* PIE */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Cause Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={450}
            >

              <PieChart>

                <Pie
                  data={descriptionData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
                  innerRadius={70}
                >

                  {descriptionData.map((entry,index)=>(

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

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
              Operational Insights
            </h2>

            <InsightCard
              text="⚠ Mechanical breakdowns are major contributors to delays"
              bg="#eef2ff"
            />

            <InsightCard
              text="🔧 Conveyor-related failures occur frequently during peak operations"
              bg="#eef2ff"
            />

            <InsightCard
              text="📈 Delay patterns indicate preventive maintenance gaps"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Recommendations
            </h2>

            <InsightCard
              text="✓ Increase preventive maintenance frequency"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Deploy automated failure detection systems"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Improve spare parts availability management"
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

export default DelayDescriptionAnalytics;