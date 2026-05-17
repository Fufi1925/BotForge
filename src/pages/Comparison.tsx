import { Check, X } from "lucide-react";
const bots = [
  { name: "BotForge", features: [true,true,true,true,true,true,true,true], highlight: true },
  { name: "MEE6", features: [true,true,false,true,false,false,true,false], highlight: false },
  { name: "Dyno", features: [true,false,false,true,true,false,false,false], highlight: false },
  { name: "Carl-bot", features: [true,false,false,false,true,false,true,false], highlight: false },
];
const cats = ["AutoMod KI","Ticket Dropdown","24/7 Music","Web Dashboard","Custom Embeds","Rank Cards","Logging","Economy"];
export default function Comparison() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <h1 className="text-4xl sm:text-5xl font-black mb-3">BotForge vs. <span className="text-gradient">Andere</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Warum BotForge die bessere Wahl ist — Feature für Feature.</p>
      </div>
      <div className="glass rounded-2xl overflow-hidden border border-white/5 in-zoom glow-breathe">
        <div className="grid grid-cols-5 bg-white/5 p-4 text-xs font-bold border-b border-white/5">
          <div>Feature</div>
          {bots.map(b => <div key={b.name} className={`text-center ${b.highlight ? "text-gradient font-black scale-pulse" : "text-gray-400"}`}>{b.name}</div>)}
        </div>
        {cats.map((cat,i) => (
          <div key={i} className="grid grid-cols-5 p-4 border-b border-white/5 hover:bg-white/5 transition in-left" style={{ animationDelay: `${i * 0.04}s` }}>
            <div className="text-sm font-medium">{cat}</div>
            {bots.map(b => (
              <div key={b.name} className="flex justify-center">
                {b.features[i] ? <Check className={`w-5 h-5 transition-transform hover:scale-125 ${b.highlight ? "text-green-400" : "text-gray-500"}`} /> : <X className="w-5 h-5 text-red-400/50" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
