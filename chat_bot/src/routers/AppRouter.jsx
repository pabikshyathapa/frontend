import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Homepage from "../pages/Homepage";
import Chatbot from "../components/chatbot";
import Dashboard from "../pages/dashboard";
import PeriodTracker from "../components/cycletracker";
import ChatbotPage from "../pages/chatbotpage";
import GuestmodePage from "../pages/guestmode";



const AppRouter = () => (
    <BrowserRouter>
        <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chatbot" element={<Chatbot/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/" element={<div className="p-8">Open <a href="/period-tracker" className="text-purple-600">/period-tracker</a></div>} />
                <Route path="/period-tracker" element={<PeriodTracker />} />
                <Route path="/pcoschat" element={<ChatbotPage />} />
                <Route path="/guestmode" element={<GuestmodePage />} />




        </Routes>
    </BrowserRouter>
);

export default AppRouter;