import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length !== 0) return;

  try {
    const response = await fetch(
      "https://symmetrical-funicular-pjpvrjpxxrrqfqg7-8000.app.github.dev/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();
    console.log("Backend response:", data);
    alert("Registration successful!");
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    return newErrors;
  }

  

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
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
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
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
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Register As
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select role</option>
              <option value="startup">Startup</option>
              <option value="investor">Investor</option>
            </select>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;
