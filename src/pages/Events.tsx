import { Calendar, Clock } from "lucide-react";
const events = [
  { title: "Double XP Weekend", date: "29. - 31. März 2026", desc: "Verdopple dein XP auf allen BotForge-Servern!", type: "Community", color: "from-violet-500 to-cyan-400" },
  { title: "BotForge v3.0 Launch Party", date: "15. April 2026", desc: "Live-Stream mit Q&A, Giveaways und der Enthüllung neuer Features.", type: "Launch", color: "from-pink-500 to-rose-500" },
  { title: "Partner Server Showcase", date: "1. Mai 2026", desc: "Die besten Partner-Server stellen sich vor. Stimme für deinen Favoriten!", type: "Partner", color: "from-amber-500 to-orange-500" },
];
export default function Events() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Calendar className="w-3.5 h-3.5 text-violet-400 animate-pulse" /><span className="font-semibold uppercase tracking-wide">Events & Happenings</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Kommende <span className="text-gradient">Events.</span></h1>
      </div>
      <div className="space-y-6">
        {events.map((e, i) => (
          <div key={i} className="glass p-6 hover-lift card-shine relative overflow-hidden anim-up" style={{animationDelay:`${i*0.1}s`}}>
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${e.color}`} />
            <div className="flex items-start gap-4 flex-wrap">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${e.color} flex items-center justify-center shrink-0`}>
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-xl">{e.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold">{e.type}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.date}</span>
                </div>
                <p className="text-sm text-gray-300">{e.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
