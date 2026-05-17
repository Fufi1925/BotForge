import { Link } from "react-router-dom";
import { ChevronRight, Shield, Eye } from "lucide-react";

export default function DocsAutoMod() {
  const filters = [
    { name: "Discord Invites", status: "Standard", desc: "Blockt alle unautorisierten discord.gg-Einladungslinks im Chat." },
    { name: "Beleidigungen & Hate Speech", status: "Standard", desc: "KI-gestützter Abgleich mit über 100 verbotenen Wörtern in verschiedenen Sprachen." },
    { name: "Externe Links", status: "Optional", desc: "Erlaubt nur Links, die auf deiner servereigenen Whitelist stehen." },
    { name: "Spam & Flooding", status: "Standard", desc: "Löscht Nachrichten automatisch, wenn ein User mehr als 4-mal in 5 Sekunden schreibt." },
    { name: "Caps-Lock Spam", status: "Standard", desc: "Blockiert Nachrichten, die zu mehr als 70% aus Großbuchstaben bestehen (min. 10 Zeichen)." },
  ];

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link to="/docs" className="hover:text-white transition">Docs</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white">AutoMod 2.0</span>
      </div>

      <h1 className="text-4xl font-black mb-4 text-gradient">AutoMod 2.0 Filter</h1>
      <p className="text-gray-400 mb-8">Schütze deinen Server rund um die Uhr, vollautomatisch und blitzschnell.</p>

      <div className="space-y-8">
        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Shield className="w-4 h-4 text-violet-400" /></div>
            Wie funktioniert AutoMod?
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Unser AutoMod-Core liest eingehende Chat-Nachrichten in weniger als 15 Millisekunden. Wenn ein Verstoß festgestellt wird, 
            wird die Nachricht gelöscht, ein Strike in der MongoDB eingetragen und der User verwarnt.
          </p>
        </section>

        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Eye className="w-4 h-4 text-violet-400" /></div>
            Verfügbare Filter
          </h2>
          <div className="space-y-3">
            {filters.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 justify-between flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <h3 className="font-bold text-sm text-white">{f.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{f.desc}</p>
                </div>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${f.status === 'Standard' ? 'bg-violet-500/20 text-violet-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link to="/docs/moderation" className="text-sm text-gray-400 hover:text-white transition">← Moderation</Link>
        <Link to="/docs/tickets" className="btn-primary text-xs inline-flex items-center gap-1">Tickets lesen <ChevronRight className="w-3 h-3" /></Link>
      </div>
    </div>
  );
}
