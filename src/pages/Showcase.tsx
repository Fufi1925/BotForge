import { Sparkles, ExternalLink, Users, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PAGE_VISIBLE = true;

const showcases = [
  {
    name: "Koblenz RP",
    desc: "Größte deutsche Roleplay-Community aus Koblenz. Nutzt BotForge für Hausverkauf, Waffenschein-Anträge, Fraktion-Bewerbungen.",
    img: "🏙️",
    members: "523+",
    color: "from-violet-500 to-pink-500",
    verified: true,
    link: "https://discord.gg/koblenzrp",
    badges: ["Ticket-System", "Voice-Support", "Welcome"],
  },
];

const placeholders = [
  { color: "from-cyan-500 to-blue-500", img: "🎮" },
  { color: "from-emerald-500 to-teal-500", img: "📚" },
  { color: "from-amber-500 to-orange-500", img: "⚔️" },
  { color: "from-pink-500 to-rose-500", img: "🎵" },
  { color: "from-slate-500 to-gray-500", img: "💻" },
];

export default function Showcase() {
  if (!PAGE_VISIBLE) return null;
  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Server, die <span className="text-gradient">BotForge nutzen.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Inspiration für deinen eigenen Server.</p>
      </div>

      {/* Featured */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 fill-amber-300 text-amber-300" /> Verifizierte Partner
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {showcases.map((s, i) => (
          <a key={i} href={s.link} target="_blank" rel="noreferrer" className="glass-strong p-8 rounded-3xl hover-pop card-shine border-2 border-amber-500/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-full flex items-center gap-1 font-bold">
              <Star className="w-2.5 h-2.5 fill-amber-300" /> VERIFIZIERT
            </div>
            <div className="text-6xl mb-4">{s.img}</div>
            <h3 className="text-2xl font-black mb-2">{s.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Users className="w-4 h-4" /> {s.members} Members · Online
            </div>
            <p className="text-sm text-gray-300 mb-4">{s.desc}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {s.badges.map((b, j) => (
                <span key={j} className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2 py-1 rounded">{b}</span>
              ))}
            </div>
            <span className="text-sm text-amber-300 inline-flex items-center gap-1 font-semibold">
              Server beitreten <ExternalLink className="w-3 h-3" />
            </span>
          </a>
        ))}
      </div>

      {/* Coming Soon Slots */}
      <h2 className="text-xl font-bold mb-4">Hier könnte dein Server stehen.</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {placeholders.map((p, i) => (
          <div key={i} className="glass p-6 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center min-h-[180px]">
            <div className={`text-4xl opacity-40 mb-3`}>{p.img}</div>
            <div className="text-xs text-gray-500">Verfügbarer Slot</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="glass-strong p-10 rounded-3xl text-center">
        <Heart className="w-10 h-10 text-pink-400 mx-auto mb-3 fill-pink-400" />
        <h2 className="text-3xl font-black mb-2">Du willst hier stehen?</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Werde Partner — Plus gratis, Werbung, Verified-Badge.</p>
        <Link to="/partners" className="btn-primary inline-flex items-center gap-2 hover-pop">
          Partner werden <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
