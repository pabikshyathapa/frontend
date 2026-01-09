import React, { useState } from "react";
import AuthModal from "../components/auth/authmodal";
import ChatbotPage from "../components/chatbot"; // Your chatbot component

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenModal = () => setModalOpen(true);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      {!user ? (
        // Homepage before login
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            Welcome to PCOS Awareness Assistant
          </h1>
          <button
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold"
            onClick={handleOpenModal}
          >
            Login / Register
          </button>
        </div>
      ) : (
        // Chatbot page after login
        <ChatbotPage user={user} />
      )}

      {/* Login/Register Modal */}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        setUser={setUser} // This sets the user and automatically switches to chatbot
      />
    </div>
  );
}

export default App;
