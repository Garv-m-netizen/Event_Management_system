import { Navigate } from "react-router-dom";

function RoleRoute({ role, children }) {
  const storedRole = localStorage.getItem("role");

  if (!storedRole || storedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleRoute;
