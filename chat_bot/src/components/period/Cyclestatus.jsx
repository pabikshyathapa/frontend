import React, { useEffect, useState } from "react";
import { getStatusAPI } from "../../services/trackerService";

export default function CycleStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cycleStatus"));
    if (local) setStatus(local);
    getStatusAPI().then(data => setStatus(data)).catch(()=>{});
  }, []);

  if (!status) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">Cycle Status</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Status</div>
          <div className="font-medium">{status.status}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Expected</div>
          <div className="font-medium">{status.expected || "-" } days</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Your last cycle</div>
          <div className="font-medium">{status.actualGap ? `${status.actualGap} days` : "-"}</div>
        </div>
      </div>
    </div>
  );
}
