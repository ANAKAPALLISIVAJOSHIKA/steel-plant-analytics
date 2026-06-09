import DashboardLayout from "../components/DashboardLayout";

import KpiCard from "../components/KpiCard";

function Dashboard() {

  return (

    <DashboardLayout>

      <div>

        <h1 style={{
          fontSize:"48px",
          marginBottom:"10px"
        }}>
          Welcome back, Admin 👋
        </h1>

        <p style={{
          color:"#6b7280",
          fontSize:"18px",
          marginBottom:"40px"
        }}>
          Here's what's happening in your plant today.
        </p>

      </div>

      <div style={{
        display:"flex",
        gap:"25px",
        flexWrap:"wrap"
      }}>

        <KpiCard
          title="Total Delays"
          value="248"
          bgColor="#ede9fe"
          valueColor="#7c3aed"
        />

        <KpiCard
          title="Critical Equipment"
          value="42"
          bgColor="#ffedd5"
          valueColor="#f97316"
        />

        <KpiCard
          title="Shutdown Delays"
          value="18"
          bgColor="#ffe4e6"
          valueColor="#e11d48"
        />

        <KpiCard
          title="Monsoon Alerts"
          value="12"
          bgColor="#dcfce7"
          valueColor="#22c55e"
        />

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;