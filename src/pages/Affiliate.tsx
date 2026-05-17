import { Heart, Gift, TrendingUp, Share2, DollarSign, Shield } from "lucide-react";

const steps = [
  { title: "1. Link teilen", desc: "Kopiere deinen persönlichen Partner-Link im Dashboard und teile ihn in deinen Netzwerken.", icon: Share2 },
  { title: "2. Server einladen", desc: "Admins laden BotForge über deinen Link ein und richten mindestens ein Modul ein.", icon: Gift },
  { title: "3. Prämie kassieren", desc: "Erhalte 20% Lifetime-Provision auf alle Premium-Käufe, die über deine eingeladenen Server getätigt werden.", icon: DollarSign },
];

export default function Affiliate() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <TrendingUp className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Partnerprogramm</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Affiliate & <span className="text-gradient">Referral</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Empfehle BotForge an Server-Administratoren weiter und verdiene echtes Geld oder erhalte lebenslangen Premium-Zugang für deinen Server.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl text-center mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 blur-3xl pointer-events-none" />
        <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-black mb-2">Teile die Liebe, erhalte Belohnungen</h2>
        <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6">
          Unser Affiliate-Programm ist für alle offen. Egal ob du ein kleiner Creator oder der Owner eines riesigen Server-Netzwerks bist.
        </p>
        <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
          Am Programm teilnehmen
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5 text-center hover-lift">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-violet-400 animate-pulse" />
              </div>
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="glass p-6 rounded-2xl border border-white/5">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-violet-400" />
          Programmrichtlinien
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
          <li>Spamme deinen Referral-Link nicht in unbeteiligte Discord-Server oder Foren.</li>
          <li>Selbsteinladungen über alternative Accounts sind ungültig.</li>
          <li>Auszahlungen erfolgen ab einem Guthaben von 20€ bequem per PayPal oder Banküberweisung.</li>
        </ul>
      </div>
    </div>
  );
}
