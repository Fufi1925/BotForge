import { Link } from "react-router-dom";
import { Check, X, Crown, Ticket, Shield, Mic, Users, BarChart3, Music, Video, Megaphone, MessageSquare, Layers, Award, Bell, Headphones, ArrowRight } from "lucide-react";

const PAGE_VISIBLE = true;

const modules = [
  { i: Ticket, t: "Ticket-System", d: "Panels mit Dropdowns, Forms, Auto-Close, Bewertungen, Transcripts, Claim-System.", color: "from-amber-500 to-orange-500" },
  { i: Headphones, t: "Voice-Support", d: "Warteraum mit Hold-Music, Öffnungszeiten, Duty-Modus, Team-Pings.", color: "from-blue-500 to-cyan-500" },
  { i: Users, t: "Teamverwaltung", d: "Bewerbungssystem, Meetings, Rang-Änderungs-Logs, Rechtegruppen.", color: "from-purple-500 to-pink-500" },
  { i: BarChart3, t: "Server Statistiken", d: "Voice-Channels mit Live-Stats: Members, Online, Boosts.", color: "from-cyan-500 to-blue-500" },
  { i: Shield, t: "Moderation", d: "Linked Moderation, Auto-Mod, manuelle Commands mit Mod-Logs.", color: "from-red-500 to-pink-500" },
  { i: Shield, t: "Guild Protection", d: "Captcha, Verifizierung, Rollen-Verteilung, Anti-Raid.", color: "from-emerald-500 to-teal-500" },
  { i: Video, t: "Social Media", d: "Twitch & YouTube Live-Notifications, ~45s nach Stream-Start.", color: "from-rose-500 to-red-500" },
  { i: Megaphone, t: "Willkommen & Leave", d: "Embed-Editor, Auto-Roles, DM-Nachrichten.", color: "from-green-500 to-emerald-500" },
  { i: Bell, t: "Neuigkeiten", d: "Professionelle Embed-Ankündigungen mit Image-Editor.", color: "from-yellow-500 to-amber-500" },
  { i: MessageSquare, t: "Vorschläge", d: "Voting-System mit Threads, Akzeptanz/Ablehnungs-Gründen.", color: "from-indigo-500 to-violet-500" },
  { i: Layers, t: "Private Kanäle", d: "Join-to-Create temporäre Voice-Channels mit Custom-Berechtigungen.", color: "from-fuchsia-500 to-pink-500" },
  { i: Award, t: "Beteiligungs-Belohnungen", d: "Rollen für Server-Tag oder Status-Verwendung.", color: "from-orange-500 to-amber-500" },
  { i: Music, t: "Music Player", d: "Lavalink-basiert mit Filtern, Queue, Lyrics.", color: "from-violet-500 to-purple-500" },
];

const compareTable = [
  { f: "Slash-Befehle", free: true, plus: true },
  { f: "Prefix-Befehle", free: true, plus: true },
  { f: "No-Prefix Modus", free: true, plus: true },
  { f: "Alle 13 Module", free: true, plus: true },
  { f: "Web-Dashboard", free: true, plus: true },
  { f: "Embed-Editor", free: true, plus: true },
  { f: "Ticket-System", free: true, plus: true },
  { f: "Mehrsprachig", free: true, plus: true },
  { f: "Eigener Bot-Name", free: false, plus: true },
  { f: "Eigener Bot-Avatar", free: false, plus: true },
  { f: "Custom Branding", free: false, plus: true },
  { f: "Keine BotForge-Werbung", free: false, plus: true },
  { f: "Premium Support (15 Min)", free: false, plus: true },
];

export default function Features() {
  if (!PAGE_VISIBLE) return null;
  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-xs text-violet-300 mb-3">
          {modules.length} MODULE
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Alle <span className="text-gradient">Features</span> im Überblick.</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Alles was du brauchst, in einem einzigen Bot.</p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {modules.map((m, i) => {
          const I = m.i;
          return (
            <div key={i} className="glass p-6 rounded-2xl hover-pop card-shine">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4`}>
                <I className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">{m.t}</h3>
              <p className="text-sm text-gray-400">{m.d}</p>
            </div>
          );
        })}
      </div>

      {/* Comparison */}
      <h2 className="text-3xl font-black text-center mb-8">Frei vs. <span className="text-gradient">Plus.</span></h2>
      <div className="glass rounded-2xl overflow-hidden border border-white/5 mb-10">
        <div className="grid grid-cols-3 bg-white/5 p-4 text-xs font-bold uppercase">
          <div>Feature</div>
          <div className="text-center text-gray-400">Free</div>
          <div className="text-center text-amber-400">
            <Crown className="w-4 h-4 inline mr-1" /> Plus
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {compareTable.map((c, i) => (
            <div key={i} className="grid grid-cols-3 p-4 items-center hover:bg-white/5">
              <div className="font-semibold text-sm">{c.f}</div>
              <div className="text-center">{c.free ? <Check className="w-5 h-5 text-green-400 inline" /> : <X className="w-5 h-5 text-gray-600 inline" />}</div>
              <div className="text-center">{c.plus ? <Check className="w-5 h-5 text-amber-400 inline" /> : <X className="w-5 h-5 text-gray-600 inline" />}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass-strong p-8 rounded-3xl text-center">
        <Crown className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Bereit für Plus?</h2>
        <p className="text-gray-400 mb-6">Schalte Custom Branding für nur 4,99€/Monat frei.</p>
        <Link to="/premium" className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 border-none">
          Plus upgraden <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
