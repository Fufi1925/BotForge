import { Video, Play } from "lucide-react";
const tutorials = [
  { title: "BotForge Setup in 2 Minuten", duration: "2:34", views: "12.4k", cat: "Getting Started" },
  { title: "AutoMod perfekt konfigurieren", duration: "5:18", views: "8.2k", cat: "AutoMod" },
  { title: "Ticket-Dropdown erstellen", duration: "3:45", views: "6.7k", cat: "Tickets" },
  { title: "Music-Player Masterclass", duration: "7:12", views: "4.3k", cat: "Music" },
  { title: "Level-System & Rank-Cards", duration: "4:56", views: "5.1k", cat: "Levels" },
  { title: "Custom Commands Tutorial", duration: "6:23", views: "3.8k", cat: "Commands" },
  { title: "Welcome-Cards designen", duration: "4:01", views: "7.9k", cat: "Welcome" },
  { title: "Dashboard Deep-Dive", duration: "9:45", views: "2.1k", cat: "Dashboard" },
];
export default function Tutorials() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Video className="w-3.5 h-3.5 text-violet-400 animate-pulse" /><span className="font-semibold uppercase tracking-wide">Video Tutorials</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Lerne <span className="text-gradient">visuell.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Schritt-für-Schritt Video-Anleitungen für alle BotForge-Module.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tutorials.map((t, i) => (
          <div key={i} className="glass p-5 hover-lift card-shine flex gap-4 anim-up" style={{animationDelay:`${i*0.05}s`}}>
            <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 flex items-center justify-center shrink-0 border border-white/10">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">{t.title}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{t.duration}</span><span>{t.views} Views</span><span className="text-violet-400">{t.cat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
