import { Crown, Sparkles } from "lucide-react";

const verifiedGuilds = [
  { name: "Aether Gaming", tag: "AEG", tier: "Platinum Partner", members: "18,9k", logo: "🌌" },
  { name: "Prism eSports", tag: "PRM", tier: "Platinum Partner", members: "14,2k", logo: "⚡" },
  { name: "Valor Alliance", tag: "VAL", tier: "Gold Partner", members: "9,4k", logo: "🛡️" },
  { name: "Cyber Ravens", tag: "CRV", tier: "Gold Partner", members: "7,8k", logo: "🦅" },
];

export default function GuildPartners() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Crown className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Verifizierte Gilden</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Gilden & <span className="text-gradient">eSports</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Wir unterstützen professionelle Gaming-Clans, eSports-Veranstalter und Gilden mit exklusivem Custom Branding und dedizierter Lavalink-Kapazität.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {verifiedGuilds.map((guild, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4 hover-lift">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-3xl shadow-xl">
              {guild.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">{guild.name}</h3>
                <span className="text-[9px] font-bold bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded">
                  [{guild.tag}]
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{guild.members} aktive Spieler</p>
              <span className="text-xs font-semibold text-gradient">{guild.tier}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-3xl text-center max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 blur-3xl pointer-events-none" />
        <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold mb-2">Bewirb deine Gilde</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
          Erhalte exklusive Gilden-Badges auf deiner Web-Statistik, priorisierte Audio-Server und Support-Rechte für dein Management.
        </p>
        <a href="mailto:guilds@botforge.app" className="btn-primary inline-flex items-center gap-2 justify-center">
          Jetzt bewerben
        </a>
      </div>
    </div>
  );
}
