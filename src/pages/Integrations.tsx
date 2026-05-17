import { Plug } from "lucide-react";
const items = [
  { name: "Twitch", desc: "Stream-Benachrichtigungen in deinen Discord-Channel", icon: "📺", status: "Live" },
  { name: "YouTube", desc: "Neue Videos automatisch posten", icon: "▶️", status: "Live" },
  { name: "GitHub", desc: "Commits, PRs und Issues tracken", icon: "🐙", status: "Beta" },
  { name: "Spotify", desc: "Now-Playing Status und Playlist-Import", icon: "🎧", status: "Live" },
  { name: "Reddit", desc: "Subreddit-Feed direkt im Discord", icon: "📰", status: "Geplant" },
  { name: "Steam", desc: "Spieler-Status und Spiel-Benachrichtigungen", icon: "🎮", status: "Geplant" },
];
export default function Integrations() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Plug className="w-3.5 h-3.5 text-violet-400" /><span className="font-semibold uppercase tracking-wide">Integrationen</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Verbinde <span className="text-gradient">alles.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Erweitere BotForge mit Drittanbieter-Diensten und automatisiere deinen kompletten Server.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div key={i} className="glass p-6 hover-lift card-shine anim-up" style={{animationDelay:`${i*0.06}s`}}>
            <div className="text-4xl mb-3">{item.icon}</div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.status === "Live" ? "bg-green-500/20 text-green-300" : item.status === "Beta" ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-gray-400"}`}>{item.status}</span>
            </div>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
