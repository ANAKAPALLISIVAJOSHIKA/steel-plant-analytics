import React from "react";

import DashboardLayout from "../components/DashboardLayout";

function Users() {

  const users = [

    {
      department:"Mechanical Maintenance",
      role:"Senior Engineer",
      status:"Active"
    },

    {
      department:"Electrical Maintenance",
      role:"Supervisor",
      status:"Active"
    },

    {
      department:"Chemical Laboratory",
      role:"Quality Analyst",
      status:"Active"
    },

    {
      department:"Blast Furnace",
      role:"Operations Manager",
      status:"Active"
    },

    {
      department:"Steel Melt Shop",
      role:"Control Engineer",
      status:"Active"
    },

    {
      department:"Rolling Mill",
      role:"Production Officer",
      status:"Active"
    },

    {
      department:"Power Plant",
      role:"Maintenance Head",
      status:"Active"
    },

    {
      department:"Conveyor Operations",
      role:"Shift Incharge",
      status:"Active"
    }

  ];

  return (

    <DashboardLayout>

      <div style={{
        padding:"30px"
      }}>

        <h1 style={{
          fontSize:"48px",
          marginBottom:"10px",
          color:"#0f172a"
        }}>
          Users Management
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"30px"
        }}>
          Authorized steel plant department access management
        </p>

        <div style={{
          background:"#ffffff",
          padding:"30px",
          borderRadius:"28px",
          boxShadow:"0 4px 20px rgba(0,0,0,0.04)"
        }}>

          <table style={{
            width:"100%",
            borderCollapse:"collapse"
          }}>

            <thead>

              <tr>

                <th style={thStyle}>
                  Department
                </th>

                <th style={thStyle}>
                  Role
                </th>

                <th style={thStyle}>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user,index)=>(

                <tr key={index}>

                  <td style={tdStyle}>
                    {user.department}
                  </td>

                  <td style={tdStyle}>
                    {user.role}
                  </td>

                  <td style={tdStyle}>

                    <span style={{

                      background:"#dcfce7",

                      color:"#166534",

                      padding:"8px 14px",

                      borderRadius:"999px",

                      fontSize:"14px",

                      fontWeight:"600"

                    }}>

                      {user.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );

}

const thStyle = {

  textAlign:"left",

  padding:"18px",

  borderBottom:"1px solid #e5e7eb",

  color:"#374151",

  fontSize:"16px"

};

const tdStyle = {

  padding:"18px",

  borderBottom:"1px solid #f3f4f6",

  color:"#111827"

};

export default Users;