import { Link } from "react-router-dom";
import { Book, Shield, Ticket, Music, Settings, Key, Terminal, HelpCircle } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

const categories = [
  {
    title: "Erste Schritte",
    desc: "Lerne wie du BotForge einrichtest, ihn einlädst und die grundlegenden Konfigurationen vornimmst.",
    icon: Key,
    link: "/docs/setup",
    color: "from-violet-500 to-purple-500"
  },
  {
    title: "Moderation & Schutz",
    desc: "Dokumentation für Timeouts, Bans, Kicks und das gesamte Verwarnungssystem.",
    icon: Shield,
    link: "/docs/moderation",
    color: "from-red-500 to-pink-500"
  },
  {
    title: "AutoMod 2.0",
    desc: "Konfiguriere die KI-gestützten Filter für Spam, Beleidigungen, Invites und Caps.",
    icon: Settings,
    link: "/docs/automod",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Ticket-System",
    desc: "Erstelle interaktive Dropdown-Panels, weise Teams zu und verwalte Transcripts.",
    icon: Ticket,
    link: "/docs/tickets",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Musik-Wiedergabe",
    desc: "Alle wavelink/Lavalink Befehle zum Streamen von Spotify, YouTube und SoundCloud.",
    icon: Music,
    link: "/docs/music",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Custom Commands & Aliases",
    desc: "Schreibe eigene Slash-Commands mit Platzhaltern wie {user} und {server}.",
    icon: Terminal,
    link: "/docs/commands",
    color: "from-fuchsia-500 to-pink-500"
  }
];

export default function Docs() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Book className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Dokumentations-Center</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Wie können wir dir <span className="text-gradient">helfen?</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Detaillierte Schritt-für-Schritt-Anleitungen, Befehlsreferenzen und Tipps zur optimalen Nutzung von BotForge auf deinem Discord-Server.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Link
              key={i}
              to={cat.link}
              className="glass p-6 rounded-2xl hover-lift group border border-white/5 relative overflow-hidden block"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 glow-violet transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-gradient mb-2 transition duration-300">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {cat.desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-violet-400 font-semibold">
                Dokumentation lesen →
              </div>
            </Link>
          );
        })}
      </div>

      <div className="glass p-8 rounded-3xl mt-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-cyan-400/5 pointer-events-none" />
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Fragen unbeantwortet?</h4>
            <p className="text-sm text-gray-400">Tritt unserem Support-Server bei und frage unsere Supporter direkt.</p>
          </div>
        </div>
        <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
          Support erhalten
        </a>
      </div>
    </div>
  );
}
