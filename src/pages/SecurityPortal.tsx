import { Shield, Lock, Key, Eye, CheckCircle } from "lucide-react";

const standards = [
  { title: "End-to-End TLS 1.3", desc: "Sämtlicher Traffic zwischen Browser, Dashboard-API auf Railway und MongoDB Atlas ist verschlüsselt.", icon: Lock },
  { title: "DSGVO Konformität", desc: "Wir speichern keine Nachrichten-Verläufe oder Voice-Streams. Log-Einträge werden nach 30 Tagen gelöscht.", icon: Shield },
  { title: "Rollen-Verschlüsselung", desc: "Zugangsdaten und Session-Tokens aus Discord OAuth2 werden verschlüsselt in Web-Sessions abgelegt.", icon: Key },
  { title: "Kein Data-Tracking", desc: "Wir verkaufen keine Server-Aktivitäten. Keine Tracker oder Drittanbieter-Cookies.", icon: Eye },
];

export default function SecurityPortal() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Shield className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Sicherheits-Zentrum</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Sicherheit & <span className="text-gradient">Datenschutz</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Erfahre mehr über unsere erstklassigen Sicherheits-Standards, Datenminimierung und wie wir deine Discord-Server-Daten schützen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {standards.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover-lift flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-400">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass p-8 rounded-3xl border border-white/5">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
          Unser Versprechen an Server-Admins
        </h2>
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            Als Public-Bot, der für Hunderte von Servern gebaut wurde, nehmen wir den Schutz deiner Community extrem ernst. 
            Wir fordern nur Berechtigungen an, die absolut notwendig sind, und protokollieren jeden API-Aufruf transparent in den Audit-Logs.
          </p>
          <p>
            Solltest du jemals alle Daten deines Servers aus unserer MongoDB löschen wollen, kannst du dies mit nur einem Klick im 
            Dashboard unter <strong>Gefahrenzone</strong> veranlassen. Wir löschen alle zugehörigen Backups und Einträge rückstandslos.
          </p>
        </div>
      </div>
    </div>
  );
}
