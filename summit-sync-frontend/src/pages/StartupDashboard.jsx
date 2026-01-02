import { useNavigate } from "react-router-dom";

function StartupDashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl font-bold">Startup Dashboard</h1>
      <p>You will create & manage events here.</p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default StartupDashboard;
