import { Check, Rocket } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

const versions = [
  {
    v: "2.0.0",
    date: "15. März 2026",
    tag: "Major",
    color: "from-violet-500 to-cyan-400",
    changes: [
      "✨ Komplett neues Dashboard mit 18 Tabs",
      "🎫 Ticket-System mit Discord-Dropdown-Menü",
      "🎨 Embed Builder mit Banner-Upload",
      "🛡️ AutoMod 2.0 mit KI-Filtern",
      "📊 Live Stats API für Website",
      "⚡ Status-Rotation alle 10 Sekunden",
      "🎵 Lavalink 4 Integration",
      "🎁 Giveaway-System",
    ],
  },
  {
    v: "1.8.0",
    date: "20. Januar 2026",
    tag: "Feature",
    color: "from-cyan-500 to-blue-500",
    changes: [
      "🎵 Music Player mit Spotify Support",
      "📝 Erweiterte Logging-Optionen",
      "🏆 Leveling System mit Rank-Cards",
      "🐛 Diverse Bugfixes",
    ],
  },
  {
    v: "1.5.0",
    date: "10. November 2025",
    tag: "Feature",
    color: "from-emerald-500 to-teal-500",
    changes: [
      "🎫 Ticket-System Release",
      "👋 Welcome/Leave Cards",
      "🔨 Moderation Commands",
    ],
  },
  {
    v: "1.0.0",
    date: "01. September 2025",
    tag: "Launch",
    color: "from-amber-500 to-orange-500",
    changes: [
      "🚀 Initial Release",
      "⚙️ Basis-Commands",
      "🛡️ AutoMod 1.0",
    ],
  },
];

export default function Changelog() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl font-black mb-3 fade-up">
        <span className="text-gradient">Changelog</span>
      </h1>
      <p className="text-gray-400 mb-10">Alle Updates und Verbesserungen im Überblick.</p>

      <div className="space-y-6">
        {versions.map((v, i) => (
          <div key={i} className="glass p-6 fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center`}>
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Version {v.v}</h2>
                  <div className="text-xs text-gray-400">{v.date}</div>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${v.color} font-semibold`}>{v.tag}</span>
            </div>
            <ul className="space-y-2">
              {v.changes.map((c, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
