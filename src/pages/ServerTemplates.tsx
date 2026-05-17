import { useState } from "react";
import { Layout, Copy, Check, Sparkles, Users, Gamepad2, Briefcase, GraduationCap, Music, Code2 } from "lucide-react";

const PAGE_VISIBLE = true;

const templates = [
  {
    name: "Roleplay-Server",
    desc: "Tickets für Hausverkauf, Waffenschein, Fraktion-Bewerbungen. Voice-Support, Welcome-System.",
    icon: "🏙️",
    modules: ["Tickets", "Welcome", "Voice-Support", "Teamverwaltung", "Moderation"],
    color: "from-violet-500 to-pink-500",
    icon_lib: Users,
  },
  {
    name: "Gaming-Community",
    desc: "Music-Player, Custom Voice, Engagement Rewards. Perfekt für Multi-Gaming-Server.",
    icon: "🎮",
    modules: ["Music", "Private Kanäle", "Beteiligungs-Belohnungen", "Server Stats"],
    color: "from-emerald-500 to-teal-500",
    icon_lib: Gamepad2,
  },
  {
    name: "eSports-Clan",
    desc: "Voice-Support für Match-Coaching, Team-Management mit Bewerbungen, Social Media.",
    icon: "⚔️",
    modules: ["Teamverwaltung", "Voice-Support", "Social Media", "Stats", "Protection"],
    color: "from-amber-500 to-orange-500",
    icon_lib: Briefcase,
  },
  {
    name: "Study-Group",
    desc: "Pomodoro-Voice, Tickets für Lerngruppen, Custom Voice für temporäre Lernräume.",
    icon: "📚",
    modules: ["Tickets", "Private Kanäle", "Welcome", "Vorschläge"],
    color: "from-blue-500 to-cyan-500",
    icon_lib: GraduationCap,
  },
  {
    name: "Music-Server",
    desc: "24/7 Music-Player, DJ-Rolle, Song-Requests, Twitch-Streams.",
    icon: "🎵",
    modules: ["Music", "Social Media", "Welcome", "Beteiligungs-Belohnungen"],
    color: "from-cyan-500 to-blue-500",
    icon_lib: Music,
  },
  {
    name: "Developer-Hub",
    desc: "Tickets für Code-Help, GitHub-Notifications, Vorschläge mit Voting.",
    icon: "💻",
    modules: ["Tickets", "Vorschläge", "Welcome", "Moderation"],
    color: "from-slate-500 to-gray-500",
    icon_lib: Code2,
  },
];

export default function ServerTemplates() {
  if (!PAGE_VISIBLE) return null;
  const [copied, setCopied] = useState<string | null>(null);

  const apply = (name: string) => {
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30">
          <Layout className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">Server Templates</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Starte mit einem <span className="text-gradient">Template.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Vorgefertigte Setups für jeden Server-Typ. Ein Klick — alle Module aktiviert und vorkonfiguriert.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((t, i) => {
          const Icon = t.icon_lib;
          return (
            <div key={i} className="glass rounded-2xl overflow-hidden hover-pop card-shine flex flex-col">
              <div className={`h-2 bg-gradient-to-r ${t.color}`} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-5xl">{t.icon}</div>
                  <Icon className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="font-bold text-xl mb-2">{t.name}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-1">{t.desc}</p>
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2 uppercase font-semibold">Module aktiviert:</div>
                  <div className="flex flex-wrap gap-1">
                    {t.modules.map((m, j) => (
                      <span key={j} className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2 py-1 rounded">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => apply(t.name)}
                  className={`w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                    copied === t.name
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-gradient-to-r from-violet-500 to-cyan-400 text-white hover:opacity-90"
                  }`}
                >
                  {copied === t.name ? <><Check className="w-4 h-4" /> Angewendet!</> : <><Sparkles className="w-4 h-4" /> Template anwenden</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
