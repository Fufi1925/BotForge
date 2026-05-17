import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
const jobs = [
  { title: "Python Bot Developer", type: "Remote", time: "Teilzeit", desc: "Entwickle neue Cogs und Features für den BotForge Core in Python 3.11.", color: "from-violet-500 to-purple-500" },
  { title: "React Frontend Developer", type: "Remote", time: "Freelance", desc: "Baue neue Dashboard-Module und Landing-Pages mit React, Vite und Tailwind.", color: "from-cyan-500 to-blue-500" },
  { title: "Community Manager", type: "Remote", time: "Vollzeit", desc: "Leite unser Discord-Support-Team und organisiere Community-Events.", color: "from-pink-500 to-rose-500" },
  { title: "Technical Writer", type: "Remote", time: "Freelance", desc: "Schreibe Dokumentation, Guides und Blog-Posts für BotForge.", color: "from-emerald-500 to-teal-500" },
];
export default function Jobs() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Briefcase className="w-3.5 h-3.5 text-violet-400 animate-pulse" /><span className="font-semibold uppercase tracking-wide">Karriere</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Arbeite mit <span className="text-gradient">uns.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Wir suchen leidenschaftliche Entwickler, Designer und Community-Manager.</p>
      </div>
      <div className="space-y-5">
        {jobs.map((j, i) => (
          <div key={i} className="glass p-6 hover-lift card-shine relative overflow-hidden anim-up" style={{animationDelay:`${i*0.08}s`}}>
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${j.color}`} />
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-bold text-lg mb-1">{j.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{j.type}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{j.time}</span>
                </div>
                <p className="text-sm text-gray-300">{j.desc}</p>
              </div>
              <a href="mailto:jobs@botforge.app" className="btn-primary text-xs inline-flex items-center gap-1 shrink-0">Bewerben <ArrowRight className="w-3 h-3" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
