// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { User, Bot, Send, AlertCircle, Sparkles, MessageSquare } from "lucide-react";
// import Sidebar from "../components/siderbar"; 

// const ChatbotPage = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content:
//         "Hello! I am your **PCOS Awareness Assistant**. I'm here to provide information about symptoms, lifestyle adjustments, and management.\n\nChoose a topic below or type your own question.",
//     },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const scrollRef = useRef(null);

//   const token = localStorage.getItem("token");

//   // Clickable questions
//   const quickQuestions = [
//     "What are common PCOS symptoms?",
//     "Best diet for PCOS?",
//     "Explain Rotterdam Criteria",
//     "PCOS and Insulin Resistance",
//   ];

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages, loading]);

//   const handleSendMessage = async (userText) => {
//     const messageToSend = userText || input;
//     if (!messageToSend.trim() || loading) return;

//     const userMsg = { role: "user", content: messageToSend };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5050/api/chatbot/chat",
//         {
//           message: messageToSend,
//           history: messages.filter((msg) => msg.role === "user"),
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: data.reply },
//       ]);
//     } catch (error) {
//       console.error(error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: " **Connection error**. Ensure the backend is running and you are logged in.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
//       {/* 1. SIDEBAR COMPONENT */}
//       <Sidebar />

//       {/* 2. MAIN CHAT AREA */}
//       <main className="flex-1 flex flex-col relative h-full">
//         {/* Header */}
//         <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-10 flex justify-between items-center px-8 shrink-0">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
//               <Bot size={28} />
//             </div>
//             <div>
//               <h1 className="font-bold text-xl text-slate-800 tracking-tight">Gemini AI Assistant</h1>
//               <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">
//                 <Sparkles size={12} /> Specialized PCOS Guidance
//               </span>
//             </div>
//           </div>
//           <AlertCircle size={22} className="text-slate-400" />
//         </header>

//         {/* Messages Scroll Area */}
//         <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scroll-smooth">
//           {messages.map((m, i) => (
//             <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
//               <div className={`flex gap-4 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
//                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
//                   m.role === "user" ? "bg-purple-600" : "bg-white border border-slate-200"
//                 }`}>
//                   {m.role === "user" ? <User size={20} color="white" /> : <Bot size={20} className="text-purple-600" />}
//                 </div>
//                 <div className={`px-5 py-4 rounded-3xl shadow-sm ${
//                   m.role === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
//                 }`}>
//                   <div className={`prose prose-sm max-w-none ${m.role === "user" ? "prose-invert" : "prose-slate"}`}>
//                     <ReactMarkdown>{m.content}</ReactMarkdown>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Quick Suggestions Chips (Only shows if no user messages yet or as a floating footer) */}
//           {!loading && (
//             <div className="flex flex-wrap gap-2 justify-center mt-4">
//               {quickQuestions.map((q, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => handleSendMessage(q)}
//                   className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-sm font-medium transition-all transform hover:-translate-y-1 active:scale-95 shadow-sm"
//                 >
//                   <MessageSquare size={14} />
//                   {q}
//                 </button>
//               ))}
//             </div>
//           )}

//           {loading && (
//             <div className="flex justify-start items-center gap-3 animate-pulse">
//               <div className="bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm text-sm text-purple-400 font-medium">
//                 Assistant is thinking...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Form */}
//         <div className="p-6 bg-white border-t border-slate-100 shrink-0">
//           <form
//             onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
//             className="flex gap-3 max-w-4xl mx-auto bg-slate-100 border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 ring-purple-500/20 transition-all focus-within:bg-white focus-within:shadow-lg"
//           >
//             <input
//               className="flex-1 bg-transparent outline-none text-slate-700 px-4 py-2"
//               placeholder="Ask about symptoms, diet, or management..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-all shadow-md disabled:opacity-50"
//             >
//               <Send size={20} />
//             </button>
//           </form>
//           <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-[0.2em] mt-4">
//             Educational Tool Only • Not a medical diagnosis
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ChatbotPage;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { User, Bot, Send, AlertCircle, Sparkles, MessageSquare, Trash2 } from "lucide-react";
import Sidebar from "../components/siderbar"; 

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am your **PCOS Awareness Assistant**. I'm here to provide information about symptoms, lifestyle adjustments, and management.\n\nChoose a topic below or type your own question.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const scrollRef = useRef(null);

  const token = localStorage.getItem("token");

  const quickQuestions = [
    "What are common PCOS symptoms?",
    "Best diet for PCOS?",
    "Explain Rotterdam Criteria",
    "PCOS and Insulin Resistance",
  ];

  // Load chat history from backend on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const loadChatHistory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5050/api/chatbot/history",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.messages && data.messages.length > 0) {
        setMessages([
          {
            role: "assistant",
            content:
              "Hello! I am your **PCOS Awareness Assistant**. I'm here to provide information about symptoms, lifestyle adjustments, and management.\n\nChoose a topic below or type your own question.",
          },
          ...data.messages,
        ]);
      }
    } catch (error) {
      console.log('No previous chat history found or error loading:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const clearChatHistory = async () => {
    try {
      await axios.delete(
        "http://localhost:5050/api/chatbot/history",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I am your **PCOS Awareness Assistant**. I'm here to provide information about symptoms, lifestyle adjustments, and management.\n\nChoose a topic below or type your own question.",
        },
      ]);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  const handleSendMessage = async (userText) => {
    const messageToSend = userText || input;
    if (!messageToSend.trim() || loading) return;

    const userMsg = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5050/api/chatbot/chat",
        {
          message: messageToSend,
          history: messages.filter((msg) => msg.role !== "assistant" || msg.content !== messages[0].content),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ **Connection error**. Ensure the backend is running and you are logged in.",
        },
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

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-4 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  m.role === "user" ? "bg-purple-600" : "bg-white border border-slate-200"
                }`}>
                  {m.role === "user" ? <User size={20} color="white" /> : <Bot size={20} className="text-purple-600" />}
                </div>
                <div className={`px-5 py-4 rounded-3xl shadow-sm ${
                  m.role === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                }`}>
                  <div className={`prose prose-sm max-w-none ${m.role === "user" ? "prose-invert" : "prose-slate"}`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

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

          {loading && (
            <div className="flex justify-start items-center gap-3 animate-pulse">
              <div className="bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm text-sm text-purple-400 font-medium">
                Assistant is thinking...
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-slate-100 shrink-0">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
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
      </main>
    </div>
  );
};

export default ChatbotPage;