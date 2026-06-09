import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const department =
    localStorage.getItem("department");

  if (!department) {

    return <Navigate to="/" />;

  }

  return children;

}

export default ProtectedRoute;