import React, { useEffect, useState } from "react";
import { predictAPI } from "../../services/trackerService";

export default function Prediction() {
  const [pred, setPred] = useState(null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cyclePrediction"));
    if (local && Object.keys(local).length) setPred(local);
    predictAPI().then(res => {
      if (res.success) setPred(res.data);
    }).catch(()=>{});
  }, []);

  if (!pred) return null;

  const fmt = iso => new Date(iso).toLocaleDateString();

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">Predictions</h3>

      {pred ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Average Cycle</div>
            <div className="font-medium">{pred.avgCycle} days</div>
            <div className="text-sm text-gray-500 mt-2">Next Period</div>
            <div className="font-medium">{fmt(pred.nextStart)}</div>
          </div>

          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Ovulation (approx)</div>
            <div className="font-medium">{fmt(pred.ovulation)}</div>
            <div className="text-sm text-gray-500 mt-2">Fertile Window</div>
            <div className="font-medium">{fmt(pred.fertileWindow.start)} — {fmt(pred.fertileWindow.end)}</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Not enough data to predict.</p>
      )}
    </div>
  );
}
