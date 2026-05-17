import { Link } from "react-router-dom";
import { Clock, AlertTriangle, Cpu, Check } from "lucide-react";

const PAGE_VISIBLE = true;

const planned = [
  {
    title: "wavelink v3 Migration",
    time: "25. April 2026 · 03:00 – 04:30 UTC",
    impact: "Kurze Unterbrechung des Musik-Players (5–10 Min) bei der Neuverbindung.",
    scope: "Lavalink Audio-Server",
    status: "Geplant",
  },
  {
    title: "MongoDB Atlas Cluster Upgrade",
    time: "10. Mai 2026 · 02:00 – 02:15 UTC",
    impact: "Dashboard-Einstellungen und XP-Updates max. 3 Minuten offline. Bot bleibt im Chat aktiv.",
    scope: "Datenbank & Cache",
    status: "Geplant",
  },
];

const past = [
  { title: "Captcha-System Update", time: "12. März 2026", status: "Abgeschlossen" },
  { title: "Ticket-Embed Editor Rework", time: "28. Februar 2026", status: "Abgeschlossen" },
  { title: "Theme-System eingeführt", time: "15. Februar 2026", status: "Abgeschlossen" },
];

export default function Maintenance() {
  if (!PAGE_VISIBLE) return null;

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30">
          <Clock className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">Geplante Wartungen</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Wartungs-<span className="text-gradient">Kalender</span></h1>
        <p className="text-gray-400 max-w-2xl">Wir informieren transparent über geplante Updates, Knoten-Neustarts und Server-Upgrades.</p>
      </div>

      <div className="space-y-4 mb-12">
        <h2 className="text-xl font-bold mb-2">Anstehend</h2>
        {planned.map((m, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-violet-500/10 hover-pop">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-t-2xl" />
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{m.title}</h3>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    {m.time}
                  </div>
                </div>
              </div>
              <span className="text-[10px] uppercase px-2.5 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 font-bold">
                {m.status}
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-3">{m.impact}</p>
            <div className="text-xs text-gray-500"><strong>Betroffen:</strong> {m.scope}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-2">Abgeschlossen</h2>
        {past.map((p, i) => (
          <div key={i} className="glass p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-semibold text-sm">{p.title}</div>
                <div className="text-xs text-gray-500">{p.time}</div>
              </div>
            </div>
            <span className="text-[10px] uppercase px-2 py-1 bg-green-500/10 text-green-300 rounded">
              {p.status}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/status" className="text-violet-400 hover:text-violet-300 text-sm">← Zurück zum Live-Status</Link>
      </div>
    </div>
  );
}
