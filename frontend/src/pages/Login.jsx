import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
  "user",
  JSON.stringify(
    res.data.user
  )
);

      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl w-96"
      >
        <h1 className="text-3xl font-bold mb-6">
          HireSmart AI
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-800"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-slate-800"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 p-3 rounded">
          Login
        </button>

        <p className="mt-4">
          New User?
          <Link
            to="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;