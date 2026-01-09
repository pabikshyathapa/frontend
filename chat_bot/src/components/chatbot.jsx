
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/chat/history");
      setChatHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message to chat locally
    const userMessage = message;
    setChatHistory((prev) => [...prev, { userMessage, botReply: "..." }]);
    setMessage("");
    setLoading(true);

    try {
      // Send message to backend
      const res = await axios.post("http://localhost:5050/api/chat/ask", { userMessage });

      // Update chat with bot reply
      setChatHistory((prev) => [...prev.slice(0, -1), res.data]); // replace the "..." with actual bot reply
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { userMessage, botReply: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    style={{
      width: "1500px",
      height: "90vh", // increase the total container height
      margin: "20px auto",
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f7f5fb",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    }}
  >
    {/* Header */}
    <h2
      style={{
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#6b21a8",
        padding: "10px 20px",
        border: "2px solid #7c3aed",
        borderRadius: "12px",
        display: "inline-block",
        alignSelf: "center",
      }}
    >
      PCOS Chatbot
    </h2>

    {/* Chat history */}
    <div
      style={{
        flex: 1,
        height: "calc(100% - 120px)", // flexible height for chat area
        overflowY: "scroll",
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {chatHistory.map((chat, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {/* Bot message on left */}
          {chat.botReply && (
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "60%",
                backgroundColor: "#e5e7eb",
                padding: "12px 16px",
                borderRadius: "16px 16px 16px 0px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <b>Bot:</b> {chat.botReply}
            </div>
          )}

          {/* User message on right */}
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "60%",
              backgroundColor: "#7c3aed",
              color: "white",
              padding: "12px 16px",
              borderRadius: "16px 16px 0px 16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <b>You:</b> {chat.userMessage}
          </div>
        </div>
      ))}

      {loading && (
        <div
          style={{
            alignSelf: "flex-start",
            maxWidth: "60%",
            backgroundColor: "#e5e7eb",
            padding: "12px 16px",
            borderRadius: "16px 16px 16px 0px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            fontStyle: "italic",
          }}
        >
          Bot is typing...
        </div>
      )}
    </div>

    {/* Input */}
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: "14px",
          borderRadius: "24px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          outline: "none",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "14px 24px",
          backgroundColor: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "24px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6b21a8")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
      >
        Send
      </button>
    </div>
  </div>
);
}

