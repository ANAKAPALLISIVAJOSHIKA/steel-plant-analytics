import {
  FaChartBar,
  FaClipboardList,
  FaBrain,
  FaUsers,
  FaIndustry,
  FaClock,
  FaCloudRain,
  FaExclamationTriangle
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const isActive = (path) => {

    return location.pathname === path;

  };

  return (

    <div style={{

      width:"270px",

      background:"#ffffff",

      padding:"30px 20px",

      borderRight:"1px solid #e5e7eb",

      minHeight:"100vh"

    }}>

      {/* LOGO */}

      <div style={{
        marginBottom:"45px"
      }}>

        <h1 style={{

          color:"#2563eb",

          fontSize:"34px",

          fontWeight:"700"

        }}>
          VSP Analytics
        </h1>

        <p style={{

          color:"#6b7280",

          marginTop:"6px"

        }}>
          Smart Steel Plant Monitoring
        </p>

      </div>

      {/* MENU */}

      <div style={{

        display:"flex",

        flexDirection:"column",

        gap:"14px"

      }}>

        <SidebarItem
          to="/dashboard"
          icon={<FaChartBar />}
          text="Dashboard"
          active={isActive("/dashboard")}
        />

        <SidebarItem
          to="/shop-analytics"
          icon={<FaIndustry />}
          text="Shop Analytics"
          active={isActive("/shop-analytics")}
        />

        <SidebarItem
          to="/equipment-analytics"
          icon={<FaIndustry />}
          text="Equipment Analytics"
          active={isActive("/equipment-analytics")}
        />

        <SidebarItem
          to="/agency-analytics"
          icon={<FaUsers />}
          text="Agency Analytics"
          active={isActive("/agency-analytics")}
        />

        <SidebarItem
          to="/conveyor-analytics"
          icon={<FaIndustry />}
          text="Conveyor Analytics"
          active={isActive("/conveyor-analytics")}
        />

        <SidebarItem
          to="/seasonal-analytics"
          icon={<FaCloudRain />}
          text="Seasonal Analytics"
          active={isActive("/seasonal-analytics")}
        />

        <SidebarItem
          to="/duration-analytics"
          icon={<FaClock />}
          text="Duration Analytics"
          active={isActive("/duration-analytics")}
        />

        <SidebarItem
          to="/delay-description-analytics"
          icon={<FaExclamationTriangle />}
          text="Delay Description"
          active={isActive("/delay-description-analytics")}
        />

        <SidebarItem
          to="/prediction"
          icon={<FaBrain />}
          text="Prediction"
          active={isActive("/prediction")}
        />

        <SidebarItem
          to="/delay-entry"
          icon={<FaClipboardList />}
          text="Delay Entry"
          active={isActive("/delay-entry")}
        />

        <SidebarItem
          to="/users"
          icon={<FaUsers />}
          text="Users"
          active={isActive("/users")}
        />

      </div>

    </div>

  );

}

function SidebarItem({ to, icon, text, active }) {

  return (

    <Link
      to={to}
      style={{
        textDecoration:"none"
      }}
    >

      <div style={{

        display:"flex",

        alignItems:"center",

        gap:"15px",

        padding:"16px 18px",

        borderRadius:"18px",

        background: active
        ? "#dbeafe"
        : "#f9fafb",

        color: active
        ? "#1e3a8a"
        : "#374151",

        fontWeight: active
        ? "600"
        : "500",

        transition:"0.3s",

        boxShadow: active
        ? "0 4px 12px rgba(37,99,235,0.15)"
        : "none"

      }}>

        <div style={{
          fontSize:"18px"
        }}>
          {icon}
        </div>

        {text}

      </div>

    </Link>

  );

}

export default Sidebar;