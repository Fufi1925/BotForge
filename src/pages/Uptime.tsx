import { Activity, Clock, Server } from "lucide-react";
import { useEffect, useState } from "react";
export default function Uptime() {
  const [secs, setSecs] = useState(0);
  useEffect(() => { const id = setInterval(() => setSecs(s => s+1), 1000); return () => clearInterval(id); }, []);
  const d = Math.floor(secs/86400); const h = Math.floor((secs%86400)/3600); const m = Math.floor((secs%3600)/60); const s = secs%60;
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-green-500/30">
          <Activity className="w-3.5 h-3.5 text-green-400 animate-pulse" /><span className="font-semibold uppercase">Live Uptime Monitor</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">99.9% <span className="text-gradient">Uptime</span></h1>
      </div>
      <div className="glass-strong p-10 text-center glow-violet anim-scale">
        <div className="text-6xl sm:text-8xl font-black font-mono text-gradient num-glow mb-4">
          {d}d {String(h).padStart(2,"0")}:{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}
        </div>
        <p className="text-gray-400">Session-Uptime (seit Seitenaufruf)</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[{l:"Gesamte Uptime",v:"143 Tage",i:Clock},{l:"Neustarts",v:"2 (geplant)",i:Server},{l:"Avg. Latenz",v:"42ms",i:Activity}].map((s,i) => {
          const Icon = s.i;
          return <div key={i} className="glass p-5 text-center anim-up" style={{animationDelay:`${i*0.1}s`}}><Icon className="w-6 h-6 text-violet-400 mx-auto mb-2" /><div className="text-xl font-bold">{s.v}</div><div className="text-xs text-gray-400">{s.l}</div></div>;
        })}
      </div>
    </div>
  );
}
