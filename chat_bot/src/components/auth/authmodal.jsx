// AuthModal.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AuthModal({ isOpen, onClose, setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isRegister
        ? "http://localhost:5050/api/auth/register"
        : "http://localhost:5050/api/auth/login";
      const payload = isRegister
        ? formData
        : { email: formData.email, password: formData.password };
      const res = await axios.post(url, payload);
      
      if (res.data.success) {
        alert(res.data.message);
        if (!isRegister) {
          setUser(res.data.data);
          localStorage.setItem("token", res.data.token);
        }
        onClose();
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="space-y-3" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full font-semibold transition"
          >
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-3 text-sm text-gray-600 text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-purple-600 hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
