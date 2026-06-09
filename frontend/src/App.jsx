import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import ShopAnalytics from "./pages/ShopAnalytics";

import EquipmentAnalytics from "./pages/EquipmentAnalytics";

import AgencyAnalytics from "./pages/AgencyAnalytics";

import ConveyorAnalytics from "./pages/ConveyorAnalytics";

import SeasonalAnalytics from "./pages/SeasonalAnalytics";

import DurationAnalytics from "./pages/DurationAnalytics";

import DelayDescriptionAnalytics from "./pages/DelayDescriptionAnalytics";

import Prediction from "./pages/Prediction";

import DelayEntry from "./pages/DelayEntry";

import Users from "./pages/Users";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* SHOP ANALYTICS */}

        <Route
          path="/shop-analytics"
          element={
            <ProtectedRoute>
              <ShopAnalytics />
            </ProtectedRoute>
          }
        />

        {/* EQUIPMENT ANALYTICS */}

        <Route
          path="/equipment-analytics"
          element={
            <ProtectedRoute>
              <EquipmentAnalytics />
            </ProtectedRoute>
          }
        />

        {/* AGENCY ANALYTICS */}

        <Route
          path="/agency-analytics"
          element={
            <ProtectedRoute>
              <AgencyAnalytics />
            </ProtectedRoute>
          }
        />

        {/* CONVEYOR ANALYTICS */}

        <Route
          path="/conveyor-analytics"
          element={
            <ProtectedRoute>
              <ConveyorAnalytics />
            </ProtectedRoute>
          }
        />

        {/* SEASONAL ANALYTICS */}

        <Route
          path="/seasonal-analytics"
          element={
            <ProtectedRoute>
              <SeasonalAnalytics />
            </ProtectedRoute>
          }
        />

        {/* DURATION ANALYTICS */}

        <Route
          path="/duration-analytics"
          element={
            <ProtectedRoute>
              <DurationAnalytics />
            </ProtectedRoute>
          }
        />

        {/* DELAY DESCRIPTION */}

        <Route
          path="/delay-description-analytics"
          element={
            <ProtectedRoute>
              <DelayDescriptionAnalytics />
            </ProtectedRoute>
          }
        />

        {/* PREDICTION */}

        <Route
          path="/prediction"
          element={
            <ProtectedRoute>
              <Prediction />
            </ProtectedRoute>
          }
        />

        {/* DELAY ENTRY */}

        <Route
          path="/delay-entry"
          element={
            <ProtectedRoute>
              <DelayEntry />
            </ProtectedRoute>
          }
        />

        {/* USERS */}

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;