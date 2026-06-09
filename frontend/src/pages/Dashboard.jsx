import { useEffect, useState } from "react";

import axios from "axios";

import { saveAs } from "file-saver";

import DashboardLayout from "../components/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
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

function Dashboard() {

  const [allData, setAllData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const [departments, setDepartments] = useState([]);

  const [totalDelays, setTotalDelays] = useState(0);

  const [monthlyData, setMonthlyData] = useState([]);

  const [shopData, setShopData] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchDelayData();

  }, []);

  useEffect(() => {

    filterDashboard();

  }, [selectedDepartment, allData, search]);

  const fetchDelayData = async () => {

    try {

      const response = await axios.get(
        "https://steel-plant-analytics.onrender.com/api/delays"
      );

      const data = response.data || [];

      setAllData(data);

      const uniqueDepartments = [

        "All",

        ...new Set(
          data.map((item) =>
            item.department || "Unknown"
          )
        )

      ];

      setDepartments(uniqueDepartments);

    } catch (error) {

      console.log(error);

    }

  };

  const filterDashboard = () => {

    let data = [...allData];

    /* DEPARTMENT FILTER */

    if(selectedDepartment !== "All") {

      data = data.filter(
        (item) =>
          item.department === selectedDepartment
      );

    }

    /* SEARCH FILTER */

    if(search.trim() !== "") {

      const searchText =
        search.toLowerCase();

      data = data.filter((item) => {

        return (

          (item.department || "")
          .toLowerCase()
          .includes(searchText)

          ||

          (item.delayType || "")
          .toLowerCase()
          .includes(searchText)

          ||

          (item.delayDescription || "")
          .toLowerCase()
          .includes(searchText)

          ||

          (item.agency || "")
          .toLowerCase()
          .includes(searchText)

          ||

          (item.shift || "")
          .toLowerCase()
          .includes(searchText)

        );

      });

    }

    setFilteredData(data);

    setTotalDelays(data.length);

    processMonthlyData(data);

    processShopData(data);

  };

  const exportCSV = () => {

    let csv =
      "Date,Department,Delay Type,Description,Duration,Agency,Shift\n";

    filteredData.forEach((item) => {

      csv +=
        `${item.date || ""},` +

        `${item.department || ""},` +

        `${item.delayType || ""},` +

        `${item.delayDescription || ""},` +

        `${item.duration || ""},` +

        `${item.agency || ""},` +

        `${item.shift || ""}\n`;

    });

    const blob = new Blob(

      [csv],

      {
        type:"text/csv;charset=utf-8;"
      }

    );

    saveAs(
      blob,
      "steelplant_report.csv"
    );

  };

  function processMonthlyData(data) {

    const monthlyMap = {};

    data.forEach((item) => {

      const month =
        item.date || "Unknown";

      monthlyMap[month] =
        (monthlyMap[month] || 0) + 1;

    });

    const formatted = Object.keys(monthlyMap).map((key) => ({

      name: key,

      delays: monthlyMap[key]

    }));

    setMonthlyData(formatted);

  }

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

    setShopData(formatted.slice(0,6));

  }

  return (

    <DashboardLayout>

      <div>

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:"25px",
          flexWrap:"wrap",
          gap:"15px"
        }}>

          <div>

            <h1 style={{
              fontSize: "42px",
              color: "#111827",
              marginBottom: "10px"
            }}>
              Welcome back 👋
            </h1>

            <p style={{
              color: "#6b7280"
            }}>
              Real-time steel plant analytics dashboard
            </p>

          </div>

          {/* FILTER SECTION */}

          <div style={{
            display:"flex",
            gap:"15px",
            alignItems:"center",
            flexWrap:"wrap"
          }}>

            {/* SEARCH */}

            <input

              type="text"

              placeholder="Search department or delay..."

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

              style={{

                padding:"14px",

                borderRadius:"14px",

                border:"1px solid #d1d5db",

                width:"260px",

                fontSize:"15px",

                background:"#ffffff"

              }}

            />

            {/* DEPARTMENT FILTER */}

            <select

              value={selectedDepartment}

              onChange={(e)=>
                setSelectedDepartment(
                  e.target.value
                )
              }

              style={{

                padding:"14px",

                borderRadius:"14px",

                border:"1px solid #d1d5db",

                fontSize:"15px",

                background:"#ffffff"

              }}

            >

              {departments.map((dept,index)=>(

                <option
                  key={index}
                  value={dept}
                >
                  {dept}
                </option>

              ))}

            </select>

            {/* EXPORT */}

            <button

              onClick={exportCSV}

              style={{

                background:"#2563eb",

                color:"#ffffff",

                border:"none",

                padding:"14px 20px",

                borderRadius:"14px",

                cursor:"pointer",

                fontWeight:"600"

              }}

            >

              Export CSV

            </button>

          </div>

        </div>

      </div>

      {/* SEARCH RESULT */}

      {search !== "" && (

        <div style={{
          marginBottom:"20px",
          background:"#dbeafe",
          padding:"16px",
          borderRadius:"14px",
          color:"#1e3a8a",
          fontWeight:"600"
        }}>

          Showing results for:
          "{search}"

          ({filteredData.length} records found)

        </div>

      )}

      {/* KPI */}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
        gap:"20px",
        marginBottom:"35px"
      }}>

        <KpiCard
          title="Total Delays"
          value={totalDelays}
          bg="#eff6ff"
          color="#2563eb"
        />

        <KpiCard
          title="Critical Equipment"
          value="42"
          bg="#eef2ff"
          color="#7c3aed"
        />

        <KpiCard
          title="Monsoon Alerts"
          value="12"
          bg="#f0fdf4"
          color="#16a34a"
        />

        <KpiCard
          title="High Risk Units"
          value="9"
          bg="#fef3c7"
          color="#d97706"
        />

      </div>

      {/* CHARTS */}

      <div style={{
        display:"grid",
        gridTemplateColumns:"1.5fr 1fr",
        gap:"25px",
        marginBottom:"40px"
      }}>

        <div style={graphBox}>

          <h2 style={graphTitle}>
            Monthly Delay Trend
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="delays"
                fill="#60a5fa"
                radius={[10,10,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div style={graphBox}>

          <h2 style={graphTitle}>
            Shop Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <PieChart>

              <Pie
                data={shopData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={60}
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

    </DashboardLayout>

  );

}

function KpiCard({ title, value, bg, color }) {

  return (

    <div style={{
      background:bg,
      padding:"25px",
      borderRadius:"24px",
      boxShadow:"0 4px 20px rgba(0,0,0,0.04)"
    }}>

      <p style={{
        color:"#6b7280",
        marginBottom:"10px"
      }}>
        {title}
      </p>

      <h1 style={{
        color:color,
        fontSize:"38px"
      }}>
        {value}
      </h1>

    </div>

  );

}

const graphBox = {

  background:"#ffffff",

  borderRadius:"28px",

  padding:"25px",

  boxShadow:"0 4px 20px rgba(0,0,0,0.04)"

};

const graphTitle = {

  marginBottom:"20px",

  color:"#111827"

};

export default Dashboard;