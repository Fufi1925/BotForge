import { Coins, ShoppingCart, Dice1, TrendingUp, Gift } from "lucide-react";
const features = [
  { icon: Coins, title: "Virtuelle Währung", desc: "Jeder Server hat seine eigene Coin-Währung. User verdienen Coins durch Aktivität." },
  { icon: ShoppingCart, title: "Rollen-Shop", desc: "Admins erstellen kaufbare Rollen und Items, die User mit ihren Coins erwerben." },
  { icon: Dice1, title: "Gambling", desc: "Coinflip, Slots, Blackjack — mit konfigurierbaren Limits und Cooldowns." },
  { icon: TrendingUp, title: "Investments", desc: "User können in fiktive Aktien investieren, deren Kurse sich täglich ändern." },
  { icon: Gift, title: "Daily Rewards", desc: "Täglicher Claim mit Login-Streak. 7-Tage-Streaks geben Bonus-Coins." },
];
export default function Economy() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-amber-500/30 glow-breathe">
          <Coins className="w-3.5 h-3.5 text-amber-400" /><span className="font-semibold uppercase tracking-wide">Economy System</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Server <span className="text-gradient">Economy.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Coins, Shops, Gambling und Investments — das komplette Wirtschaftssystem für deinen Discord.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass p-6 hover-lift card-shine flex gap-4 anim-up" style={{animationDelay:`${i*0.08}s`}}>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-amber-400" />
              </div>
              <div><h3 className="font-bold mb-1">{f.title}</h3><p className="text-sm text-gray-400">{f.desc}</p></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
