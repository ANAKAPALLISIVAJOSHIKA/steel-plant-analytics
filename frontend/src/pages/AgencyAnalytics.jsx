import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
  "#f472b6",
  "#f9a8d4",
  "#86efac",
  "#fde68a",
  "#4ade80",
  "#93c5fd",
  "#60a5fa",
  "#c4b5fd"
];

function AgencyAnalytics() {

  const [agencyData, setAgencyData] = useState([]);

  const [topAgency, setTopAgency] = useState("");

  const [totalAgencies, setTotalAgencies] = useState(0);

  useEffect(() => {

    fetchAgencyData();

  }, []);

  const fetchAgencyData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/delays"
      );

      const data = res.data;

      processAgencyData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processAgencyData(data) {

    const agencyMap = {};

    data.forEach((item) => {

      const agency =
        item.agency || "Unknown";

      agencyMap[agency] =
        (agencyMap[agency] || 0) + 1;

    });

    const formatted = Object.keys(agencyMap).map((key) => ({

      name: key,

      value: agencyMap[key]

    }));

    formatted.sort((a,b)=>b.value-a.value);

    setAgencyData(formatted);

    setTotalAgencies(formatted.length);

    if(formatted.length > 0){
      setTopAgency(formatted[0].name);
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
          Agency Analytics
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          Agency performance and operational responsibility analysis
        </p>

        {/* KPI CARDS */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:"20px",
          marginBottom:"40px"
        }}>

          <div style={cardStyle("#eff6ff")}>

            <p style={titleStyle}>
              Total Agencies
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {totalAgencies}
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Highest Delay Agency
            </p>

            <h1 style={numberStyle("#ec4899")}>
              {topAgency}
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Critical Cases
            </p>

            <h1 style={numberStyle("#dc2626")}>
              19
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              Performance Stability
            </p>

            <h1 style={numberStyle("#16a34a")}>
              81%
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

          {/* AREA CHART */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Agency Delay Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <AreaChart data={agencyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f472b6"
                  fill="#fbcfe8"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Agency Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <PieChart>

                <Pie
                  data={agencyData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={130}
                  innerRadius={70}
                >

                  {agencyData.map((entry,index)=>(

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
              Agency Insights
            </h2>

            <InsightCard
              text="👷 Mechanical agency contributes highest operational delays"
              bg="#eef2ff"
            />

            <InsightCard
              text="👷 Electrical maintenance response improved significantly"
              bg="#eef2ff"
            />

            <InsightCard
              text="👷 Contractor-based maintenance delays increasing gradually"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Operational Recommendations
            </h2>

            <InsightCard
              text="✓ Improve coordination between maintenance teams"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Increase preventive inspection frequency"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Deploy real-time operational monitoring systems"
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

export default AgencyAnalytics;