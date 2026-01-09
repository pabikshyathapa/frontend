import React, { useEffect, useState } from "react";
import { checkIrregularAPI } from "../../services/trackerService";

export default function IrregularityChecker() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cycleIrregularity"));
    if (local) setData(local);
    checkIrregularAPI().then(res => setData(res)).catch(()=>{});
  }, []);

  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">Irregularity Check</h3>
      <p className="mb-2">{data.message}</p>

      {data.irregular && (
        <>
          <div className="text-sm font-semibold">Risk Factors</div>
          <ul className="list-disc list-inside text-sm mb-2">
            {data.riskFactors.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
          <div className="text-red-600 font-medium">{data.advice}</div>
        </>
      )}
    </div>
  );
}
