import { Link } from "react-router-dom";
import { Rocket, Bell, ArrowLeft, Calendar } from "lucide-react";

export default function ComingSoon({ pageName }: { pageName: string }) {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center">
      <div className="glass-strong p-12 rounded-3xl text-center max-w-2xl w-full glow-breathe relative overflow-hidden anim-scale">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-pink-500/10 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-6 border border-amber-500/30">
            <Calendar className="w-3 h-3 text-amber-400 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-amber-300">In Entwicklung</span>
          </div>

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center mx-auto mb-6 glow-breathe">
            <Rocket className="w-12 h-12 text-white animate-bounce" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="text-gradient">Coming Soon</span>
          </h1>
          <p className="text-xl text-gray-300 mb-2 font-medium">{pageName}</p>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-8">
            Diese Seite wird aktuell entwickelt und ist bald verfügbar. Fufi arbeitet daran! 🚀
          </p>

          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mb-8">
            {[
              { label: "Design", pct: 100 },
              { label: "Entwicklung", pct: 65 },
              { label: "Launch", pct: 0 },
            ].map((s, i) => (
              <div key={i} className="glass p-3 rounded-xl">
                <div className="text-xs text-gray-400 mb-1">{s.label}</div>
                <div className="text-lg font-black text-gradient">{s.pct}%</div>
                <div className="h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-1000" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
            </Link>
            <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" /> Benachrichtigen lassen
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            Solo-Entwickler <span className="text-violet-400 font-semibold">@Fufi</span> arbeitet so schnell er kann.
          </p>
        </div>
      </div>
    </div>
  );
}
