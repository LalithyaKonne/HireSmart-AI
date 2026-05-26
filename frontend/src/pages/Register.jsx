import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      "/auth/register",
      formData
    );

    console.log("Success:", res.data);

    alert("Registration Successful!");

    navigate("/");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      error.message
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl w-96"
      >
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-slate-800"
          onChange={handleChange}
        />

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

        <button className="w-full bg-green-600 p-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;