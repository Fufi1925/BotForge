import { useState } from "react";
import { Activity, Bot, Check, Command, Gauge, Music, Save, Shield, Ticket, Users, Zap } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

function Toggle({ on, setOn }: { on: boolean; setOn: (v: boolean) => void }) {
  return <button onClick={() => setOn(!on)} className={`switch ${on ? "on" : ""}`} />;
}

export default function TestDashboardDemo() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  const [automod, setAutomod] = useState(true);
  const [tickets, setTickets] = useState(true);
  const [music, setMusic] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-10 in-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-cyan-500/30 glow-breathe">
          <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-semibold uppercase tracking-wide">Test Dashboard Demo</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Teste das <span className="text-gradient">neue Dashboard.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Eine sichere Demo, die nichts speichert und keine echten Discord-Daten braucht.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="glass p-4 h-fit sticky top-28 in-left">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center font-black text-white glow-breathe">K</div>
            <div>
              <div className="font-bold">Koblenz RP</div>
              <div className="text-xs text-gray-400">523 Members · Demo</div>
            </div>
          </div>
          {[
            { icon: Gauge, label: "Übersicht" },
            { icon: Shield, label: "AutoMod" },
            { icon: Ticket, label: "Tickets" },
            { icon: Music, label: "Music" },
            { icon: Command, label: "Commands" },
          ].map((x, i) => {
            const Icon = x.icon;
            return <button key={x.label} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm mb-1 transition ${i === 0 ? "bg-violet-500/20 text-white border border-violet-500/30" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}><Icon className="w-4 h-4" />{x.label}</button>;
          })}
        </aside>

        <main className="space-y-6">
          <div className="glass p-5 flex items-center justify-between flex-wrap gap-4 in-down">
            <div>
              <h2 className="text-xl font-bold">Live Demo Configuration</h2>
              <p className="text-xs text-gray-400">Alle Schalter sind interaktiv, aber rein lokal.</p>
            </div>
            <button onClick={save} className="btn-primary inline-flex items-center gap-2 text-sm"><Save className="w-4 h-4" /> Speichern testen</button>
          </div>

          {saved && <div className="glass p-4 border border-green-500/30 text-green-300 in-up flex items-center gap-2"><Check className="w-5 h-5" /> Demo gespeichert! Keine echten Daten wurden geaendert.</div>}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Commands", value: "1,248", icon: Command },
              { label: "Members", value: "523", icon: Users },
              { label: "Ping", value: "42ms", icon: Activity },
              { label: "AutoMod", value: automod ? "An" : "Aus", icon: Shield },
            ].map((s, i) => {
              const Icon = s.icon;
              return <div key={s.label} className="glass p-5 hover-pop card-shine in-up" style={{ animationDelay: `${i * 0.07}s` }}><Icon className="w-6 h-6 text-violet-400 mb-2" /><div className="text-2xl font-black text-gradient">{s.value}</div><div className="text-xs text-gray-400">{s.label}</div></div>;
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 hover-pop in-up"><div className="flex items-center justify-between mb-3"><div><h3 className="font-bold">AutoMod</h3><p className="text-xs text-gray-400">Spam, Links, Caps</p></div><Toggle on={automod} setOn={setAutomod} /></div><Zap className="w-8 h-8 text-red-400" /></div>
            <div className="glass p-6 hover-pop in-up del-1"><div className="flex items-center justify-between mb-3"><div><h3 className="font-bold">Tickets</h3><p className="text-xs text-gray-400">Dropdown-System</p></div><Toggle on={tickets} setOn={setTickets} /></div><Ticket className="w-8 h-8 text-amber-400" /></div>
            <div className="glass p-6 hover-pop in-up del-2"><div className="flex items-center justify-between mb-3"><div><h3 className="font-bold">Music</h3><p className="text-xs text-gray-400">Lavalink Player</p></div><Toggle on={music} setOn={setMusic} /></div><Music className="w-8 h-8 text-violet-400" /></div>
          </div>
        </main>
      </div>
    </div>
  );
}