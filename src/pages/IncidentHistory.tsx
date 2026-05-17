import { Link } from "react-router-dom";
import { Check, AlertTriangle, Server, Clock } from "lucide-react";

const incidents = [
  {
    title: "Gateway-Verbindungsunterbrechung",
    date: "12. Februar 2026",
    status: "Behoben",
    desc: "Discord erlebte eine weltweite Störung ihrer Gateway-Server. BotForge konnte sich temporär nicht verbinden. Nach 45 Minuten wurde die Verbindung automatisch wiederhergestellt.",
    impact: "Hoch",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Geplante Datenbank-Wartung",
    date: "28. Januar 2026",
    status: "Abgeschlossen",
    desc: "Unser MongoDB Atlas Cluster wurde auf Version 7.0 aktualisiert. Die API war für etwa 2 Minuten im Read-Only Modus. Alle Daten wurden erfolgreich migriert.",
    impact: "Gering",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Lavalink Node 3 Ausfall",
    date: "10. Januar 2026",
    status: "Behoben",
    desc: "Einer unserer Musik-Knoten stürzte aufgrund eines Speicherlecks ab. Die wavelink-Bibliothek leitete betroffene Streams nahtlos auf Node 1 um. Defekter Knoten wurde neu gestartet.",
    impact: "Mittel",
    color: "from-amber-500 to-orange-500",
  },
];

export default function IncidentHistory() {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Server className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">System-Historie</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Incident <span className="text-gradient">History</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Ein vollständiges und transparentes Archiv aller vergangenen Serverwartungen, API-Ausfälle und Discord Gateway-Störungen.
        </p>
      </div>

      <div className="space-y-6">
        {incidents.map((inc, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden hover-lift">
            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${inc.color}`} />
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  {inc.status === "Behoben" || inc.status === "Abgeschlossen" ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{inc.title}</h2>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {inc.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-300">
                  Einfluss: {inc.impact}
                </span>
                <span className="text-[10px] uppercase px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-green-300 font-bold">
                  {inc.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {inc.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/status" className="text-violet-400 hover:text-violet-300 text-sm inline-flex items-center gap-2">
          ← Zurück zum Live-Status
        </Link>
      </div>
    </div>
  );
}
