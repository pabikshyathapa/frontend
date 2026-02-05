import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { User, Bot, Send, Sparkles, MessageSquare, Trash2 } from "lucide-react";
import Sidebar from "../components/siderbar";

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am your **PCOS Awareness Assistant**. I'm here to provide information about symptoms, lifestyle adjustments, and management.\n\nYou can also ask me to check your PCOS risk.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [collectingInputs, setCollectingInputs] = useState(false);
  const [pcosInputs, setPcosInputs] = useState({
    Age: "",
    BMI: "Normal",
    Menstrual_Regularity: "Regular",
    Hirsutism: "No",
    Acne_Severity: "None",
    Family_History_of_PCOS: "No",
  });

  const scrollRef = useRef(null);
  const token = localStorage.getItem("token");

  const quickQuestions = [
    "Check my PCOS risk",
    "What are common PCOS symptoms?",
    "Best diet for PCOS?",
    "PCOS and Insulin Resistance",
  ];

  // Load chat history from backend
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const loadChatHistory = async () => {
    try {
      const { data } = await axios.get("http://localhost:5050/api/chatbot/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.messages && data.messages.length > 0) {
        setMessages([messages[0], ...data.messages]);
      }
    } catch (err) {
      console.log("No previous chat history or error loading:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const clearChatHistory = async () => {
    try {
      await axios.delete("http://localhost:5050/api/chatbot/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages([messages[0]]);
    } catch (err) {
      console.error("Error clearing chat history:", err);
    }
  };

  // Handle sending messages
  const handleSendMessage = async (userText, inputs = null) => {
    const messageToSend = userText || input;

    if (!messageToSend.trim() && !inputs) return;

    // Add user message to chat
    if (!inputs) {
      setMessages((prev) => [...prev, { role: "user", content: messageToSend }]);
    }
    setInput("");
    setLoading(true);

    try {
      // If user wants PCOS risk
      if (messageToSend.toLowerCase().includes("check my pcos risk") && !inputs) {
        setCollectingInputs(true);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sure! Let's check your PCOS risk. Please provide the following information:" },
        ]);
        setLoading(false);
        return;
      }

      // If PCOS inputs provided, send to backend
      const { data } = await axios.post(
        "http://localhost:5050/api/chatbot/chat",
        {
          message: messageToSend,
          inputs: inputs,
          history: messages.filter(
            (msg) => msg.role !== "assistant" || msg.content !== messages[0].content
          ),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      // Reset PCOS form
      if (inputs) {
        setCollectingInputs(false);
        setPcosInputs({
          Age: "",
          BMI: "Normal",
          Menstrual_Regularity: "Regular",
          Hirsutism: "No",
          Acne_Severity: "None",
          Family_History_of_PCOS: "No",
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Connection error. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingHistory) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col relative h-full">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-10 flex justify-between items-center px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Bot size={28} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-800 tracking-tight">PCOS Assistant</h1>
              <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">
                <Sparkles size={12} /> Specialized PCOS Guidance
              </span>
            </div>
          </div>
          <button
            onClick={clearChatHistory}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Clear chat history"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-4 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    m.role === "user" ? "bg-purple-600" : "bg-white border border-slate-200"
                  }`}
                >
                  {m.role === "user" ? <User size={20} color="white" /> : <Bot size={20} className="text-purple-600" />}
                </div>
                <div
                  className={`px-5 py-4 rounded-3xl shadow-sm ${
                    m.role === "user"
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                  }`}
                >
                  <div className={`prose prose-sm max-w-none ${m.role === "user" ? "prose-invert" : "prose-slate"}`}>
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-3 mt-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-2 mt-3" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2 mt-2" {...props} />,
                        hr: ({node, ...props}) => <hr className="my-4 border-slate-200" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-purple-700" {...props} />,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Questions */}
          {!loading && messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-sm font-medium transition-all transform hover:-translate-y-1 active:scale-95 shadow-sm"
                >
                  <MessageSquare size={14} />
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Collect PCOS Inputs */}
          {collectingInputs && (
            <div className="flex flex-col gap-4 max-w-md mx-auto mt-4 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-purple-700 mb-2">PCOS Risk Assessment</h3>
              
              {/* Age */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Age</label>
                <input
                  type="number"
                  value={pcosInputs.Age}
                  onChange={(e) => setPcosInputs({ ...pcosInputs, Age: e.target.value })}
                  className="border border-slate-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Enter your age"
                  min="15"
                  max="50"
                />
              </div>

              {/* BMI */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">BMI Category</label>
                <select
                  value={pcosInputs.BMI}
                  onChange={(e) => setPcosInputs({ ...pcosInputs, BMI: e.target.value })}
                  className="border border-slate-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="Underweight">Underweight</option>
                  <option value="Normal">Normal</option>
                  <option value="Overweight">Overweight</option>
                  <option value="Obese">Obese</option>
                </select>
              </div>

              {/* Menstrual Regularity */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Menstrual Regularity</label>
                <select
                  value={pcosInputs.Menstrual_Regularity}
                  onChange={(e) => setPcosInputs({ ...pcosInputs, Menstrual_Regularity: e.target.value })}
                  className="border border-slate-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>

              {/* Hirsutism */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Hirsutism (Excess Hair Growth)</label>
                <select
                  value={pcosInputs.Hirsutism}
                  onChange={(e) => setPcosInputs({ ...pcosInputs, Hirsutism: e.target.value })}
                  className="border border-slate-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* Acne Severity */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Acne Severity</label>
                <select
                  value={pcosInputs.Acne_Severity}
                  onChange={(e) => setPcosInputs({ ...pcosInputs, Acne_Severity: e.target.value })}
                  className="border border-slate-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="None">None</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>

              {/* Family History */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Family History of PCOS</label>
                <select
                  value={pcosInputs.Family_History_of_PCOS}
                  onChange={(e) => setPcosInputs({ ...pcosInputs, Family_History_of_PCOS: e.target.value })}
                  className="border border-slate-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <button
                onClick={() => {
                  if (!pcosInputs.Age || pcosInputs.Age < 15 || pcosInputs.Age > 50) {
                    alert("Please enter a valid age between 15 and 50.");
                    return;
                  }
                  handleSendMessage("Check my PCOS risk", pcosInputs);
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-2 hover:bg-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Submit Assessment
              </button>
            </div>
          )}

          {loading && (
            <div className="flex justify-start items-center gap-3 animate-pulse">
              <div className="bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm text-sm text-purple-400 font-medium">
                Assistant is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        {!collectingInputs && (
          <div className="p-6 bg-white border-t border-slate-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-3 max-w-4xl mx-auto bg-slate-100 border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 ring-purple-500/20 transition-all focus-within:bg-white focus-within:shadow-lg"
            >
              <input
                className="flex-1 bg-transparent outline-none text-slate-700 px-4 py-2"
                placeholder="Ask about symptoms, diet, or management..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-all shadow-md disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </form>
            <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-[0.2em] mt-4">
              Educational Tool Only • Not a medical diagnosis
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatbotPage;