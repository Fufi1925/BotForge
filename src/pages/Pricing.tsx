import { Crown, Check, Bot, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useNumbers } from "../hooks/useNumbers";

const PAGE_VISIBLE = true;

export default function Pricing() {
  if (!PAGE_VISIBLE) return null;
  const n = useNumbers();

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4">
      <div className="text-center mb-12 in-up">
        <div className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-xs text-violet-300 mb-4">
          EINFACH & FAIR
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-4">Zwei Pläne. Punkt.</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Kostenlos für alle. Plus für {n.pricing.plus_price.toFixed(2)}{n.pricing.currency}/Monat — wenn du eigenes Branding willst.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* FREE */}
        <div className="glass p-8 rounded-3xl border border-white/10 hover-pop">
          <Bot className="w-8 h-8 text-violet-300 mb-3" />
          <div className="text-sm text-gray-400 mb-2 uppercase font-semibold">Kostenlos</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-6xl font-black">{n.pricing.free_price}</span>
            <span className="text-2xl text-gray-400">{n.pricing.currency}</span>
          </div>
          <div className="text-gray-400 mb-6">Für immer.</div>

          <ul className="space-y-3 mb-8">
            {[
              "Alle 13 Module",
              "Tickets, Voice-Support, Teams",
              "Moderation, Protection, Stats",
              "Welcome, News, Suggestions",
              "Custom Voice, Engagement Rewards",
              "Music-Player",
              "Komplettes Web-Dashboard",
              "Unbegrenzte Server",
              "Community-Support",
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <a href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
             target="_blank" rel="noreferrer"
             className="btn-ghost w-full inline-flex items-center justify-center gap-2">
            Jetzt kostenlos starten
          </a>
        </div>

        {/* PLUS */}
        <div className="glass-strong p-8 rounded-3xl border-2 border-amber-500/40 hover-pop relative overflow-hidden glow-breathe">
          <div className="absolute top-4 right-4 text-xs bg-amber-500 text-black px-3 py-1 rounded-full font-bold">EMPFOHLEN</div>
          <Crown className="w-8 h-8 text-amber-300 mb-3" />
          <div className="text-sm text-amber-300 mb-2 uppercase font-semibold">BotForge Plus</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-6xl font-black">{n.pricing.plus_price.toFixed(2)}</span>
            <span className="text-2xl text-gray-400">{n.pricing.currency}</span>
          </div>
          <div className="text-gray-400 mb-6">Pro Monat. Jederzeit kündbar.</div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-amber-300 shrink-0 fill-amber-300" />
              <strong>Alles aus Kostenlos</strong>
            </li>
            {[
              "Eigener Custom Bot",
              "Eigener Bot-Name",
              "Eigener Bot-Avatar",
              "Eigenes Branding im Dashboard",
              "Keine BotForge-Werbung",
              "Priority Support (Antwort in 15 Min)",
              "Web-Personalisierung",
              "Premium-Badge",
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-amber-300 shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <button className="btn-primary w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 border-none">
            <Crown className="w-4 h-4" /> Plus upgraden
          </button>
        </div>
      </div>

      {/* PARTNER HINWEIS */}
      <div className="glass p-6 rounded-2xl text-center border border-amber-500/20">
        <Heart className="w-6 h-6 text-amber-300 mx-auto mb-2 fill-amber-300" />
        <h3 className="font-bold mb-1">Du willst Plus geschenkt?</h3>
        <p className="text-sm text-gray-400 mb-4">Werde BotForge-Partner und erhalte Plus lebenslang kostenlos.</p>
        <Link to="/partners" className="inline-flex items-center gap-1 text-sm text-amber-300 hover:text-amber-200 font-semibold">
          <Star className="w-3 h-3 fill-amber-300" /> Partner werden
        </Link>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Häufige Fragen</h2>
        <div className="space-y-3">
          {[
            { q: "Was kostet BotForge?", a: `Die Basis-Version ist komplett kostenlos. Plus kostet ${n.pricing.plus_price.toFixed(2)}${n.pricing.currency}/Monat.` },
            { q: "Kann ich jederzeit kündigen?", a: "Ja, jederzeit. Keine Vertragsbindung." },
            { q: "Sind alle Module wirklich kostenlos?", a: "Ja. Tickets, Voice-Support, Teams, Stats — alle 13 Module sind in der kostenlosen Version verfügbar." },
            { q: "Was ist der Unterschied zu Plus?", a: "Plus gibt dir einen Custom Bot mit eigenem Namen & Avatar, kein BotForge-Branding mehr." },
          ].map((f, i) => (
            <details key={i} className="glass p-5 rounded-xl cursor-pointer">
              <summary className="font-semibold flex items-center justify-between">
                {f.q}
                <span className="text-violet-300">+</span>
              </summary>
              <p className="text-sm text-gray-400 mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
