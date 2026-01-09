import React, { useState } from "react";
import { addPeriodAPI } from "../../services/trackerService";

export default function AddPeriod({ onAdded }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flowLevel, setFlowLevel] = useState("medium");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!startDate) return alert("Please choose a start date");
    setLoading(true);
    try {
      const saved = await addPeriodAPI({ startDate, endDate, flowLevel, notes });
      setStartDate(""); setEndDate(""); setNotes("");
      if (onAdded) onAdded(saved);
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Add Period Entry</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="col-span-1">
          <label className="block text-sm">Start</label>
          <input required value={startDate} onChange={e=>setStartDate(e.target.value)} type="date" className="mt-1 w-full p-2 border rounded"/>
        </div>
        <div className="col-span-1">
          <label className="block text-sm">End</label>
          <input value={endDate} onChange={e=>setEndDate(e.target.value)} type="date" className="mt-1 w-full p-2 border rounded"/>
        </div>
        <div className="col-span-1">
          <label className="block text-sm">Flow</label>
          <select value={flowLevel} onChange={e=>setFlowLevel(e.target.value)} className="mt-1 w-full p-2 border rounded">
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm"> </label>
          <button disabled={loading} className="w-full mt-1 bg-purple-600 text-white p-2 rounded">
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </div>

        <div className="col-span-4">
          <label className="block text-sm">Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows="2" className="mt-1 w-full p-2 border rounded"></textarea>
        </div>
      </div>
    </form>
  );
}
