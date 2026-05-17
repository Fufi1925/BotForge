import { BarChart3, Shield, Command, Users, Clock, Zap } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

const stats = [
  { name: "Ausgeführte Commands", value: "12.493.284", change: "+18% heute", color: "from-violet-500 to-purple-500", icon: Command },
  { name: "Geschützte Server", value: "847", change: "+12 diese Woche", color: "from-cyan-500 to-blue-500", icon: Shield },
  { name: "Aktive Community-Mitglieder", value: "248.392", change: "+1.294 heute", color: "from-emerald-500 to-teal-500", icon: Users },
  { name: "Lavalink Musik-Stunden", value: "42.940", change: "live", color: "from-pink-500 to-rose-500", icon: Zap },
];

const graphData = [
  { day: "Mo", commands: 45000, users: 12000 },
  { day: "Di", commands: 52000, users: 14000 },
  { day: "Mi", commands: 49000, users: 13500 },
  { day: "Do", commands: 61000, users: 15800 },
  { day: "Fr", commands: 80000, users: 19000 },
  { day: "Sa", commands: 95000, users: 22000 },
  { day: "So", commands: 88000, users: 21000 },
];

export default function Analytics() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <BarChart3 className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Globale Analysen</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Echtzeit <span className="text-gradient">Statistiken</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Echte Live-Messwerte der BotForge Systemlast, Command-Frequenzen und dem Wachstum unseres Netzwerks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass p-5 relative overflow-hidden group hover-lift">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full font-bold uppercase">{s.change}</span>
              </div>
              <div className="text-2xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-400">{s.name}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 lg:col-span-2">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-violet-400 animate-pulse" />
            Wöchentliche Auslastung
          </h3>
          <div className="flex items-end gap-3 h-48">
            {graphData.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-white/5 rounded-t-lg overflow-hidden flex flex-col justify-end h-36">
                  <div
                    className="bg-gradient-to-t from-violet-500 to-cyan-400 opacity-80 hover:opacity-100 transition-all duration-300"
                    style={{ height: `${(item.commands / 100000) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="font-bold text-lg mb-6">Command-Verteilung</h3>
          <div className="space-y-4">
            {[
              { name: "/play", pct: 42, color: "bg-violet-500" },
              { name: "/ticket", pct: 24, color: "bg-cyan-500" },
              { name: "/rank", pct: 18, color: "bg-pink-500" },
              { name: "/automod", pct: 16, color: "bg-amber-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono text-gray-300">{item.name}</span>
                  <span className="font-bold text-white">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
