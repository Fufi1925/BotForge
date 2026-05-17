import { Heart, Check, Star, Users, ExternalLink, Crown, Gift, ArrowRight } from "lucide-react";
import { useNumbers } from "../hooks/useNumbers";

const PAGE_VISIBLE = true;

export default function Partners() {
  if (!PAGE_VISIBLE) return null;
  const n = useNumbers();

  return (
    <div className="pt-28 pb-20 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12 in-up">
        <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4 fill-pink-400 float-y" />
        <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-300 mb-4">
          PARTNER-PROGRAMM
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-4">Werde Partner.</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Kostenloses Plus, Werbung auf der Startseite, Verified-Badge und direkter Dev-Kontakt.
        </p>
      </div>

      {/* CURRENT PARTNERS */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Aktuelle Partner</div>
          <h2 className="text-2xl font-bold">Diese Communities vertrauen uns</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href={n.partner.link} target="_blank" rel="noreferrer"
             className="glass-strong p-8 rounded-3xl hover-pop card-shine border-2 border-amber-500/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full flex items-center gap-1 font-bold">
              <Star className="w-3 h-3 fill-amber-300" /> VERIFIZIERT
            </div>
            <div className="text-7xl mb-4">{n.partner.icon}</div>
            <h3 className="text-3xl font-black mb-2">{n.partner.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Users className="w-4 h-4" /> {n.partner.members} Members · Online
            </div>
            <p className="text-sm text-gray-300 mb-6">Die größte deutsche Roleplay-Community aus Koblenz. Aktiv, freundlich, professionell.</p>
            <span className="inline-flex items-center gap-1 text-sm text-amber-300 font-semibold">
              Beitreten <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Empty Slot */}
          <div className="glass p-8 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center">
            <div className="text-7xl opacity-30 mb-4">?</div>
            <h3 className="text-xl font-bold mb-2">Dein Server hier</h3>
            <p className="text-sm text-gray-400 mb-4">Werde der nächste Partner.</p>
            <a href="mailto:fufi@botforge.app?subject=Partner-Bewerbung" className="btn-primary inline-flex items-center gap-2">
              <Heart className="w-4 h-4 fill-white" /> Bewerben
            </a>
          </div>
        </div>
      </div>

      {/* VORTEILE */}
      <div className="glass-strong rounded-3xl p-10 mb-16">
        <div className="text-center mb-10">
          <Gift className="w-10 h-10 text-violet-300 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-3">Deine 6 Vorteile</h2>
          <p className="text-gray-400">Diese Vorteile bekommen alle Partner — kostenlos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { i: Crown, t: "Plus geschenkt", d: `Spare ${n.pricing.plus_price.toFixed(2)}${n.pricing.currency}/Monat — lebenslang.`, c: "amber" },
            { i: Star, t: "Featured auf Startseite", d: "Dein Server prominent platziert.", c: "pink" },
            { i: Check, t: "Verified Badge", d: "Goldenes Stern-Badge.", c: "yellow" },
            { i: Users, t: "Custom Branding", d: "Eigener Bot-Name & Avatar.", c: "violet" },
            { i: Heart, t: "Direkter Dev-Kontakt", d: "Feature-Wünsche priorisiert.", c: "rose" },
            { i: ArrowRight, t: "Cross-Promotion", d: "Wir bewerben uns gegenseitig.", c: "cyan" },
          ].map((b, i) => {
            const I = b.i;
            return (
              <div key={i} className={`glass p-6 rounded-xl hover-pop border border-${b.c}-500/20`}>
                <I className={`w-6 h-6 text-${b.c}-300 mb-3`} />
                <h3 className="font-bold mb-1">{b.t}</h3>
                <p className="text-sm text-gray-400">{b.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* VORAUSSETZUNGEN */}
      <div className="glass p-8 rounded-3xl mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Voraussetzungen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Mindestens 100 aktive Mitglieder",
            "BotForge aktiv auf dem Server",
            "Cross-Promotion vereinbart",
            "Konform mit Discord ToS",
            "Aktive Community (keine toten Server)",
            "Deutsche oder englische Hauptsprache",
          ].map((req, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-sm">{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass-strong p-10 rounded-3xl text-center glow-breathe">
        <Heart className="w-10 h-10 text-pink-400 mx-auto mb-4 fill-pink-400" />
        <h2 className="text-3xl font-black mb-3">Bereit, Partner zu werden?</h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">Schick uns eine Mail mit deinem Server und wir antworten innerhalb von 48h.</p>
        <a href="mailto:fufi@botforge.app?subject=Partner-Bewerbung BotForge"
           className="btn-primary inline-flex items-center gap-2 hover-pop">
          <Heart className="w-4 h-4 fill-white" /> Jetzt bewerben <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
