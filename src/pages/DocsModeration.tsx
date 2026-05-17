import { Link } from "react-router-dom";
import { ChevronRight, Shield, MessageSquare } from "lucide-react";

export default function DocsModeration() {
  const commands = [
    { name: "/ban <user> [reason] [duration]", desc: "Bannt ein Mitglied dauerhaft oder temporär mit automatischer DM-Benachrichtigung." },
    { name: "/kick <user> [reason]", desc: "Kickt ein Mitglied und sendet eine DM mit dem Grund und dem ausstellenden Moderator." },
    { name: "/timeout <user> <duration> [reason]", desc: "Setzt einen User in den Timeout. Gültige Zeiten sind z.B. 10m, 1h, 7d." },
    { name: "/warn <user> <reason>", desc: "Verwarnt den User offiziell. Die Verwarnung wird in der MongoDB gespeichert." },
    { name: "/warnings <user>", desc: "Zeigt die Historie aller Verwarnungen eines bestimmten Mitglieds an." },
    { name: "/clear [amount]", desc: "Löscht eine festgelegte Anzahl von Nachrichten im aktuellen Channel (Standard: 10)." },
  ];

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link to="/docs" className="hover:text-white transition">Docs</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white">Moderation</span>
      </div>

      <h1 className="text-4xl font-black mb-4 text-gradient">Moderation & Schutz</h1>
      <p className="text-gray-400 mb-8">Alle wichtigen Befehle, Log-Events und Einstellungen für dein Mod-Team.</p>

      <div className="space-y-8">
        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Shield className="w-4 h-4 text-violet-400" /></div>
            Befehlsübersicht
          </h2>
          <div className="space-y-3">
            {commands.map((cmd, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                <code className="text-sm text-cyan-300 font-mono block mb-1">{cmd.name}</code>
                <p className="text-xs text-gray-400">{cmd.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-violet-400" /></div>
            Automatische DM-Benachrichtigungen
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            BotForge legt großen Wert auf Transparenz. Wenn ein Moderator eine Sanktion ausstellt, sendet der Bot dem betroffenen User eine 
            vollständig formatierte DM-Nachricht mit Grund, ausstellendem Moderator und der Dauer.
          </p>
          <div className="embed-preview border-l-4 border-red-500 bg-black/20 p-4 rounded-xl max-w-md text-xs">
            <div className="font-bold text-red-500 mb-1">⚠️ Mod-Aktion: Timeout</div>
            <div className="text-gray-400 mb-2">Du wurdest auf **Nebula Gaming** in den Timeout versetzt.</div>
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Moderator:</strong> @admin</div>
              <div><strong>Dauer:</strong> 10 Minuten</div>
            </div>
            <div className="mt-2 font-semibold text-gray-300">Grund: Spamming in #general</div>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link to="/docs/setup" className="text-sm text-gray-400 hover:text-white transition">← Erste Schritte</Link>
        <Link to="/docs/automod" className="btn-primary text-xs inline-flex items-center gap-1">AutoMod lesen <ChevronRight className="w-3 h-3" /></Link>
      </div>
    </div>
  );
}
