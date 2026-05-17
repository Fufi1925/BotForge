import { BookOpen, Clock, ArrowRight } from "lucide-react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;
const posts = [
  { title: "BotForge v2.5 — Das größte Update aller Zeiten", date: "15. März 2026", excerpt: "43 neue Seiten, Economy-System, Server-Templates, und ein komplett überarbeitetes Dashboard.", tag: "Release", color: "from-violet-500 to-cyan-400" },
  { title: "Wie du deinen Server mit AutoMod vor Raids schützt", date: "8. März 2026", excerpt: "Ein detaillierter Guide, der erklärt, wie du BotForge's Anti-Raid, Anti-Spam und Anti-Phishing Filter einrichtest.", tag: "Tutorial", color: "from-red-500 to-pink-500" },
  { title: "5 Tipps für mehr Aktivität auf deinem Discord-Server", date: "28. Feb 2026", excerpt: "Von Leveling über Giveaways bis Welcome-Cards — so bringst du Leben in deine Community.", tag: "Guide", color: "from-emerald-500 to-teal-500" },
  { title: "Die Zukunft von BotForge: AI-Features", date: "20. Feb 2026", excerpt: "Wir arbeiten an KI-gestützter Moderation, automatischer Sprach-Übersetzung und Smart-Suggestions.", tag: "Roadmap", color: "from-amber-500 to-orange-500" },
];
export default function Blog() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <BookOpen className="w-3.5 h-3.5 text-violet-400 animate-pulse" /><span className="font-semibold uppercase tracking-wide">Blog & News</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Neuigkeiten aus der <span className="text-gradient">Werkstatt.</span></h1>
      </div>
      <div className="space-y-6">
        {posts.map((p, i) => (
          <div key={i} className="glass p-6 hover-lift card-shine relative overflow-hidden anim-up" style={{animationDelay:`${i*0.08}s`}}>
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${p.color}`} />
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-gradient-to-r ${p.color} text-white`}>{p.tag}</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{p.date}</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{p.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{p.excerpt}</p>
            <span className="text-xs text-violet-400 font-semibold inline-flex items-center gap-1 cursor-pointer hover:text-violet-300">Weiterlesen <ArrowRight className="w-3 h-3" /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
