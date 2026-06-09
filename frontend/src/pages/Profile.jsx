import DashboardLayout from "../components/DashboardLayout";

import {
  FaUserCircle,
  FaChartLine,
  FaBell,
  FaClipboardList,
  FaClock
} from "react-icons/fa";

function Profile() {

  return (

    <DashboardLayout>

      <h1 style={{
        fontSize:"42px",
        marginBottom:"10px",
        color:"#111827"
      }}>
        My Profile
      </h1>

      <p style={{
        color:"#6b7280",
        marginBottom:"35px",
        fontSize:"17px"
      }}>
        Manage your profile, activities and analytics access.
      </p>

      {/* PROFILE TOP */}

      <div style={{
        display:"grid",
        gridTemplateColumns:"1.2fr 2fr",
        gap:"25px",
        marginBottom:"35px"
      }}>

        {/* LEFT PROFILE CARD */}

        <div style={profileCard}>

          <FaUserCircle
            size={110}
            color="#ec4899"
          />

          <h2 style={{
            marginTop:"20px",
            fontSize:"30px",
            color:"#111827"
          }}>
            Charisma
          </h2>

          <p style={{
            color:"#6b7280",
            marginTop:"5px"
          }}>
            System Administrator
          </p>

          <div style={{
            marginTop:"25px",
            width:"100%"
          }}>

            <InfoRow
              label="Department"
              value="Steel Plant Operations"
            />

            <InfoRow
              label="Employee ID"
              value="VSP1024"
            />

            <InfoRow
              label="Access Level"
              value="Admin"
            />

            <InfoRow
              label="Location"
              value="Vizag Steel Plant"
            />

          </div>

        </div>

        {/* RIGHT STATS */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(2,1fr)",
          gap:"20px"
        }}>

          <StatCard
            icon={<FaChartLine />}
            title="Analytics Viewed"
            value="148"
            bg="#fdf2f8"
            iconBg="#fbcfe8"
          />

          <StatCard
            icon={<FaBell />}
            title="Alerts Managed"
            value="36"
            bg="#eff6ff"
            iconBg="#bfdbfe"
          />

          <StatCard
            icon={<FaClipboardList />}
            title="Reports Generated"
            value="82"
            bg="#f0fdf4"
            iconBg="#bbf7d0"
          />

          <StatCard
            icon={<FaClock />}
            title="Hours Active"
            value="214"
            bg="#fefce8"
            iconBg="#fde68a"
          />

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div style={activityBox}>

        <h2 style={{
          marginBottom:"25px",
          color:"#111827"
        }}>
          Recent Activity
        </h2>

        <ActivityItem
          title="Viewed Equipment Analytics"
          time="2 mins ago"
        />

        <ActivityItem
          title="Generated Delay Report"
          time="15 mins ago"
        />

        <ActivityItem
          title="Monitored Conveyor Prediction"
          time="1 hour ago"
        />

        <ActivityItem
          title="Updated User Permissions"
          time="Today 9:30 AM"
        />

      </div>

    </DashboardLayout>

  );
}

function InfoRow({ label,value }) {

  return (

    <div style={{
      marginBottom:"18px"
    }}>

      <p style={{
        color:"#9ca3af",
        fontSize:"14px"
      }}>
        {label}
      </p>

      <h3 style={{
        color:"#111827",
        marginTop:"4px"
      }}>
        {value}
      </h3>

    </div>

  );
}

function StatCard({
  icon,
  title,
  value,
  bg,
  iconBg
}) {

  return (

    <div style={{
      background:bg,
      borderRadius:"26px",
      padding:"28px"
    }}>

      <div style={{
        width:"60px",
        height:"60px",
        borderRadius:"18px",
        background:iconBg,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"24px",
        marginBottom:"20px"
      }}>

        {icon}

      </div>

      <p style={{
        color:"#6b7280",
        marginBottom:"10px"
      }}>
        {title}
      </p>

      <h1 style={{
        fontSize:"38px",
        color:"#111827"
      }}>
        {value}
      </h1>

    </div>

  );
}

function ActivityItem({ title,time }) {

  return (

    <div style={{
      background:"#f9fafb",
      padding:"18px",
      borderRadius:"18px",
      marginBottom:"15px"
    }}>

      <h3 style={{
        color:"#111827",
        marginBottom:"6px"
      }}>
        {title}
      </h3>

      <p style={{
        color:"#6b7280",
        fontSize:"14px"
      }}>
        {time}
      </p>

    </div>

  );
}

const profileCard = {

  background:"#ffffff",

  borderRadius:"30px",

  padding:"35px",

  boxShadow:"0 4px 20px rgba(0,0,0,0.04)",

  display:"flex",

  flexDirection:"column",

  alignItems:"center"

};

const activityBox = {

  background:"#ffffff",

  borderRadius:"30px",

  padding:"30px",

  boxShadow:"0 4px 20px rgba(0,0,0,0.04)"

};

export default Profile;