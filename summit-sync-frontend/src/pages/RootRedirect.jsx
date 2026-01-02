import { Navigate } from "react-router-dom";

function RootRedirect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "startup") {
    return <Navigate to="/startup" replace />;
  }

  if (role === "investor") {
    return <Navigate to="/investor" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default RootRedirect;
