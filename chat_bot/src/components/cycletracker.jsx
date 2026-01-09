// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function PeriodTracker() {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [notes, setNotes] = useState("");
//   const [flowLevel, setFlowLevel] = useState("medium");
//   const [history, setHistory] = useState([]);
//   const [status, setStatus] = useState(null);
//   const [irregularity, setIrregularity] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const token = localStorage.getItem("token"); // JWT from login
//   const backendURL = "http://localhost:5050"; // Change port if your backend uses a different one

//   // Load history from backend or localStorage
//   useEffect(() => {
//     async function fetchHistory() {
//       try {
//         if (!token) {
//           const localData = JSON.parse(localStorage.getItem("periodHistory")) || [];
//           setHistory(Array.isArray(localData) ? localData : []);
//           return;
//         }
//         const res = await axios.get(`${backendURL}/api/period/history`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = Array.isArray(res.data.data) ? res.data.data : [];
//         setHistory(data);
//         localStorage.setItem("periodHistory", JSON.stringify(data));
//       } catch (err) {
//         console.error(err);
//         setHistory([]);
//       }
//     }
//     fetchHistory();
//   }, [token]);

//   // Add new period
//   const handleAddPeriod = async () => {
//     if (!startDate) return alert("Start date required");
//     const newEntry = { startDate, endDate, notes, flowLevel };
//     try {
//       if (token) {
//         const res = await axios.post(`${backendURL}/api/period/add`, newEntry, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const newHistory = [res.data.data, ...history];
//         setHistory(newHistory);
//         localStorage.setItem("periodHistory", JSON.stringify(newHistory));
//       } else {
//         const updatedHistory = [newEntry, ...history];
//         setHistory(updatedHistory);
//         localStorage.setItem("periodHistory", JSON.stringify(updatedHistory));
//       }
//       setStartDate("");
//       setEndDate("");
//       setNotes("");
//       setFlowLevel("medium");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch cycle status
//   const fetchStatus = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${backendURL}/api/period/status`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStatus(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch irregularity
//   const fetchIrregularity = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${backendURL}/api/period/irregular`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIrregularity({
//         ...res.data,
//         riskFactors: Array.isArray(res.data.riskFactors) ? res.data.riskFactors : [],
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch prediction
//   const fetchPrediction = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${backendURL}/api/period/predict`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPrediction(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white-50 flex flex-col items-center py-20 px-80">
//       <h1 className="text-3xl font-bold text-pink-700 mb-6">Period Tracker</h1>

//       {/* Add Period Form */}
//       <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-pink-600">Add Period</h2>
//         <div className="flex flex-col gap-3">
//           <input
//             type="date"
//             className="border p-2 rounded"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             placeholder="Start Date"
//           />
//           <input
//             type="date"
//             className="border p-2 rounded"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             placeholder="End Date"
//           />
//           <input
//             type="text"
//             className="border p-2 rounded"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="Notes"
//           />
//           <select
//             className="border p-2 rounded"
//             value={flowLevel}
//             onChange={(e) => setFlowLevel(e.target.value)}
//           >
//             <option value="light">Light</option>
//             <option value="medium">Medium</option>
//             <option value="heavy">Heavy</option>
//           </select>
//           <button
//             className="bg-pink-600 text-white rounded px-4 py-2 font-semibold hover:bg-pink-700"
//             onClick={handleAddPeriod}
//           >
//             Add Period
//           </button>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={fetchStatus}
//           className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//         >
//           Check Status
//         </button>
//         <button
//           onClick={fetchIrregularity}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Check Irregularity
//         </button>
//         <button
//           onClick={fetchPrediction}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Predict Next Cycle
//         </button>
//       </div>

//       {/* Display Status */}
//       {status && (
//         <div className="bg-white p-4 shadow rounded-xl mb-4 w-full max-w-md">
//           <h3 className="font-semibold text-purple-700 mb-2">Cycle Status</h3>
//           <p>Status: <span className="font-bold">{status.status}</span></p>
//           <p>Expected Cycle Length: {status.expected} days</p>
//           <p>Actual Gap: {status.actualGap} days</p>
//         </div>
//       )}

//       {/* Display Irregularity */}
//       {irregularity && (
//         <div className="bg-white p-4 shadow rounded-xl mb-4 w-full max-w-md">
//           <h3 className="font-semibold text-red-700 mb-2">Irregularity Check</h3>
//           <p>{irregularity.message}</p>
//           {irregularity.riskFactors.length > 0 && (
//             <>
//               <p className="font-semibold mt-2">Risk Factors:</p>
//               <ul className="list-disc pl-5">
//                 {irregularity.riskFactors.map((r, i) => (
//                   <li key={i}>{r}</li>
//                 ))}
//               </ul>
//               {irregularity.advice && <p className="mt-2 font-semibold">{irregularity.advice}</p>}
//             </>
//           )}
//         </div>
//       )}

//       {/* Display Prediction */}
//       {prediction && (
//         <div className="bg-white p-4 shadow rounded-xl mb-4 w-full max-w-md">
//           <h3 className="font-semibold text-green-700 mb-2">Cycle Prediction</h3>
//           <p>Average Cycle Length: {prediction.avgCycle} days</p>
//           <p>Last Start: {prediction.lastStart ? new Date(prediction.lastStart).toDateString() : '-'}</p>
//           <p>Next Start: {prediction.nextStart ? new Date(prediction.nextStart).toDateString() : '-'}</p>
//           <p>Ovulation: {prediction.ovulation ? new Date(prediction.ovulation).toDateString() : '-'}</p>
//           {prediction.fertileWindow && (
//             <p>
//               Fertile Window: {prediction.fertileWindow.start ? new Date(prediction.fertileWindow.start).toDateString() : '-'} - {prediction.fertileWindow.end ? new Date(prediction.fertileWindow.end).toDateString() : '-'}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Display History */}
//       <div className="bg-white p-4 shadow rounded-xl w-full max-w-md">
//         <h3 className="font-semibold text-pink-700 mb-2">Period History</h3>
//         {(!history || history.length === 0) && <p>No history yet</p>}
//         {(history || []).map((h, i) => (
//           <div key={`${h.startDate}-${i}`} className="border-b py-2 flex justify-between">
//             <div>
//               <p>
//                 <span className="font-semibold">Start:</span> {h.startDate ? new Date(h.startDate).toDateString() : '-'}
//               </p>
//               {h.endDate && <p><span className="font-semibold">End:</span> {new Date(h.endDate).toDateString()}</p>}
//               {h.notes && <p><span className="font-semibold">Notes:</span> {h.notes}</p>}
//               {h.flowLevel && <p><span className="font-semibold">Flow:</span> {h.flowLevel}</p>}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Droplets, Info, History, BarChart3, Filter } from "lucide-react";

export default function PeriodTracker() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [flowLevel, setFlowLevel] = useState("medium");
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(null);
  const [irregularity, setIrregularity] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Filter States
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());

  const token = localStorage.getItem("token");
  const backendURL = "http://localhost:5050";

  useEffect(() => {
    async function fetchHistory() {
      try {
        if (!token) {
          const localData = JSON.parse(localStorage.getItem("periodHistory")) || [];
          setHistory(Array.isArray(localData) ? localData : []);
          return;
        }
        const res = await axios.get(`${backendURL}/api/period/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setHistory(data);
        localStorage.setItem("periodHistory", JSON.stringify(data));
      } catch (err) {
        console.error(err);
        setHistory([]);
      }
    }
    fetchHistory();
  }, [token]);

  const handleAddPeriod = async () => {
    if (!startDate) return alert("Start date required");
    const newEntry = { startDate, endDate, notes, flowLevel };
    try {
      if (token) {
        const res = await axios.post(`${backendURL}/api/period/add`, newEntry, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newHistory = [res.data.data, ...history];
        setHistory(newHistory);
        localStorage.setItem("periodHistory", JSON.stringify(newHistory));
      } else {
        const updatedHistory = [newEntry, ...history];
        setHistory(updatedHistory);
        localStorage.setItem("periodHistory", JSON.stringify(updatedHistory));
      }
      setStartDate(""); setEndDate(""); setNotes(""); setFlowLevel("medium");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStatus = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendURL}/api/period/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchIrregularity = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendURL}/api/period/irregular`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIrregularity({
        ...res.data,
        riskFactors: Array.isArray(res.data.riskFactors) ? res.data.riskFactors : [],
      });
    } catch (err) { console.error(err); }
  };

  const fetchPrediction = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendURL}/api/period/predict`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrediction(res.data.data);
    } catch (err) { console.error(err); }
  };

  // Filter Logic
  const filteredHistory = history.filter((item) => {
    const date = new Date(item.startDate);
    const monthMatch = filterMonth === "all" || date.getMonth().toString() === filterMonth;
    const yearMatch = filterYear === "all" || date.getFullYear().toString() === filterYear;
    return monthMatch && yearMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-700">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-pink-100 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-pink-800 tracking-tight">Graceful Cycle</h1>
          <p className="text-pink-400 mt-2 font-medium">Track your rhythm with ease</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Input Form */}
          <section className="space-y-6">
            <div className="bg-white/70 backdrop-blur-md shadow-xl border border-pink-100 rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-pink-700 flex items-center gap-2">
                <Droplets className="w-5 h-5" /> Log Period
              </h2>
              <div className="space-y-4">
                <div className="group">
                  <label className="text-xs font-bold text-pink-400 uppercase ml-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full border-pink-100 border-2 rounded-2xl p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all outline-none"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-pink-400 uppercase ml-1">End Date (Optional)</label>
                  <input
                    type="date"
                    className="w-full border-pink-100 border-2 rounded-2xl p-3 focus:ring-2 focus:ring-pink-300 outline-none"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  className="w-full border-pink-100 border-2 rounded-2xl p-3 focus:ring-2 focus:ring-pink-300 outline-none"
                  placeholder="How are you feeling? (Notes)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <select
                  className="w-full border-pink-100 border-2 rounded-2xl p-3 bg-white focus:ring-2 focus:ring-pink-300 outline-none"
                  value={flowLevel}
                  onChange={(e) => setFlowLevel(e.target.value)}
                >
                  <option value="light">🌸 Light Flow</option>
                  <option value="medium">🌸 Medium Flow</option>
                  <option value="heavy">🌸 Heavy Flow</option>
                </select>
                <button
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl py-3.5 font-bold shadow-lg shadow-pink-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  onClick={handleAddPeriod}
                >
                  Save Entry
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <button onClick={fetchStatus} className="flex-1 min-w-[120px] bg-purple-50 text-purple-600 border border-purple-100 px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-purple-100 transition-colors">
                Status
              </button>
              <button onClick={fetchIrregularity} className="flex-1 min-w-[120px] bg-rose-50 text-rose-600 border border-rose-100 px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-rose-100 transition-colors">
                Health Check
              </button>
              <button onClick={fetchPrediction} className="flex-1 min-w-[120px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-emerald-100 transition-colors">
                Prediction
              </button>
            </div>
          </section>

          {/* Right Column: Insights & History */}
          <section className="space-y-6">
            
            {/* Insights Display (Conditional) */}
            {(status || irregularity || prediction) && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                {status && (
                  <div className="bg-purple-50/50 border border-purple-100 p-5 rounded-3xl">
                    <h3 className="font-bold text-purple-700 mb-1">Cycle Status</h3>
                    <p className="text-sm">You are currently: <span className="font-bold uppercase tracking-wider">{status.status}</span></p>
                  </div>
                )}
                {prediction && (
                  <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-3xl">
                    <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Next Prediction</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-medium uppercase text-emerald-800">
                      <div><p className="text-emerald-500 mb-1">Period Starts</p> {new Date(prediction.nextStart).toLocaleDateString()}</div>
                      <div><p className="text-emerald-500 mb-1">Ovulation Day</p> {new Date(prediction.ovulation).toLocaleDateString()}</div>
                    </div>
                  </div>
                )}
                {irregularity && (
                  <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-3xl">
                    <h3 className="font-bold text-rose-700 mb-2 flex items-center gap-2"><Info className="w-4 h-4"/> Health Alert</h3>
                    <p className="text-sm text-rose-600 mb-2">{irregularity.message}</p>
                    {irregularity.riskFactors.map((r, i) => <span key={i} className="inline-block bg-white/60 px-2 py-1 rounded-lg text-[10px] mr-2 mb-1">{r}</span>)}
                  </div>
                )}
              </div>
            )}

            {/* History with Filters */}
            <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-50 min-h-[400px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <History className="w-5 h-5 text-pink-400" /> History
                </h3>
                
                <div className="flex gap-2 bg-pink-50 p-1 rounded-xl">
                  {/* <select 
                    value={filterMonth} 
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="bg-transparent text-xs font-bold text-pink-600 outline-none p-1 cursor-pointer"
                  >
                    <option value="all">All Months</option>
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                      <option key={m} value={i}>{m}</option>
                    ))}
                  </select> */}
                  <select 
                    value={filterYear} 
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="bg-transparent text-xs font-bold text-pink-600 outline-none p-1 cursor-pointer"
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 italic">No entries found for this period.</div>
                ) : (
                  filteredHistory.map((h, i) => (
                    <div key={i} className="group relative bg-gray-50/50 hover:bg-pink-50/50 rounded-2xl p-4 transition-all border border-transparent hover:border-pink-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-gray-700">
                            {new Date(h.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            <span className={`w-2 h-2 rounded-full ${h.flowLevel === 'heavy' ? 'bg-rose-400' : 'bg-pink-300'}`}></span>
                            {h.flowLevel} flow
                          </p>
                        </div>
                        {h.notes && (
                           <div className="max-w-[150px] text-right">
                             <p className="text-[10px] text-gray-400 italic truncate">"{h.notes}"</p>
                           </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}