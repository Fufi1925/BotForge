import { Link } from "react-router-dom";
import { Users, MessageSquare, Heart, Award, Calendar, Lightbulb } from "lucide-react";
const links = [
  { to: "/partners", icon: Heart, title: "Partner", desc: "Werde offizieller Partner", color: "from-pink-500 to-rose-500" },
  { to: "/testimonials", icon: MessageSquare, title: "Bewertungen", desc: "Stimmen aus der Community", color: "from-cyan-500 to-blue-500" },
  { to: "/events", icon: Calendar, title: "Events", desc: "Kommende Events & Streams", color: "from-amber-500 to-orange-500" },
  { to: "/badges", icon: Award, title: "Badges", desc: "Sammle exklusive Abzeichen", color: "from-violet-500 to-purple-500" },
  { to: "/suggest", icon: Lightbulb, title: "Vorschläge", desc: "Schlage neue Features vor", color: "from-emerald-500 to-teal-500" },
  { to: "/showcase", icon: Users, title: "Showcase", desc: "Erfolgreiche Communities", color: "from-fuchsia-500 to-pink-500" },
];
export default function CommunityHub() {
  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Users className="w-3.5 h-3.5 text-violet-400 animate-pulse" /><span className="font-semibold uppercase tracking-wide">Community Hub</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Werde Teil der <span className="text-gradient">Community.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Über 800 Server, 248k Members und eine wachsende Gemeinschaft von Server-Owners.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((l, i) => {
          const Icon = l.icon;
          return (
            <Link key={i} to={l.to} className="glass p-6 hover-lift card-shine block group anim-up" style={{animationDelay:`${i*0.06}s`}}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center mb-4 group-hover:scale-110 transition glow-breathe`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-gradient transition">{l.title}</h3>
              <p className="text-sm text-gray-400">{l.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
