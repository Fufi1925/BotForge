import { Link } from "react-router-dom";
import {
  Bot, Shield, Ticket, Music, BarChart3, Users, ArrowRight, Play,
  Crown, Rocket, MessageSquare, Mic, Video, Bell,
  Award, Layers, Megaphone, Check, Heart, ExternalLink, Star,
  Sparkles, Lock, Zap, Gift, TrendingUp, Globe, Clock, ShieldCheck
} from "lucide-react";
import { useNumbers } from "../hooks/useNumbers";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = (
  <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center">
    <div className="glass-strong p-12 rounded-3xl text-center glow-breathe">
      <h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1>
      <p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p>
    </div>
  </div>
);

export default function Home() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  const n = useNumbers();

  return (
    <div className="pt-24 pb-16 relative">
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[60vmax] h-[60vmax] rounded-full bg-violet-500/10 blur-3xl float-y" />
          <div className="absolute w-[40vmax] h-[40vmax] rounded-full bg-cyan-500/10 blur-3xl float-x del-3" />
        </div>

        <div className="relative text-center max-w-5xl mx-auto">
          <div className="in-down inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs mb-6 border border-emerald-500/30 glow-breathe">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-300">{n.trust.data_breaches === 0 ? "0 Datenpannen" : `${n.trust.data_breaches} Vorfälle`} · DSGVO-konform · Made by Fufi</span>
          </div>

          <h1 className="in-up text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Vertraue dem System,<br />
            <span className="text-gradient inline-block float-y">das Server liebt.</span>
          </h1>

          <p className="in-up del-1 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            BotForge ist ein All-in-One Discord-Bot mit {n.stats.modules_active} Modulen für Admins und Community.
            Tickets, Voice-Support, Team-Management, Guild Protection, Music und mehr — komplett über das Web-Dashboard.
          </p>

          <div className="in-up del-2 flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            <a href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
               target="_blank" rel="noreferrer"
               className="btn-primary inline-flex items-center gap-2 hover-pop">
              <Bot className="w-5 h-5" /> Kostenlos hinzufügen <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/dashboard" className="btn-ghost inline-flex items-center gap-2 hover-pop">
              <Play className="w-4 h-4" /> Dashboard ansehen
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="in-up del-3 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { i: ShieldCheck, t: "DSGVO", d: "EU-Hosting" },
              { i: Lock, t: "TLS 1.3", d: "End-to-End" },
              { i: Heart, t: `${n.stats.servers} Server`, d: "vertrauen uns" },
              { i: Zap, t: `${n.stats.uptime_percent}%`, d: "Uptime" },
            ].map((b, i) => {
              const I = b.i;
              return (
                <div key={i} className="glass p-4 rounded-xl border border-white/5 text-center hover-pop">
                  <I className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-sm font-bold">{b.t}</div>
                  <div className="text-xs text-gray-400">{b.d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODULE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12 in-up">
          <div className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-xs text-violet-300 mb-3">
            {n.stats.modules_active} MODULE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black">Alles was dein Server braucht.</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Tickets, Team, Schutz, Community — kein anderer Bot mehr nötig.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {[
            { i: Ticket, t: "Tickets", d: "Claim, Transcripts, Forms, Auto-Close. Das stärkste Modul.", c: "text-amber-300" },
            { i: Mic, t: "Voice-Support", d: "Warteraum, Ansagen, Hold-Music, Team-Ping.", c: "text-blue-300" },
            { i: Users, t: "Team-Management", d: "Bewerbungen, Meetings, Stats, eigenes Dashboard.", c: "text-purple-300" },
            { i: Shield, t: "Guild Protection", d: "Captcha gegen Raids, Anti-Raid Rules.", c: "text-red-300" },
            { i: BarChart3, t: "Server Stats", d: "Live-Zähler in Voice-Channels.", c: "text-cyan-300" },
            { i: Music, t: "Music Player", d: "YT, Spotify, SC. Queue, Lyrics, Filter.", c: "text-pink-300" },
            { i: Video, t: "Social Media", d: "Twitch & YouTube Notifications.", c: "text-rose-300" },
            { i: Megaphone, t: "Welcome & Leave", d: "Custom Embeds, Auto-Roles, DMs.", c: "text-emerald-300" },
            { i: Bell, t: "News-System", d: "Professionelle Ankündigungen.", c: "text-yellow-300" },
            { i: MessageSquare, t: "Vorschläge", d: "Voting, Threads, Akzeptierung-Logs.", c: "text-indigo-300" },
            { i: Layers, t: "Custom Voice", d: "Join-to-Create temporäre Channels.", c: "text-fuchsia-300" },
            { i: Award, t: "Engagement Rewards", d: "Server-Tag-Belohnungen, Status-Rollen.", c: "text-orange-300" },
          ].map((f, i) => {
            const I = f.i;
            return (
              <div key={i} className="glass p-6 rounded-2xl hover-pop card-shine border border-white/5">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${f.c}`}>
                  <I className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.t}</h3>
                <p className="text-sm text-gray-400">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="glass-strong rounded-3xl p-10 in-up">
          <div className="text-center mb-10">
            <Heart className="w-10 h-10 text-pink-400 mx-auto mb-4 fill-pink-400" />
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Warum vertrauen uns Server-Owner?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Wir bauen Software, die einfach funktioniert. Hier sind die Gründe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { i: ShieldCheck, t: "100% Privacy", d: "DSGVO-konform, EU-Hosting, keine Datenpannen seit Launch." },
              { i: Clock, t: "Schneller Support", d: `Antwort in ~${n.support.response_time_minutes} Min. Direkt vom Entwickler.` },
              { i: Star, t: "Verifizierte Server", d: `${n.stats.servers} aktiver Server mit ${n.stats.members} Members vertraut.` },
              { i: Globe, t: "Mehrsprachig", d: `${n.support.languages.join(" & ")} verfügbar.` },
              { i: Sparkles, t: "Echte Updates", d: "Neue Features jede Woche. Kein Stillstand." },
              { i: Lock, t: "Open Roadmap", d: "Du siehst, woran wir arbeiten." },
            ].map((b, i) => {
              const I = b.i;
              return (
                <div key={i} className="text-center">
                  <I className="w-8 h-8 text-violet-300 mx-auto mb-3" />
                  <h3 className="font-bold mb-1">{b.t}</h3>
                  <p className="text-sm text-gray-400">{b.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNER VORTEILE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12 in-up">
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-300 mb-3">
            PARTNER-PROGRAMM
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-3">Werde Partner — kostenlos.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Hochwertige Communities werden Teil von BotForge. Hier sind deine Vorteile.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Aktueller Partner */}
          <a href={n.partner.link} target="_blank" rel="noreferrer" className="glass-strong p-8 rounded-3xl hover-pop card-shine border-2 border-amber-500/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-300" /> VERIFIZIERTER PARTNER
            </div>
            <div className="text-6xl mb-4">{n.partner.icon}</div>
            <h3 className="text-2xl font-black mb-2">{n.partner.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Users className="w-4 h-4" /> {n.partner.members} Members
            </div>
            <p className="text-sm text-gray-300 mb-4">Die größte deutsche Roleplay-Community aus Koblenz. Ein perfektes Beispiel, wie BotForge Communities transformiert.</p>
            <span className="text-amber-300 inline-flex items-center gap-1 text-sm font-semibold">
              Server beitreten <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Vorteile-Karte */}
          <div className="glass p-8 rounded-3xl">
            <Gift className="w-10 h-10 text-violet-300 mb-4" />
            <h3 className="text-2xl font-black mb-2">Deine Vorteile als Partner</h3>
            <p className="text-sm text-gray-400 mb-6">Werde Teil und profitiere von:</p>

            <div className="space-y-3">
              {[
                { t: "BotForge Plus gratis", d: `Spare ${n.pricing.plus_price.toFixed(2)}${n.pricing.currency}/Monat — komplett kostenlos.` },
                { t: "Auf der Startseite gelistet", d: "Wir promoten dich aktiv auf botforge.app." },
                { t: "Verified Badge", d: "Goldenes Stern-Badge für deinen Server." },
                { t: "Direkter Dev-Kontakt", d: "Feature-Wünsche werden bevorzugt umgesetzt." },
                { t: "Custom Branding", d: "Eigener Bot-Name & Avatar nur für dich." },
                { t: "Lifetime Premium", d: "Solange du Partner bist, bleibst du Premium." },
              ].map((v, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{v.t}</div>
                    <div className="text-xs text-gray-400">{v.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/partners" className="btn-primary mt-6 w-full inline-flex items-center justify-center gap-2 hover-pop">
              <Heart className="w-4 h-4 fill-white" /> Jetzt Partner werden
            </Link>
          </div>
        </div>

        {/* Voraussetzungen */}
        <div className="mt-8 glass p-6 rounded-2xl text-center">
          <div className="text-xs text-gray-400 mb-3 uppercase font-semibold">Voraussetzungen</div>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="bg-white/5 px-3 py-1.5 rounded-full">100+ aktive Members</span>
            <span className="bg-white/5 px-3 py-1.5 rounded-full">BotForge im Einsatz</span>
            <span className="bg-white/5 px-3 py-1.5 rounded-full">Cross-Promotion</span>
            <span className="bg-white/5 px-3 py-1.5 rounded-full">Discord ToS-konform</span>
          </div>
        </div>
      </section>

      {/* PRICING - NUR FREE + 4,99€ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12 in-up">
          <h2 className="text-3xl sm:text-5xl font-black mb-3">Einfaches Pricing.</h2>
          <p className="text-gray-400">Nur zwei Optionen. Keine versteckten Kosten.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FREE */}
          <div className="glass p-8 rounded-3xl border border-white/10 hover-pop">
            <div className="text-sm text-gray-400 mb-2">Kostenlos</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-black">{n.pricing.free_price}</span>
              <span className="text-xl text-gray-400">{n.pricing.currency}</span>
              <span className="text-gray-400 ml-1">/ für immer</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Alle 13 Module verfügbar",
                "Komplettes Dashboard",
                "Unbegrenzte Server",
                "Standard-Support",
                "Web-basierte Konfiguration",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" /> {f}
                </li>
              ))}
            </ul>
            <a href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
               target="_blank" rel="noreferrer"
               className="btn-ghost w-full inline-flex items-center justify-center gap-2">
              <Bot className="w-4 h-4" /> Bot hinzufügen
            </a>
          </div>

          {/* PLUS */}
          <div className="glass-strong p-8 rounded-3xl border-2 border-amber-500/40 hover-pop relative overflow-hidden glow-breathe">
            <div className="absolute top-4 right-4 text-xs bg-amber-500 text-black px-2 py-1 rounded-full font-bold">BELIEBT</div>
            <Crown className="w-6 h-6 text-amber-300 mb-2" />
            <div className="text-sm text-amber-300 mb-2 font-semibold">BotForge Plus</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-black">{n.pricing.plus_price.toFixed(2)}</span>
              <span className="text-xl text-gray-400">{n.pricing.currency}</span>
              <span className="text-gray-400 ml-1">/ Monat</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Alles aus Kostenlos",
                "Eigener Custom Bot",
                "Eigener Name & Avatar",
                "Komplettes Branding",
                "Keine Werbung",
                "Premium-Support",
                "Web-Personalisierung",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-amber-300" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/premium" className="btn-primary w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 border-none">
              <Crown className="w-4 h-4" /> Plus upgraden
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Rocket className="w-12 h-12 text-violet-300 mx-auto mb-6 float-y" />
        <h2 className="text-4xl sm:text-5xl font-black mb-4">Starte in 2 Minuten.</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Bot einladen, Dashboard öffnen, Module aktivieren — fertig. Kein Code, keine Kommandos auswendig lernen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
             target="_blank" rel="noreferrer"
             className="btn-primary inline-flex items-center gap-2 hover-pop">
            <Bot className="w-5 h-5" /> Jetzt hinzufügen
          </a>
          <Link to="/dashboard" className="btn-ghost inline-flex items-center gap-2 hover-pop">
            <TrendingUp className="w-4 h-4" /> Demo ansehen
          </Link>
        </div>
      </section>
    </div>
  );
}
