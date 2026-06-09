import React from "react";

import {
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "department"
    );

    navigate("/");

  };

  return (

    <div style={{

      display:"flex",

      justifyContent:"space-between",

      alignItems:"center",

      marginBottom:"30px",

      background:"#ffffff",

      padding:"20px 25px",

      borderRadius:"24px",

      boxShadow:"0 4px 20px rgba(0,0,0,0.04)"

    }}>

      {/* TITLE */}

      <div>

        <h2 style={{
          color:"#111827",
          fontSize:"30px",
          fontWeight:"700",
          marginBottom:"4px"
        }}>
          Steel Plant Analytics Dashboard
        </h2>

        <p style={{
          color:"#6b7280",
          fontSize:"15px"
        }}>
          Real-time industrial monitoring system
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div style={{
        display:"flex",
        alignItems:"center",
        gap:"18px"
      }}>

        {/* USER */}

        <div style={{
          background:"#eff6ff",
          color:"#2563eb",
          padding:"12px 18px",
          borderRadius:"16px",
          fontWeight:"600"
        }}>

          {
            localStorage.getItem(
              "department"
            )
          }

        </div>

        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          style={{

            background:"#2563eb",

            color:"#ffffff",

            border:"none",

            padding:"14px 20px",

            borderRadius:"16px",

            cursor:"pointer",

            display:"flex",

            alignItems:"center",

            gap:"10px",

            fontWeight:"600",

            fontSize:"15px"

          }}

        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

}

export default Topbar;