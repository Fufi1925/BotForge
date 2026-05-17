import { Globe, Code, Heart, Sparkles, Crown, Mail, Coffee, Zap } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = (
  <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center">
    <div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div>
  </div>
);

const skills = [
  { name: "Python", lvl: 95, color: "from-blue-500 to-cyan-500" },
  { name: "React + TypeScript", lvl: 90, color: "from-cyan-500 to-blue-500" },
  { name: "Discord API", lvl: 100, color: "from-violet-500 to-purple-500" },
  { name: "MongoDB", lvl: 85, color: "from-emerald-500 to-teal-500" },
  { name: "Tailwind CSS", lvl: 95, color: "from-cyan-500 to-blue-500" },
  { name: "Railway Hosting", lvl: 90, color: "from-fuchsia-500 to-pink-500" },
];

const stats = [
  { v: "1", l: "Solo Developer", icon: Crown },
  { v: "24/7", l: "Verfügbar", icon: Zap },
  { v: "1000+", l: "Stunden investiert", icon: Coffee },
  { v: "100%", l: "Leidenschaft", icon: Heart },
];

export default function Team() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Solo Developer</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Hinter <span className="text-gradient">BotForge</span> steht…
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          BotForge wird komplett von einer Person entwickelt, gehostet und gewartet. Lerne den Macher kennen.
        </p>
      </div>

      {/* Hero Card — Fufi */}
      <div className="glass-strong p-10 rounded-3xl mb-12 anim-scale relative overflow-hidden glow-breathe">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-pink-500/10" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative">
              <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-6xl font-black text-white glow-breathe">
                F
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-amber-500 border-4 border-[#0a0a14] flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-4 border-[#0a0a14] pulse-dot" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2 flex-wrap">
              <h2 className="text-3xl font-black">Fufi</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-violet-500 to-cyan-400 px-2 py-0.5 rounded text-white">
                Founder & Solo-Dev
              </span>
            </div>
            <div className="text-sm text-violet-300 mb-4 font-mono">@fufi · ID: 1303627964734246944</div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Lead Developer, Frontend Designer, Backend Architect, DevOps Engineer, Community Manager und Coffee-Drinker.
              Ich entwickle BotForge komplett alleine — von der ersten Code-Zeile in Python bis zum letzten Pixel im Dashboard.
              Mein Ziel: <span className="text-gradient font-bold">Der beste Discord-Bot</span>, den es je gab.
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {["Python Master", "React Wizard", "Railway Engineer", "Coffee Addict", "Solo Hustler"].map((b, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10 px-2 py-1 rounded">
                  {b}
                </span>
              ))}
            </div>

            <div className="flex gap-3 justify-center md:justify-start">
              <a href="mailto:fufi@botforge.app" className="btn-primary text-sm inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Kontakt
              </a>
              <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="btn-ghost text-sm inline-flex items-center gap-2">
                <Globe className="w-4 h-4" /> Discord
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass p-6 text-center hover-lift card-shine anim-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <Icon className="w-8 h-8 text-violet-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-gradient">{s.v}</div>
              <div className="text-xs text-gray-400 mt-1">{s.l}</div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      <div className="glass p-8 rounded-3xl mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Code className="w-5 h-5 text-violet-400" />
          Tech-Stack
        </h2>
        <div className="space-y-4">
          {skills.map((s, i) => (
            <div key={i} className="anim-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-semibold">{s.name}</span>
                <span className="text-xs text-gray-400">{s.lvl}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${s.color} transition-all duration-1000`}
                  style={{ width: `${s.lvl}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="glass p-8 rounded-3xl mb-12 anim-up">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-400" />
          Die Story
        </h2>
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            BotForge entstand aus dem Wunsch, einen Discord-Bot zu bauen, der <strong className="text-white">wirklich alles</strong> kann —
            ohne überladene Dashboards, ohne versteckte Premium-Tricks, ohne Schnickschnack.
          </p>
          <p>
            Ich, <strong className="text-violet-300">Fufi</strong>, bin ein leidenschaftlicher Solo-Entwickler aus Deutschland.
            Mit BotForge möchte ich Server-Owner endlich ein <strong className="text-white">modernes, schnelles und kostenloses</strong> All-in-One Tool an die Hand geben.
          </p>
          <p>
            Alles, was du auf dieser Website siehst — die 49+ Seiten, das Dashboard, der Bot mit 100+ Commands, das Railway-Hosting —
            ist <strong className="text-white">von mir gebaut</strong>. Kein Team, keine Investoren, kein Marketing-Geblubber.
            Einfach <strong className="text-gradient">ehrliche Software</strong> für eine Community, die ich liebe.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-strong p-8 rounded-3xl text-center relative overflow-hidden glow-breathe">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 pointer-events-none" />
        <Heart className="w-10 h-10 text-pink-400 mx-auto mb-3 animate-bounce fill-pink-400" />
        <h3 className="text-2xl font-bold mb-2">Unterstütze die Entwicklung</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
          BotForge ist und bleibt kostenlos. Wenn du den Bot magst, freue ich mich über jedes Feedback und jede neue Community auf dem Bot!
        </p>
        <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
          <Heart className="w-4 h-4 fill-white" /> Discord beitreten
        </a>
      </div>
    </div>
  );
}
