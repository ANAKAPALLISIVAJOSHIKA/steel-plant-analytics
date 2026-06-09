import React, { useState } from "react";

import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

function DelayEntry() {

  const [formData, setFormData] = useState({

    date: "",

    department: "",

    delayType: "",

    delayDescription: "",

    duration: "",

    agency: "",

    shift: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/delays",
        formData
      );

      alert("Delay Entry Added Successfully");

      setFormData({

        date: "",

        department: "",

        delayType: "",

        delayDescription: "",

        duration: "",

        agency: "",

        shift: ""

      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <DashboardLayout>

      <div style={{
        padding:"20px"
      }}>

        <h1 style={{
          fontSize:"48px",
          marginBottom:"10px",
          color:"#0f172a"
        }}>
          Delay Entry System
        </h1>

        <p style={{
          color:"#6b7280",
          marginBottom:"35px"
        }}>
          Add operational delay records dynamically
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background:"#ffffff",
            padding:"35px",
            borderRadius:"28px",
            display:"grid",
            gap:"20px"
          }}
        >

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            style={inputStyle}
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            style={inputStyle}
          />

          <input
            type="text"
            name="delayType"
            value={formData.delayType}
            onChange={handleChange}
            placeholder="Delay Type"
            style={inputStyle}
          />

          <input
            type="text"
            name="delayDescription"
            value={formData.delayDescription}
            onChange={handleChange}
            placeholder="Delay Description"
            style={inputStyle}
          />

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            style={inputStyle}
          />

          <input
            type="text"
            name="agency"
            value={formData.agency}
            onChange={handleChange}
            placeholder="Agency"
            style={inputStyle}
          />

          <input
            type="text"
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            placeholder="Shift"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              background:"#ec4899",
              color:"#ffffff",
              border:"none",
              padding:"16px",
              borderRadius:"16px",
              fontSize:"18px",
              cursor:"pointer"
            }}
          >
            Add Delay Entry
          </button>

        </form>

      </div>

    </DashboardLayout>

  );

}

const inputStyle = {

  padding:"16px",

  borderRadius:"14px",

  border:"1px solid #d1d5db",

  fontSize:"16px"

};

export default DelayEntry;