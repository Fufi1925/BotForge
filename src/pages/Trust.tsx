import { Shield, Lock, CheckCircle, Award, Server, Globe, Eye, FileText } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

const certifications = [
  { name: "DSGVO-konform", desc: "Vollständige Compliance mit EU-Datenschutz", icon: Shield, color: "from-violet-500 to-purple-500" },
  { name: "TLS 1.3 Verschlüsselung", desc: "End-to-End verschlüsselte Verbindungen", icon: Lock, color: "from-cyan-500 to-blue-500" },
  { name: "EU-Hosting", desc: "Server in Frankfurt (Deutschland)", icon: Server, color: "from-amber-500 to-orange-500" },
  { name: "Discord Verified", desc: "Offiziell verifiziert von Discord", icon: CheckCircle, color: "from-emerald-500 to-teal-500" },
];

const principles = [
  { title: "Datensparsamkeit", desc: "Wir speichern nur, was absolut notwendig ist. Keine Nachrichten-Inhalte, keine Voice-Daten." },
  { title: "Volle Transparenz", desc: "Du kannst jederzeit alle deine Daten als JSON exportieren oder vollständig löschen." },
  { title: "Keine Drittanbieter", desc: "Wir verkaufen keine Daten und nutzen keine Tracker. Du bist nicht das Produkt." },
  { title: "Verschlüsselung", desc: "Alle Verbindungen via TLS 1.3, Datenbanken via AES-256, Tokens niemals im Klartext." },
  { title: "Audit-Logs", desc: "Jede Dashboard-Aktion wird protokolliert. Du siehst genau, wer was wann geändert hat." },
  { title: "Backups", desc: "Tägliche Snapshots deiner Konfigurationen — Wiederherstellung jederzeit möglich." },
];

const stats = [
  { value: "847", label: "Server vertrauen uns", icon: Server },
  { value: "248k+", label: "Aktive User", icon: Globe },
  { value: "99.94%", label: "Uptime (30 Tage)", icon: CheckCircle },
  { value: "0", label: "Datenpannen seit Launch", icon: Shield },
];

export default function Trust() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-emerald-500/30 glow-breathe">
          <Shield className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-semibold uppercase tracking-wide">Trust & Security</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Sicherheit, der du <span className="text-gradient">vertrauen kannst.</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Über 800 Communities verlassen sich auf BotForge — weil wir Datenschutz und Zuverlässigkeit kompromisslos ernst nehmen.
        </p>
      </div>

      {/* Trust Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass p-6 text-center hover-pop card-shine in-zoom glow-breathe" style={{ animationDelay: `${i * 0.08}s` }}>
              <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-2 floaty" />
              <div className="text-3xl font-black text-gradient num-glow">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Certifications */}
      <h2 className="text-2xl font-bold mb-6 text-center in-up">Zertifizierungen & Standards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {certifications.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="glass p-6 hover-pop card-shine text-center in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mx-auto mb-4 glow-breathe scale-pulse`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold mb-1 text-glow-hover">{c.name}</h3>
              <p className="text-xs text-gray-400">{c.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Principles */}
      <h2 className="text-2xl font-bold mb-6 text-center in-up">Unsere Prinzipien</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {principles.map((p, i) => (
          <div key={i} className="glass p-6 hover-pop in-left" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-400 scale-pulse" />
              <h3 className="font-bold text-glow-hover">{p.title}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="glass-strong p-10 text-center glow-breathe relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10" />
        <div className="relative z-10">
          <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-3">Du hast volle Kontrolle</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mb-6">
            Lade jederzeit alle deine Daten herunter, ändere oder lösche sie. Es ist dein Server, deine Daten — wir sind nur die Werkzeuge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/privacy" className="btn-primary inline-flex items-center gap-2">
              <FileText className="w-4 h-4" /> Datenschutzerklärung
            </a>
            <a href="/security" className="btn-ghost inline-flex items-center gap-2">
              <Eye className="w-4 h-4" /> Security Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
