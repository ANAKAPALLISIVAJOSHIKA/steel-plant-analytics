import React, { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#f472b6",
  "#facc15",
  "#a78bfa",
  "#fb7185"
];

function EquipmentAnalytics() {

  const [equipmentData, setEquipmentData] = useState([]);

  const [topEquipment, setTopEquipment] = useState("");

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const res = await axios.get(
        "https://steel-plant-analytics.onrender.com/api/delays"
      );

      const data = res.data;

      processEquipmentData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processEquipmentData(data) {

    const equipmentMap = {};

    data.forEach((item) => {

      const equipment =
        item.delayType || "Unknown";

      equipmentMap[equipment] =
        (equipmentMap[equipment] || 0) + 1;

    });

    const formatted = Object.keys(equipmentMap).map((key) => ({

      name: key,

      value: equipmentMap[key]

    }));

    formatted.sort((a,b)=>b.value-a.value);

    setEquipmentData(formatted.slice(0,10));

    if(formatted.length > 0){

      setTopEquipment(formatted[0].name);

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
          Equipment Analytics
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          Equipment-wise operational delay monitoring and analysis
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
              Critical Equipment
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {topEquipment}
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Equipment Stability
            </p>

            <h1 style={numberStyle("#ec4899")}>
              79%
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Failure Alerts
            </p>

            <h1 style={numberStyle("#dc2626")}>
              16
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              Maintenance Efficiency
            </p>

            <h1 style={numberStyle("#16a34a")}>
              Stable
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
              Equipment Delay Comparison
            </h2>

            <ResponsiveContainer
              width="100%"
              height={450}
            >

              <BarChart data={equipmentData}>

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
              Equipment Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={450}
            >

              <PieChart>

                <Pie
                  data={equipmentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
                  innerRadius={70}
                >

                  {equipmentData.map((entry,index)=>(

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
              Equipment Insights
            </h2>

            <InsightCard
              text="⚙ Conveyor systems contribute highest operational delays"
              bg="#eef2ff"
            />

            <InsightCard
              text="🔧 Mechanical equipment failures dominate maintenance downtime"
              bg="#eef2ff"
            />

            <InsightCard
              text="📈 Preventive maintenance gaps increase equipment instability"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Recommendations
            </h2>

            <InsightCard
              text="✓ Increase preventive maintenance scheduling"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Deploy real-time equipment monitoring systems"
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

export default EquipmentAnalytics;