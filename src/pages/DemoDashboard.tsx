import { useState, useEffect } from "react";
import { Shield, Ticket, Music, Users, Zap, BarChart3, Command, Activity, Settings, Crown, Lock } from "lucide-react";

const DEMO_GUILDS = [
  { id: "1", name: "Demo Server Alpha", members: 4832, color: "from-violet-500 to-cyan-400" },
  { id: "2", name: "Demo Server Beta", members: 12483, color: "from-pink-500 to-rose-500" },
];

export default function DemoDashboard() {
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guild, setGuild] = useState<any>(null);

  useEffect(() => {
    fetch("/api/system")
      .then(r => r.json())
      .then(d => {
        if (d?.demo_dashboard?.enabled) {
          setAllowed(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-strong max-w-md w-full p-10 text-center glow-violet anim-scale">
          <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Zugang gesperrt</h1>
          <p className="text-gray-400 text-sm">Diese Seite ist derzeit deaktiviert.</p>
        </div>
      </div>
    );
  }

  if (!guild) {
    return (
      <div className="pt-28 pb-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 anim-up">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-amber-500/30">
            <Crown className="w-3 h-3 text-amber-400" />
            <span>DEMO · Nur für den Owner sichtbar</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Demo Dashboard</h1>
          <p className="text-gray-400 text-sm">Teste alle Dashboard-Funktionen ohne echten Discord-Login.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {DEMO_GUILDS.map((g, i) => (
            <button key={g.id} onClick={() => setGuild(g)} className="glass p-6 text-left hover-lift card-shine anim-up" style={{animationDelay:`${i*0.1}s`}}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g.color} mb-4 flex items-center justify-center text-white font-black text-xl glow-breathe`}>
                {g.name[0]}
              </div>
              <h3 className="font-bold text-lg">{g.name}</h3>
              <p className="text-xs text-gray-400">{g.members.toLocaleString()} Members</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Commands", value: "3,284", icon: Command, color: "from-violet-500 to-purple-500" },
    { label: "Members", value: guild.members.toLocaleString(), icon: Users, color: "from-cyan-500 to-blue-500" },
    { label: "AutoMod", value: "128", icon: Shield, color: "from-red-500 to-pink-500" },
    { label: "Tickets", value: "7", icon: Ticket, color: "from-amber-500 to-orange-500" },
    { label: "Music", value: "12h", icon: Music, color: "from-emerald-500 to-teal-500" },
    { label: "Latenz", value: "38ms", icon: Activity, color: "from-fuchsia-500 to-pink-500" },
  ];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4">
      <div className="glass p-5 mb-6 flex items-center justify-between gap-4 flex-wrap anim-down">
        <div className="flex items-center gap-4">
          <button onClick={() => setGuild(null)} className="text-sm text-gray-400 hover:text-white">← Zurück</button>
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${guild.color} flex items-center justify-center text-white font-black text-xl`}>
            {guild.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {guild.name}
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">DEMO</span>
            </h1>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <Users className="w-3 h-3" /> {guild.members.toLocaleString()} Members
              <span className="text-green-400 flex items-center gap-1 ml-2"><span className="pulse-dot" style={{width:6,height:6}} /> Simuliert</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass p-5 hover-lift card-shine anim-up" style={{animationDelay:`${i*0.05}s`}}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">live</span>
              </div>
              <div className="text-2xl font-bold text-gradient num-glow">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 anim-left">
          <h3 className="font-bold mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-violet-400" /> Aktivität (7 Tage)</h3>
          <div className="flex items-end gap-2 h-32">
            {[40, 65, 48, 80, 60, 92, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-violet-500 to-cyan-400 rounded-t opacity-80 hover:opacity-100 transition-all" style={{height:`${h}%`}} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {["Mo","Di","Mi","Do","Fr","Sa","So"].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        <div className="glass p-6 anim-right">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> Letzte Aktionen</h3>
          <div className="space-y-2 text-sm">
            {[
              { t: "vor 1 min", a: "AutoMod: Spam-Nachricht gelöscht", c: "bg-red-400" },
              { t: "vor 3 min", a: "Neues Ticket erstellt von @user123", c: "bg-amber-400" },
              { t: "vor 8 min", a: "Level-Up: @gamer → Level 15", c: "bg-violet-400" },
              { t: "vor 12 min", a: "Music: /play Imagine Dragons", c: "bg-cyan-400" },
              { t: "vor 20 min", a: "Welcome-Card gesendet", c: "bg-green-400" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${a.c}`} />
                  <span className="text-gray-200">{a.a}</span>
                </div>
                <span className="text-xs text-gray-500">{a.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-6 mt-6 anim-up anim-d3">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-violet-400" /> Quick-Settings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { n: "AutoMod", on: true },
            { n: "Tickets", on: true },
            { n: "Music", on: true },
            { n: "Welcome", on: true },
            { n: "Levels", on: false },
            { n: "Logging", on: true },
            { n: "Giveaways", on: false },
            { n: "Economy", on: false },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm">{m.n}</span>
              <div className={`switch ${m.on ? "on" : ""}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
