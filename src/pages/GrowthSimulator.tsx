import { useState } from "react";
import { TrendingUp, Users, Sparkles, Crown, Target } from "lucide-react";

export default function GrowthSimulator() {
  const [currentMembers, setCurrentMembers] = useState(500);
  const [activeFeatures, setActiveFeatures] = useState({
    automod: true,
    welcome: true,
    levels: true,
    giveaways: true,
  });

  const toggleFeature = (key: "automod" | "welcome" | "levels" | "giveaways") => {
    setActiveFeatures({
      ...activeFeatures,
      [key]: !activeFeatures[key],
    });
  };

  // Einfache, spielerische Wachstumssimulation
  const calculateGrowth = () => {
    let multiplier = 1.05; // Basis-Wachstum 5%
    if (activeFeatures.automod) multiplier += 0.08; // 8% durch Spam-Schutz
    if (activeFeatures.welcome) multiplier += 0.10; // 10% durch Welcome-Cards
    if (activeFeatures.levels) multiplier += 0.12; // 12% durch Aktivitätsanreiz
    if (activeFeatures.giveaways) multiplier += 0.15; // 15% durch Events/Giveaways

    const growth3M = Math.round(currentMembers * Math.pow(multiplier, 3));
    const growth6M = Math.round(currentMembers * Math.pow(multiplier, 6));
    const growth12M = Math.round(currentMembers * Math.pow(multiplier, 12));

    return { growth3M, growth6M, growth12M, multiplier: Math.round((multiplier - 1) * 100) };
  };

  const result = calculateGrowth();

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <TrendingUp className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Community Simulator</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Server-Wachstums <span className="text-gradient">Rechner</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Simuliere spielerisch, wie der Einsatz von BotForge-Modulen die Aktivität, User-Retention und das Wachstum deines Discord-Servers beschleunigen kann.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass p-6 rounded-2xl border border-white/5 h-fit">
          <h2 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-400" />
            Parameter einstellen
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Aktuelle Mitglieder-Zahl</label>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl">
                <Users className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={currentMembers}
                  onChange={(e) => setCurrentMembers(Math.max(1, parseInt(e.target.value) || 0))}
                  className="bg-transparent text-white border-none outline-none flex-1 font-bold font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-3">Aktive Bot-Module</label>
              <div className="space-y-2">
                {[
                  { key: "automod", label: "AutoMod 2.0 (Spam- & Phishing-Schutz)" },
                  { key: "welcome", label: "Welcome Cards (10+ Custom Themes)" },
                  { key: "levels", label: "Level-System (XP & Rollen-Belohnungen)" },
                  { key: "giveaways", label: "Giveaway- & Event-Manager" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleFeature(item.key as any)}
                    className={`w-full p-3 rounded-xl text-left border text-xs font-semibold transition flex justify-between items-center ${
                      activeFeatures[item.key as "automod" | "welcome" | "levels" | "giveaways"]
                        ? "bg-violet-500/20 border-violet-500/40 text-white shadow-inner"
                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    {activeFeatures[item.key as "automod" | "welcome" | "levels" | "giveaways"] && (
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-white">Prognostiziertes Wachstum</h2>
                <p className="text-xs text-gray-400 mt-1">Berechnet basierend auf durchschnittlichen Aktivitätswerten von 800+ Servern.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-gradient">+{result.multiplier}%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Aktivitätsschub</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-xs text-gray-400 mb-1">In 3 Monaten</div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono">{result.growth3M.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-xs text-gray-400 mb-1">In 6 Monaten</div>
                <div className="text-lg sm:text-xl font-bold text-gradient font-mono">{result.growth6M.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-violet-500/20 border border-violet-500/30 rounded-xl">
                <div className="text-xs text-violet-300 mb-1">In 12 Monaten</div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono flex items-center justify-center gap-1">
                  <Crown className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                  {result.growth12M.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <h3 className="font-bold text-white mb-2">Wie kommen diese Zahlen zustande?</h3>
            <p className="mb-3">
              Ein gesicherter, spamfreier Server durch <strong>AutoMod</strong> erhöht die Aufenthaltsdauer neuer User. 
              <strong>Welcome Cards</strong> vermitteln das Gefühl einer einladenden Community.
            </p>
            <p>
              Das <strong>Level-System</strong> motiviert Mitglieder, aktiv am Chat teilzunehmen, um Rangstufen und Rollenbelohnungen freizuschalten. 
              Regelmäßige <strong>Giveaways</strong> binden die Community langfristig.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
