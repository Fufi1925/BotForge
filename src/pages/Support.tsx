import { Headphones, Mail, MessageSquare, BookOpen, HelpCircle, Lightbulb, ExternalLink, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const PAGE_VISIBLE = true;

const faqs = [
  { q: "Wie füge ich BotForge zu meinem Server hinzu?", a: "Klicke auf 'Bot einladen' im Dashboard oder auf der Startseite und wähle deinen Server aus." },
  { q: "Sind alle Module wirklich kostenlos?", a: "Ja. Alle 14 Module sind komplett kostenlos. Nur das BotForge Plus Branding kostet 4,99€." },
  { q: "Wie aktiviere ich ein Modul?", a: "Im Dashboard zum Modul gehen und oben auf 'Aktivieren' klicken." },
  { q: "Wie funktioniert No-Prefix?", a: "Im Dashboard Settings → No-Prefix aktivieren und User-IDs eintragen, die ohne / oder ! Befehle nutzen dürfen." },
  { q: "Werden meine Daten weitergegeben?", a: "Nein. DSGVO-konform, EU-Hosting, keine Datenweitergabe an Dritte." },
  { q: "Kann ich den Bot-Namen ändern?", a: "Mit BotForge Plus (4,99€/mo) bekommst du einen Custom Bot mit eigenem Namen und Avatar." },
];

export default function Support() {
  if (!PAGE_VISIBLE) return null;
  const [q, setQ] = useState("");
  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(q.toLowerCase()) ||
    f.a.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30">
          <Headphones className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">Support Center</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Wie können wir <span className="text-gradient">helfen?</span></h1>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Wonach suchst du?"
          className="w-full pl-11 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-violet-500/50"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="glass p-4 rounded-xl hover-pop text-center">
          <Headphones className="w-6 h-6 text-violet-400 mx-auto mb-2" />
          <div className="text-sm font-bold">Discord</div>
          <div className="text-[10px] text-gray-500">~15 Min</div>
        </a>
        <Link to="/contact" className="glass p-4 rounded-xl hover-pop text-center">
          <Mail className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <div className="text-sm font-bold">E-Mail</div>
          <div className="text-[10px] text-gray-500">~24h</div>
        </Link>
        <Link to="/commands" className="glass p-4 rounded-xl hover-pop text-center">
          <BookOpen className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <div className="text-sm font-bold">Befehle</div>
          <div className="text-[10px] text-gray-500">Alle Commands</div>
        </Link>
        <Link to="/suggest" className="glass p-4 rounded-xl hover-pop text-center">
          <Lightbulb className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <div className="text-sm font-bold">Vorschläge</div>
          <div className="text-[10px] text-gray-500">Feature-Ideen</div>
        </Link>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-violet-400" /> Häufige Fragen
        </h2>
        <div className="space-y-3">
          {filtered.map((f, i) => (
            <details key={i} className="glass p-5 rounded-xl cursor-pointer hover-pop">
              <summary className="font-semibold flex items-center justify-between">
                {f.q}
                <span className="text-violet-300">+</span>
              </summary>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-500">Keine Antwort gefunden. Frag uns direkt!</div>
          )}
        </div>
      </div>

      {/* Still need help */}
      <div className="glass-strong p-8 rounded-3xl text-center">
        <MessageSquare className="w-10 h-10 text-violet-300 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Brauchst du mehr Hilfe?</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Unser Team antwortet schnell und persönlich.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
            <Headphones className="w-4 h-4" /> Discord beitreten <ExternalLink className="w-3 h-3" />
          </a>
          <Link to="/contact" className="btn-ghost inline-flex items-center gap-2">
            <Mail className="w-4 h-4" /> Kontakt-Formular
          </Link>
        </div>
      </div>
    </div>
  );
}
