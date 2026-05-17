import { Crown, Check, ArrowRight, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useNumbers } from "../hooks/useNumbers";

const PAGE_VISIBLE = true;

export default function PremiumDetail() {
  if (!PAGE_VISIBLE) return null;
  const n = useNumbers();

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4">
      <div className="text-center mb-12 in-up">
        <Crown className="w-12 h-12 text-amber-300 mx-auto mb-4 float-y" />
        <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-300 mb-4">
          BOTFORGE PLUS
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-4">Dein eigener Bot. <span className="text-gradient">Dein Branding.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Für nur {n.pricing.plus_price.toFixed(2)}{n.pricing.currency}/Monat bekommst du einen Custom Bot mit eigenem Namen, Avatar und Branding.
        </p>
      </div>

      <div className="glass-strong p-10 rounded-3xl mb-10 border-2 border-amber-500/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-sm text-amber-300 uppercase font-semibold mb-2">Plus Vorteile</div>
            <h2 className="text-3xl font-black mb-6">Alles, was du brauchst.</h2>
            <ul className="space-y-3">
              {[
                "Eigener Bot mit deinem Namen",
                "Eigener Avatar & Branding",
                "Kein BotForge-Logo mehr",
                "Web-Personalisierung",
                "Premium-Support (15 Min Antwort)",
                "Premium-Badge im Server",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-sm text-gray-400 uppercase mb-2">Preis</div>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-6xl font-black">{n.pricing.plus_price.toFixed(2)}</span>
              <span className="text-2xl text-gray-400">{n.pricing.currency}</span>
            </div>
            <div className="text-gray-400 text-sm mb-6">pro Monat · jederzeit kündbar</div>
            <button className="btn-primary w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 border-none">
              <Crown className="w-4 h-4" /> Jetzt upgraden <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/pricing" className="block text-xs text-gray-400 mt-3 hover:text-white">← Zurück zu allen Plänen</Link>
          </div>
        </div>
      </div>

      {/* PARTNER */}
      <div className="glass p-6 rounded-2xl text-center">
        <Heart className="w-6 h-6 text-amber-300 mx-auto mb-2 fill-amber-300" />
        <h3 className="font-bold mb-1">Tipp: Werde Partner und spare alles</h3>
        <p className="text-sm text-gray-400 mb-4">Als verifizierter BotForge-Partner bekommst du Plus geschenkt. Lebenslang.</p>
        <Link to="/partners" className="inline-flex items-center gap-1 text-sm text-amber-300 hover:text-amber-200 font-semibold">
          <Star className="w-3 h-3 fill-amber-300" /> Mehr erfahren
        </Link>
      </div>
    </div>
  );
}
