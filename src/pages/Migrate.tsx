import { ArrowRight, RefreshCw, Check } from "lucide-react";
const otherBots = ["MEE6", "Dyno", "Carl-bot", "YAGPDB", "ProBot", "Arcane"];
export default function Migrate() {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <RefreshCw className="w-3.5 h-3.5 text-violet-400 animate-spin" /><span className="font-semibold uppercase tracking-wide">Migration Tool</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Wechsel zu <span className="text-gradient">BotForge.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Migriere von jedem anderen Bot — wir machen den Umstieg kinderleicht.</p>
      </div>
      <div className="glass p-8 text-center anim-scale glow-violet relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 pointer-events-none" />
        <h2 className="text-xl font-bold mb-6 relative z-10">Von welchem Bot wechselst du?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
          {otherBots.map((bot, i) => (
            <button key={i} className="glass p-4 hover-lift text-center font-bold text-sm hover:bg-violet-500/20 hover:border-violet-500/30 transition border border-white/5 rounded-xl">
              {bot} <ArrowRight className="w-4 h-4 inline ml-1 text-violet-400" /> BotForge
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 space-y-3 anim-up anim-d3">
        {["Automatische Level-Übernahme von MEE6","Ticket-Kategorien 1:1 übertragen","AutoMod-Regeln intelligent konvertiert","Rollen-Zuweisungen bleiben erhalten"].map((f,i) => (
          <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl">
            <Check className="w-5 h-5 text-green-400 shrink-0" /><span className="text-sm">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
