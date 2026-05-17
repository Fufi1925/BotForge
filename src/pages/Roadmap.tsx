import { Check, Clock, Rocket } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

const roadmap = [
  {
    q: "Q2 2026",
    title: "AI & Voice",
    color: "from-violet-500 to-purple-500",
    items: [
      { name: "AI Chat Assistant", status: "planned" },
      { name: "Voice Channel Stats", status: "planned" },
      { name: "AI AutoMod-Training", status: "planned" },
      { name: "Text-to-Speech Commands", status: "planned" },
    ],
  },
  {
    q: "Q3 2026",
    title: "Mobile & Analytics",
    color: "from-cyan-500 to-blue-500",
    items: [
      { name: "Mobile App (iOS/Android)", status: "planned" },
      { name: "Advanced Analytics Dashboard", status: "planned" },
      { name: "Server Insights", status: "planned" },
      { name: "User Behavior Charts", status: "planned" },
    ],
  },
  {
    q: "Q4 2026",
    title: "Ecosystem",
    color: "from-emerald-500 to-teal-500",
    items: [
      { name: "Plugin Marketplace", status: "planned" },
      { name: "Public API für Developer", status: "planned" },
      { name: "Webhooks & Integrationen", status: "planned" },
      { name: "Multi-Language Expansion", status: "planned" },
    ],
  },
];

const done = [
  "Ticket-System mit Discord-Dropdown",
  "Live Stats API",
  "Status-Rotation",
  "Embed Builder mit Banner-Upload",
  "AutoMod 2.0",
  "Reaction Roles",
  "Giveaway-System",
  "Backup & Export",
];

export default function Roadmap() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl font-black mb-3 fade-up">
        <span className="text-gradient">Roadmap</span>
      </h1>
      <p className="text-gray-400 mb-10">Was wir als nächstes bauen.</p>

      <div className="glass p-6 mb-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-400" /> Kürzlich abgeschlossen
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {done.map((d, i) => (
            <div key={i} className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {roadmap.map((r, i) => (
          <div key={i} className="glass p-6 fade-up">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center`}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400">{r.q}</div>
                <h2 className="text-xl font-bold">{r.title}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {r.items.map((it, j) => (
                <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <Rocket className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-gray-300">{it.name}</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">geplant</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
