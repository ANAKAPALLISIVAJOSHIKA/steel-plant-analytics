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
  "#fb7185"
];

function ShopAnalytics() {

  const [shopData, setShopData] = useState([]);

  const [topShop, setTopShop] = useState("");

  const [totalShops, setTotalShops] = useState(0);

  useEffect(() => {

    fetchShopData();

  }, []);

  const fetchShopData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/delays"
      );

      const data = res.data;

      processShopData(data);

    } catch (error) {

      console.log(error);

    }

  };

  function processShopData(data) {

    const shopMap = {};

    data.forEach((item) => {

      const shop =
        item.department || "Unknown";

      shopMap[shop] =
        (shopMap[shop] || 0) + 1;

    });

    const formatted = Object.keys(shopMap).map((key) => ({

      name: key,

      value: shopMap[key]

    }));

    formatted.sort((a,b)=>b.value-a.value);

    setShopData(formatted);

    setTotalShops(formatted.length);

    if(formatted.length > 0){
      setTopShop(formatted[0].name);
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
          Shop Analytics
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px",
          fontSize:"18px"
        }}>
          Department-wise operational delay analysis
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
              Total Shops
            </p>

            <h1 style={numberStyle("#2563eb")}>
              {totalShops}
            </h1>

          </div>

          <div style={cardStyle("#fdf2f8")}>

            <p style={titleStyle}>
              Highest Delay Shop
            </p>

            <h1 style={numberStyle("#ec4899")}>
              {topShop}
            </h1>

          </div>

          <div style={cardStyle("#fef2f2")}>

            <p style={titleStyle}>
              Critical Units
            </p>

            <h1 style={numberStyle("#dc2626")}>
              11
            </h1>

          </div>

          <div style={cardStyle("#f0fdf4")}>

            <p style={titleStyle}>
              Operational Stability
            </p>

            <h1 style={numberStyle("#16a34a")}>
              83%
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
              Shop Delay Comparison
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <BarChart data={shopData}>

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
              Shop Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <PieChart>

                <Pie
                  data={shopData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={130}
                  innerRadius={70}
                >

                  {shopData.map((entry,index)=>(

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
              Shop Insights
            </h2>

            <InsightCard
              text="🏭 Blast furnace shop contributes highest downtime"
              bg="#eef2ff"
            />

            <InsightCard
              text="⚙ Rolling mill operations show stable performance"
              bg="#eef2ff"
            />

            <InsightCard
              text="📈 Mechanical workshops require higher maintenance attention"
              bg="#eef2ff"
            />

          </div>

          <div style={graphBox}>

            <h2 style={graphTitle}>
              Recommendations
            </h2>

            <InsightCard
              text="✓ Improve inter-department coordination"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Deploy predictive maintenance systems"
              bg="#f0fdf4"
            />

            <InsightCard
              text="✓ Optimize manpower allocation"
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

export default ShopAnalytics;