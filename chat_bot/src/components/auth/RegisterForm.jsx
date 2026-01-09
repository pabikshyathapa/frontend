import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/useRegisteruser";

export default function RegisterForm() {
  const { mutate, data, error, isLoading, isSuccess, isError } = useRegisterUser();
  const[message,setMessage]=useState("");
  const navigate=useNavigate();

  const validationSchema = Yup.object({
    // username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    name: Yup.string().required("First name is required"),
    phone: Yup.string().required("Phone number is required"),

    // lastname: Yup.string().required("Last name is required"),
  });

  const formik = useFormik({
    initialValues: {
      // username: "",
      email: "",
      password: "",
      name: "",
      phone:"",
      // lastname: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (response) => {
          setMessage(response?.message || "Registration successful!");
          formik.resetForm();
        },
        onError: (error) => {
          setMessage(error?.response?.data?.message || "Registration failed. Please try again.");
      //   },
      // });
    
  //   validationSchema,
  //   onSubmit: (values) => {
  //     const formData = {
  //       // username: values.username,
  //       name: values.name,
  //       // lastName: values.lastname,
  //       email: values.email,
  //       password: values.password,
  //     };

  //     mutate(formData, {
  //       onSuccess: () => {
  //         alert("Registration successful!");
  //         formik.resetForm();
  //       },
  //       onError: (err) => {
  //         alert("Registration failed: " + (err.message || "Unknown error"));
        },
      },
    );
    },
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="w-1/2 bg-[#e0d8cc] flex items-center justify-center">
        <img
          src="/images/register.png" // Replace with your actual image path
          alt="Jewelry model"
          className="object-contain max-h-full"
        />
      </div>

      {/* Right Side Form */}
<div className="w-1/2 flex items-center justify-center p-10">
  <div className="w-full max-w-md space-y-4">
    <h2 className="text-red-600 text-xl font-semibold text-center">Create Account</h2>
    <p className="text-center text-gray-800">Create an account for faster checkout.</p>

    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* First Name */}
      <div>
        <label className="text-red-600 block">Full Name</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Enter your name"
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-sm text-red-500">{formik.errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-red-600 block">Email Address</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter your email"
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}

      </div>
       {/* First Name */}
      <div>
        <label className="text-red-600 block">Phone Number</label>
        <input
          type="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          placeholder="Enter your phone number"
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-sm text-red-500">{formik.errors.phone}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-red-600 block">Create Password</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
          className="w-full border rounded px-4 py-2  bg-gray-100"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        )}
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        {isLoading ? "Registering..." : "Sign Up"}
      </button>
    </form>

    <div className="text-center mt-4 text-gray-800">Or</div>

    <div className="text-center">
      <span className="text-black">Don’t have an account? </span>
      <a href="/login" className="text-red-600 hover:underline">Log In</a>
    </div>

    {isSuccess && <p className="text-green-600 text-center">Successfully registered!</p>}
    {isError && <p className="text-red-600 text-center">{error.message}</p>}
  </div>
</div>
/</div>
  );
}
  