import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Lock, X } from 'lucide-react'; // Added icons for visual appeal

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5050/api/auth/login", {
          email: values.email,
          password: values.password,
        });

        if (response.data.success) {
          const userData = response.data.data;
          console.log("User Data:", userData);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("userId", userData._id);

          toast.success("Login successful!", { position: "top-center" });

          setTimeout(() => {
            if (userData.role === "admin") {
              navigate("/admins/categoryy");
            } else {
              navigate("/dashboard");
            }
          }, 800);
        } else {
          setLoginError("Invalid email or password.");
        }
      } catch (err) {
        console.error("Login error:", err);
        setLoginError("Invalid email or password.");
      }
    },
  });

  return (
    // Modal Overlay (full screen, darkened background)
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <ToastContainer />
      
      {/* Modal Content Box (The Pop-up Form) */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 relative">
        
        {/* Close Button (Optional: to mimic a close function in a real modal) */}
        {/* <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => navigate('/')} // Example: navigate to home or close
        >
          <X size={24} />
        </button> */}

        <h2 className="text-xl font-bold text-gray-800 mb-1 text-purple-700">Welcome</h2>
        <p className="text-sm text-gray-500 mb-6">Access your personalized PCOS health journey</p>

        {/* Login/Register Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <div className="flex-1 text-center py-2 px-4 rounded-lg bg-white shadow-sm text-purple-700 font-semibold cursor-pointer">
            Login
          </div>
          <div 
            className="flex-1 text-center py-2 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer"
            onClick={() => navigate('/register')} // Navigate to register page
          >
            Register
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="your.email@example.com"
                className="w-full border-0 rounded-lg pl-10 pr-4 py-3 bg-gray-100 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="••••••••"
                className="w-full border-0 rounded-lg pl-10 pr-4 py-3 bg-gray-100 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-left pt-1">
            <a href="/forgot-password" className="text-sm font-medium text-purple-700 hover:text-purple-500">
              Forgot password?
            </a>
          </div>

          {/* Login error message */}
          {loginError && (
            <p className="text-sm text-red-500 text-center">{loginError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Don't have an account? Register now */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don't have an account? <a 
            href="/register" 
            className="text-purple-700 font-semibold hover:text-purple-500"
            onClick={(e) => { e.preventDefault(); navigate('/register'); }}
          >
            Register now
          </a>
        </p>
        
        {/* Terms and Privacy */}
        <p className="text-xs text-center text-gray-400 mt-6 pt-4 border-t border-gray-100">
          By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
        </p>

      </div>
    </div>
  );
}