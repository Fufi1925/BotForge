import { Star, Quote, Users, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PAGE_VISIBLE = true;

const reviews = [
  { name: "Koblenz RP", role: "Roleplay-Community", text: "Das Ticket-System ist absolut Game-Changer. Wir nutzen es täglich für Hausverkäufe, Waffenscheine und Support — alles über ein einziges Panel.", stars: 5, members: "523+", icon: "🏙️", verified: true },
  { name: "Discord Admin", role: "Multi-Server Owner", text: "Die Voice-Support Warteräume mit Hold-Music und Öffnungszeiten haben unseren Support komplett professionalisiert.", stars: 5, members: "1.2k", icon: "🎧" },
  { name: "Gaming Server", role: "Community Manager", text: "Endlich ein Bot, bei dem man im Dashboard wirklich alles einstellen kann. Kein Command-Spamming mehr.", stars: 5, members: "850", icon: "🎮" },
  { name: "RP-Server", role: "Owner", text: "Linked Moderation ist genial. Alle Discord-native Aktionen werden automatisch geloggt.", stars: 5, members: "640", icon: "🎭" },
  { name: "eSports Team", role: "Manager", text: "Twitch-Notifications werden ~45s nach Stream-Start gepostet. Genau richtig.", stars: 4, members: "320", icon: "⚔️" },
  { name: "Tech-Community", role: "Mod", text: "Guild Protection mit Captcha hat uns vor mehreren Raids gerettet.", stars: 5, members: "1.8k", icon: "💻" },
];

export default function Testimonials() {
  if (!PAGE_VISIBLE) return null;
  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-amber-500/30">
          <Quote className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold uppercase tracking-wide">Bewertungen</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Was Server-Owner <span className="text-gradient">sagen.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Echte Stimmen aus echten Communities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {reviews.map((r, i) => (
          <div key={i} className="glass p-6 rounded-2xl hover-pop card-shine relative">
            {r.verified && (
              <div className="absolute top-3 right-3 text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-amber-300" /> PARTNER
              </div>
            )}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: r.stars }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              {Array.from({ length: 5 - r.stars }).map((_, j) => <Star key={`empty-${j}`} className="w-4 h-4 text-gray-600" />)}
            </div>
            <p className="text-sm text-gray-300 italic mb-4">"{r.text}"</p>
            <div className="border-t border-white/5 pt-3 flex items-center gap-3">
              <div className="text-2xl">{r.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{r.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {r.members} · {r.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-strong p-10 rounded-3xl text-center">
        <Heart className="w-10 h-10 text-pink-400 mx-auto mb-3 fill-pink-400" />
        <h2 className="text-2xl font-black mb-2">Werde nächster Partner!</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Hilf uns BotForge bekannt zu machen — wir geben dir Premium gratis & promoten dich.</p>
        <Link to="/partners" className="btn-primary inline-flex items-center gap-2 hover-pop">
          Mehr erfahren <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
