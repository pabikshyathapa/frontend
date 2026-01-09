import React from "react";
import { Info, ShieldCheck } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-80 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex-col p-8 shadow-2xl shrink-0 h-full overflow-hidden">
      <div className="flex items-center gap-3 mb-10 shrink-0">
        <div className="p-2 bg-purple-400/20 rounded-xl backdrop-blur-md border border-purple-400/30">
          <ShieldCheck className="text-purple-300" size={28} />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          PCOS <span className="text-purple-300">Care</span>
        </h2>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 shadow-inner">
          <h3 className="flex items-center gap-2 font-bold text-purple-200 mb-3 text-sm uppercase tracking-wider">
            <Info size={16} /> Rotterdam Criteria
          </h3>
          <ul className="space-y-3 text-sm text-purple-50/80 leading-relaxed">
            <li className="flex gap-2"><span>•</span> Irregular or absent periods</li>
            <li className="flex gap-2"><span>•</span> Hyperandrogenism (High male hormones)</li>
            <li className="flex gap-2"><span>•</span> Polycystic ovaries via ultrasound</li>
          </ul>
        </div>
        
        <div className="p-4 bg-indigo-950/40 rounded-xl border-l-4 border-purple-400 italic text-sm text-purple-100/90">
          "Diagnosis usually requires meeting 2 out of the 3 main criteria."
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 text-center shrink-0">
        <p className="text-xs font-medium text-purple-300 tracking-widest uppercase">
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;