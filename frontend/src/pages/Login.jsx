import "../styles/Login.css";

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    department: "",

    password: ""

  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://steel-plant-analytics.onrender.com/api/auth/login",
        formData
      );

      if(res.data.success){

        localStorage.setItem(
          "department",
          res.data.department
        );

        navigate("/dashboard");

      }

    } catch (error) {

      setError(
        "Invalid Department or Password"
      );

    }

  };

  return (

    <div className="login-page">

      <div className="login-container">

        {/* LEFT SIDE */}

        <div className="login-left">

          <h1>
            VSP Analytics System
          </h1>

          <p>
            Intelligent monitoring and predictive analysis
            of critical equipment delays in Vizag Steel Plant.
          </p>

        </div>

        {/* LOGIN CARD */}

        <div className="login-card">

          <h2>
            Authorized Employee Login
          </h2>

          <form
            onSubmit={handleSubmit}
            autoComplete="on"
          >

            {/* DEPARTMENT */}

            <input

              type="text"

              name="department"

              placeholder="Department"

              value={formData.department}

              onChange={handleChange}

              autoComplete="username"

              required

            />

            {/* PASSWORD */}

            <input

              type="password"

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}

              autoComplete="current-password"

              required

            />

            {/* ERROR */}

            {error && (

              <p style={{
                color:"red",
                marginBottom:"10px"
              }}>
                {error}
              </p>

            )}

            {/* LOGIN BUTTON */}

            <button type="submit">

              Login

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Login;