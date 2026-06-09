import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  LineChart,
  Line,
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
  "#facc15"
];

function SeasonalAnalytics() {

  const [seasonData, setSeasonData] = useState([]);

  const [highestSeason, setHighestSeason] = useState("");

  useEffect(() => {

    fetchSeasonData();

  }, []);

  const fetchSeasonData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/delays"
      );

      const data = res.data;

      processSeasonData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processSeasonData(data) {

    const seasonMap = {
      Winter: 0,
      Summer: 0,
      Monsoon: 0,
      PostMonsoon: 0
    };

    data.forEach((item) => {

      const month =
        new Date(item.date).getMonth() + 1;

      if ([12,1,2].includes(month)) {

        seasonMap.Winter++;

      } else if ([3,4,5].includes(month)) {

        seasonMap.Summer++;

      } else if ([6,7,8,9].includes(month)) {

        seasonMap.Monsoon++;

      } else {

        seasonMap.PostMonsoon++;

      }

    });

    const formatted = Object.keys(seasonMap).map((key) => ({

      name: key,

      value: seasonMap[key]

    }));

    formatted.sort((a,b)=>b.value-a.value);

    setSeasonData(formatted);

    if(formatted.length > 0){
      setHighestSeason(formatted[0].name);
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
          Seasonal Analytics
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          Seasonal operational delay analysis
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
              Highest Delay Season
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {highestSeason}
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              Weather Stability
            </p>

            <h1 style={numberStyle("#16a34a")}>
              76%
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Rainfall Impact
            </p>

            <h1 style={numberStyle("#dc2626")}>
              High
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Summer Efficiency
            </p>

            <h1 style={numberStyle("#ec4899")}>
              84%
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

          {/* LINE */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Seasonal Delay Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <LineChart data={seasonData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#60a5fa"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* PIE */}

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Seasonal Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <PieChart>

                <Pie
                  data={seasonData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={130}
                  innerRadius={70}
                >

                  {seasonData.map((entry,index)=>(

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
              Seasonal Insights
            </h2>

            <InsightCard
              text="🌧 Monsoon season contributes maximum operational delays"
              bg="#eef2ff"
            />

            <InsightCard
              text="☀ Summer operations remain comparatively stable"
              bg="#eef2ff"
            />

            <InsightCard
              text="❄ Winter moisture affects conveyor efficiency"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Recommendations
            </h2>

            <InsightCard
              text="✓ Improve drainage systems during monsoon"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Increase seasonal preventive maintenance"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Deploy weather-based operational planning"
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

export default SeasonalAnalytics;