import { useState } from "react";
import { Award, Search, Sparkles, Heart, Trophy, Bot } from "lucide-react";

const PAGE_VISIBLE = true;

const RARITIES: any = {
  common: { label: "Common", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  rare: { label: "Rare", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  epic: { label: "Epic", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  legendary: { label: "Legendary", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  mythic: { label: "Mythic", color: "bg-gradient-to-r from-pink-500/30 to-violet-500/30 text-pink-200 border-pink-500/40" },
};

const badges = [
  // Module nutzen
  { emoji: "🎫", name: "First Ticket", desc: "Erstes Ticket erstellt", category: "Module", rarity: "common", color: "from-amber-500 to-orange-500" },
  { emoji: "📥", name: "Ticket Pro", desc: "100 Tickets bearbeitet", category: "Module", rarity: "rare", color: "from-amber-500 to-orange-500" },
  { emoji: "🏆", name: "Ticket Master", desc: "1.000 Tickets bearbeitet", category: "Module", rarity: "epic", color: "from-amber-500 to-orange-500" },
  { emoji: "🎧", name: "Voice Hero", desc: "Voice-Support 50x übernommen", category: "Module", rarity: "rare", color: "from-blue-500 to-cyan-500" },
  { emoji: "🛡️", name: "Guardian", desc: "Guild Protection aktiviert", category: "Module", rarity: "common", color: "from-emerald-500 to-teal-500" },
  { emoji: "🚨", name: "Anti-Raid", desc: "Raid erfolgreich abgewehrt", category: "Module", rarity: "epic", color: "from-red-500 to-rose-500" },
  { emoji: "🎵", name: "Music Lover", desc: "1.000 Songs abgespielt", category: "Module", rarity: "rare", color: "from-violet-500 to-purple-500" },
  { emoji: "📊", name: "Stats Lover", desc: "Server Stats aktiviert", category: "Module", rarity: "common", color: "from-cyan-500 to-blue-500" },
  { emoji: "🎁", name: "Engagement", desc: "Server-Tag verwendet", category: "Module", rarity: "common", color: "from-orange-500 to-amber-500" },

  // Aktivität
  { emoji: "🔥", name: "On Fire", desc: "7-Tage-Streak", category: "Aktivität", rarity: "rare", color: "from-red-500 to-orange-500" },
  { emoji: "⚡", name: "Hyperactive", desc: "30-Tage-Streak", category: "Aktivität", rarity: "epic", color: "from-amber-500 to-yellow-500" },
  { emoji: "💪", name: "Unstoppable", desc: "100-Tage-Streak", category: "Aktivität", rarity: "legendary", color: "from-fuchsia-500 to-pink-500" },
  { emoji: "🌙", name: "Night Owl", desc: "Aktiv 0–4 Uhr", category: "Aktivität", rarity: "rare", color: "from-indigo-500 to-purple-500" },

  // Premium
  { emoji: "👑", name: "BotForge Plus", desc: "Aktives Plus-Abo", category: "Premium", rarity: "epic", color: "from-amber-500 to-yellow-500" },
  { emoji: "💎", name: "Founder", desc: "Plus seit Tag 1", category: "Premium", rarity: "legendary", color: "from-cyan-500 to-blue-500" },

  // Loyalty
  { emoji: "💜", name: "BotForge Lover", desc: "30 Tage aktiv", category: "Loyalty", rarity: "rare", color: "from-violet-500 to-purple-500" },
  { emoji: "🌹", name: "Faithful", desc: "90 Tage aktiv", category: "Loyalty", rarity: "epic", color: "from-pink-500 to-rose-500" },
  { emoji: "🐛", name: "Bug Hunter", desc: "Bug gemeldet", category: "Loyalty", rarity: "epic", color: "from-red-500 to-pink-500" },
  { emoji: "💡", name: "Idea Bringer", desc: "Feature-Vorschlag", category: "Loyalty", rarity: "rare", color: "from-amber-500 to-yellow-500" },

  // Special
  { emoji: "🏙️", name: "Koblenz RP", desc: "Offizieller Partner", category: "Special", rarity: "mythic", color: "from-violet-500 to-cyan-400" },
  { emoji: "🤝", name: "Partner", desc: "BotForge Partner", category: "Special", rarity: "mythic", color: "from-amber-500 to-orange-500" },
  { emoji: "👨‍💻", name: "Developer", desc: "Code-Contribution", category: "Special", rarity: "legendary", color: "from-cyan-500 to-blue-500" },
];

const categories = ["Alle", ...Array.from(new Set(badges.map(b => b.category)))];

export default function Badges() {
  if (!PAGE_VISIBLE) return null;
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Alle");
  const [activeRarity, setActiveRarity] = useState<string>("all");

  const filtered = badges.filter(b => {
    if (activeCat !== "Alle" && b.category !== activeCat) return false;
    if (activeRarity !== "all" && b.rarity !== activeRarity) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30">
          <Award className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">{badges.length} Badges</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Sammle <span className="text-gradient">Badges.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Abzeichen für Aktivität, Loyalität, Premium und Special-Achievements.</p>
      </div>

      {/* Filter */}
      <div className="glass p-4 mb-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Badge suchen..."
              className="w-full pl-11 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm outline-none focus:border-violet-500/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setActiveRarity("all")} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeRarity === "all" ? "bg-violet-500 text-white" : "bg-white/5 text-gray-400"}`}>Alle</button>
            {Object.keys(RARITIES).map(r => (
              <button key={r} onClick={() => setActiveRarity(r)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${activeRarity === r ? RARITIES[r].color : "bg-white/5 text-gray-400 border-white/10"}`}>
                {RARITIES[r].label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-3 pt-3 border-t border-white/5">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} className={`px-3 py-1 rounded-md text-xs font-medium ${activeCat === cat ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-4">{filtered.length} Badges gefunden</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
        {filtered.map((b, i) => {
          const rarity = RARITIES[b.rarity];
          return (
            <div key={i} className="glass p-5 rounded-2xl hover-pop card-shine text-center group">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center mx-auto mb-3 text-3xl group-hover:scale-110 transition`}>
                {b.emoji}
              </div>
              <h3 className="font-bold text-sm mb-1">{b.name}</h3>
              <p className="text-[11px] text-gray-400 mb-3 min-h-[32px]">{b.desc}</p>
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${rarity.color}`}>
                {rarity.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* How to earn */}
      <div className="glass-strong p-8 rounded-3xl text-center">
        <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">So verdienst du Badges</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">Automatisch beim Erfüllen der Bedingungen.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { i: Bot, t: "Nutze den Bot", d: "Aktivität wird belohnt" },
            { i: Heart, t: "Bleib treu", d: "Loyalty zahlt sich aus" },
            { i: Sparkles, t: "Sei kreativ", d: "Geheime Achievements" },
          ].map((x, i) => {
            const Ic = x.i;
            return (
              <div key={i} className="glass p-4 rounded-xl">
                <Ic className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                <div className="font-bold text-sm mb-1">{x.t}</div>
                <div className="text-xs text-gray-400">{x.d}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
