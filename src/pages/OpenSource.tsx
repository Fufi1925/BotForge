import { Code2, Shield, Lock } from "lucide-react";

export default function OpenSource() {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Lock className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">Proprietär & Sicher</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Unser <span className="text-gradient">Tech-Stack.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">BotForge ist ein proprietärer Bot — der Code wird nicht öffentlich geteilt. Wir hosten, warten und entwickeln alles zentral.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Python 3.11 · discord.py", desc: "Hochperformanter Bot-Core mit asynchroner Event-Verarbeitung.", icon: Code2 },
          { title: "React · Vite · Tailwind", desc: "Blitzschnelles Web-Dashboard mit futuristischem Dark-Mode UI.", icon: Code2 },
          { title: "MongoDB Atlas", desc: "Skalierbare Cloud-Datenbank für Configs, Warns, Levels und Tickets.", icon: Shield },
          { title: "Railway", desc: "Enterprise-Hosting mit Auto-Deploy, Custom Domains und 99.9% SLA.", icon: Lock },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="glass p-6 hover-lift card-shine anim-up" style={{animationDelay:`${i*0.08}s`}}>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
