
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../components/auth/authmodal"; 

export default function Homepage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null); // track logged-in user
  const navigate = useNavigate();

  // Check for user info on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Callback for successful login
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setModalOpen(false);
    navigate("/dashboard"); // redirect after login
  };
return (
  <div className="bg-[#f7f5fb] min-h-screen flex flex-col items-center py-12 px-4 relative">
    {/* Top Right Buttons */}
    <div className="absolute top-4 right-4 flex gap-2">
      {user ? (
        <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-semibold">
          Welcome, {user.name}
        </div>
      ) : (
        <button
          className="bg-white border border-purple-500 text-purple-500 px-4 py-2 rounded-full font-semibold hover:bg-purple-50 transition"
          onClick={() => setModalOpen(true)}
        >
          Login / Register
        </button>
      )}
      <Link to="/guestmode">
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-semibold transition">
          Guest Mode
        </button>
      </Link>
    </div>

    {/* Header Section */}
    <div className="text-center max-w-2xl mb-12">
      <span className="text-purple-400 font-semibold text-sm mb-2 inline-block">
        ♡ PCOS Awareness & Support
      </span>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Understanding PCOS Together
      </h1>
      <p className="text-gray-600 mb-6">
        A compassionate assistant designed to help young women recognize early signs of Polycystic Ovary Syndrome and provide educational support for better health outcomes.
      </p>

      <button
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold transition"
        onClick={() => setModalOpen(true)}
      >
        Start Your Assessment
      </button>
    </div>

    {/* Info Cards */}
    <div className="flex flex-col md:flex-row gap-6 mb-12">
      <div className="bg-white shadow-md rounded-xl p-6 flex-1 text-center">
        <div className="text-purple-400 text-2xl mb-2">🛡️</div>
        <h3 className="font-semibold mb-2">Confidential & Safe</h3>
        <p className="text-gray-600 text-sm">
          Your responses are private and used only to provide personalized information about PCOS.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6 flex-1 text-center">
        <div className="text-pink-400 text-2xl mb-2">❤️</div>
        <h3 className="font-semibold mb-2">Evidence-Based</h3>
        <p className="text-gray-600 text-sm">
          Information based on current medical research and clinical guidelines for PCOS identification.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6 flex-1 text-center">
        <div className="text-blue-400 text-2xl mb-2">👥</div>
        <h3 className="font-semibold mb-2">Supportive Community</h3>
        <p className="text-gray-600 text-sm">
          Join millions of women learning about PCOS and taking control of their reproductive health.
        </p>
      </div>
    </div>
    <div className="flex flex-col items-center mt-2 text-center">
  <button
    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition"
    onClick={() => setModalOpen(true)}
  >
    Track Your Cycle
  </button>
  <p className="mt-3 mb-10 text-gray-700 max-w-md">
    Regular tracking helps manage PCOS by identifying irregular cycles, predicting ovulation, and understanding your hormonal patterns.
  </p>
</div>



    {/* 🔥 Lifestyle Cards Section (like the image you provided) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl">

      {/* Nutrition Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/4f/77/88/4f7788ac69cf182f261c32adb3c5c8f4.jpg"
          alt="Nutrition"
          className="h-48 w-full object-cover"
        />
        <div className="p-6">
          <div className="text-green-500 text-3xl mb-3">🍏</div>
          <h3 className="text-lg font-semibold mb-3">Nutrition</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>✔ Low glycemic index foods</li>
            <li>✔ Anti-inflammatory diet</li>
            <li>✔ Balanced macronutrients</li>
            <li>✔ Regular meal timing</li>
          </ul>
        </div>
      </div>

      {/* Exercise Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/87/57/03/875703251a93a8e1f45c53acef2404b6.jpg"
          alt="Exercise"
          className="h-48 w-full object-cover"
        />
        <div className="p-6">
          <div className="text-orange-400 text-3xl mb-3">🏋️</div>
          <h3 className="text-lg font-semibold mb-3">Exercise</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>✔ 150 min moderate activity/week</li>
            <li>✔ Strength training 2–3x/week</li>
            <li>✔ Yoga for stress reduction</li>
            <li>✔ Consistent daily movement</li>
          </ul>
        </div>
      </div>

      {/* Mental Health Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/a7/d1/92/a7d1926046d57292b1b01cd22585af52.jpg"
          alt="Mental Health"
          className="h-48 w-full object-cover"
        />
        <div className="p-6">
          <div className="text-blue-500 text-3xl mb-3">🧠</div>
          <h3 className="text-lg font-semibold mb-3">Emotional well-being</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>✔ Stress management techniques</li>
            <li>✔ Quality sleep (7–9 hours)</li>
            <li>✔ Support groups & therapy</li>
            <li>✔ Mindfulness practices</li>
          </ul>
        </div>
      </div>
    </div>

    {/* What is PCOS Section */}
    <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl w-full">
      <h2 className="text-xl font-bold mb-4">What is PCOS?</h2>
      <p className="text-gray-600 mb-6">
        Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder affecting 1 in 10 women of reproductive age. Despite its prevalence, many women remain undiagnosed for years.
      </p>

      <div className="md:flex gap-8">
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="font-semibold mb-2 text-purple-500">Common Symptoms</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            <li>Irregular or absent periods</li>
            <li>Excess hair growth</li>
            <li>Acne and oily skin</li>
            <li>Weight gain</li>
            <li>Difficulty getting pregnant</li>
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold mb-2 text-pink-400">Why Early Detection Matters</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            <li>Better symptom management</li>
            <li>Reduced long-term risks</li>
            <li>Improved fertility outcomes</li>
            <li>Enhanced quality of life</li>
          </ul>
        </div>
      </div>
    </div>

    <p className="text-gray-500 text-xs mt-6 max-w-3xl text-center">
      <strong>Important:</strong> This chatbot is for educational purposes only and does not replace professional medical advice, diagnosis, or treatment. Always consult with a healthcare provider for concerns about your health.
    </p>

    {/* Auth Modal */}
    <AuthModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      setUser={handleLoginSuccess}
    />
  </div>
);

}

