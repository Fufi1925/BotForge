import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Search } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

const faqs = [
  {
    q: "Wie erstelle ich mein erstes Ticket-Panel?",
    a: "Verwende einfach den Befehl `/ticket panel` in dem Textkanal, in dem das Dropdown-Menü erscheinen soll. Zuvor kannst du im Dashboard unter 'Tickets' beliebig viele Support-Kategorien anlegen.",
    cat: "Tickets"
  },
  {
    q: "Wie blockiere ich beleidigende Nachrichten automatisch?",
    a: "Navigiere im Dashboard zum Tab 'AutoMod' und aktiviere den Schalter 'Beleidigungen & Hate Speech'. Der BotForge-Filter greift in unter 15 Millisekunden und löscht die Nachricht vollständig.",
    cat: "AutoMod"
  },
  {
    q: "Kann ich eigene Emojis hinzufügen?",
    a: "Ja! Entweder lädst du sie direkt im Dashboard-Tab 'Custom Emojis' per PNG/GIF hoch, oder du nutzt das Kommando `/emoji add <name> <image_url>`.",
    cat: "Emojis"
  },
  {
    q: "Kostet der Musik-Player etwas?",
    a: "Nein! Die Wiedergabe von Songs (YouTube, Spotify, SoundCloud) ist vollkommen kostenlos. Lediglich der 24/7-Modus erfordert ein Premium-Abonnement, um Server-Kapazitäten fair zu verteilen.",
    cat: "Musik"
  },
  {
    q: "Sind meine Daten bei BotForge sicher?",
    a: "Absolut. Wir speichern alle Server-Konfigurationen, Warns und Levels DSGVO-konform in einem gesicherten MongoDB Atlas-Cluster in der EU. Keine Nachrichten-Inhalte werden dauerhaft protokolliert.",
    cat: "Security"
  }
];

export default function FaqPage() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  const [activeCat, setActiveCat] = useState("Alle");
  const [q, setQ] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ["Alle", "Tickets", "AutoMod", "Emojis", "Musik", "Security"];

  const filtered = faqs.filter(
    f => (activeCat === "Alle" || f.cat === activeCat) &&
         (f.q.toLowerCase().includes(q.toLowerCase()) || f.a.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <HelpCircle className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Wissensdatenbank</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Häufig gestellte <span className="text-gradient">Fragen</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Finde sofortige Antworten zu allen Funktionen, Befehlen, Integrationsmöglichkeiten und Sicherheitsstandards.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-8 fade-up">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Häufige Fragen durchsuchen..."
          className="input pl-11"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => { setActiveCat(cat); setOpenIndex(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCat === cat
                ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-white glow-violet"
                : "bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={`glass rounded-2xl overflow-hidden border transition-all duration-300 in-up ${isOpen ? "border-violet-500/40 glow-breathe" : "border-white/5 hover:border-violet-500/20"}`} style={{ animationDelay: `${i * 0.05}s` }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition group"
              >
                <span className="font-semibold text-sm sm:text-base flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 shrink-0 transition ${isOpen ? "text-violet-400 animate-pulse" : "text-violet-400/60 group-hover:text-violet-400"}`} />
                  <span className="text-glow-hover">{item.q}</span>
                </span>
                <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-violet-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed in-up">
                  {item.a}
                  <div className="mt-3 text-[10px] uppercase tracking-wider text-violet-400 font-bold">
                    Kategorie: {item.cat}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
