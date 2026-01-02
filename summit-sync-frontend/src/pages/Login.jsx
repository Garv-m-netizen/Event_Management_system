import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://symmetrical-funicular-pjpvrjpxxrrqfqg7-8000.app.github.dev/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );


const data = await response.json();

if (!response.ok) {
  setError(data.detail || "Login failed");
  return;
}

      const decoded = jwtDecode(data.access_token);
      console.log("DECODED JWT:", decoded);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", decoded.role);

      if (decoded.role === "startup") {
        navigate("/startup");
      } else if (decoded.role === "investor") {
        navigate("/investor");
      }
      navigate("/redirect");
      
      console.log("LOGIN RESPONSE:", data);
      alert("Login successful");  

    } catch (err) {
      console.error(err);
      setError("Backend not reachable");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded transition"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;
