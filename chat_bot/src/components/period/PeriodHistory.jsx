import React, { useEffect, useState } from "react";
import { getHistoryAPI } from "../../services/trackerService";

export default function PeriodHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("periodHistory"));
    if (local) setHistory(local);
    getHistoryAPI().then(data => setHistory(data)).catch(()=>{});
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">History</h3>
      {history && history.length ? (
        <div className="space-y-2">
          {history.map((p) => (
            <div key={p._id || p.startDate} className="flex justify-between items-center border p-2 rounded">
              <div>
                <div className="font-medium">Start: {new Date(p.startDate).toLocaleDateString()}</div>
                {p.endDate && <div className="text-sm text-gray-600">End: {new Date(p.endDate).toLocaleDateString()}</div>}
                {p.flowLevel && <div className="text-sm text-gray-600">Flow: {p.flowLevel}</div>}
              </div>
              <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No history saved yet.</p>
      )}
    </div>
  );
}
