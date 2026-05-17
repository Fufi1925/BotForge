import { Link } from "react-router-dom";
import { ChevronRight, Download, Shield, Settings } from "lucide-react";

export default function DocsSetup() {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link to="/docs" className="hover:text-white transition">Docs</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white">Erste Schritte</span>
      </div>

      <h1 className="text-4xl font-black mb-4 text-gradient">Erste Schritte & Setup</h1>
      <p className="text-gray-400 mb-8">Lerne, wie du BotForge zu deinem Server hinzufügst und in unter 2 Minuten startklar machst.</p>

      <div className="space-y-8">
        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Download className="w-4 h-4 text-violet-400" /></div>
            1. BotForge einladen
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Nutze den offiziellen Einladungs-Link, um BotForge auf deinem Server zu autorisieren. 
            Stelle sicher, dass du die Berechtigung <strong>Server verwalten</strong> (Manage Server) auf der Ziel-Guild besitzt.
          </p>
          <div className="p-3 bg-black/30 rounded-xl border border-white/5 font-mono text-xs overflow-x-auto mb-4">
            https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
          </div>
          <p className="text-xs text-amber-400 flex items-start gap-1.5 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
            💡 <strong>Tipp:</strong> Um alle Funktionen wie AutoMod, Moderation und Tickets optimal nutzen zu können, benötigt der Bot Administrator-Rechte.
          </p>
        </section>

        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Shield className="w-4 h-4 text-violet-400" /></div>
            2. Rollen-Hierarchie anpassen
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Damit BotForge Moderations-Aktionen an Usern ausführen kann (Mute, Timeout, Kick, Ban), muss die Rolle <strong>BotForge</strong> in der Discord-Rollenliste 
            über den Rollen der zu moderierenden User liegen.
          </p>
          <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside pl-2">
            <li>Öffne die Server-Einstellungen in Discord.</li>
            <li>Gehe zu 'Rollen'.</li>
            <li>Ziehe die Rolle 'BotForge' nach oben.</li>
            <li>Speichere die Änderungen.</li>
          </ul>
        </section>

        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Settings className="w-4 h-4 text-violet-400" /></div>
            3. Dashboard konfigurieren
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Logge dich auf <strong>botforge.app/dashboard</strong> mit deinem Discord-Konto ein, wähle den Server aus und aktiviere deine Wunsch-Module.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
              <h4 className="font-bold mb-1 text-white">AutoMod Filter</h4>
              <p className="text-gray-400">Aktiviere Spam-, Invite- und Caps-Filter im Dashboard.</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
              <h4 className="font-bold mb-1 text-white">Ticket Dropdowns</h4>
              <p className="text-gray-400">Erstelle Kategorien wie 'Support' und richte den Channel ein.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link to="/docs" className="text-sm text-gray-400 hover:text-white transition">← Zurück zur Übersicht</Link>
        <Link to="/docs/moderation" className="btn-primary text-xs inline-flex items-center gap-1">Moderation lesen <ChevronRight className="w-3 h-3" /></Link>
      </div>
    </div>
  );
}
