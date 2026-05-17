import { useState } from "react";
import { Search, Shield, Users, Ticket, Headphones, Megaphone, Wrench, Sparkles, MessageSquare, Image as ImageIcon, FileCheck, AlertOctagon, Hash } from "lucide-react";

const PAGE_VISIBLE = true;

const categories = [
  {
    name: "Info",
    icon: Hash,
    color: "from-blue-500 to-cyan-500",
    cmds: [
      { n: "/id", d: "Server-ID anzeigen lassen (z.B. für Support)." },
      { n: "/userinfo [user]", d: "Informationen über dich selbst oder ein anderes Mitglied anzeigen." },
      { n: "/serverinfo", d: "Wichtige Informationen und Statistiken zum Server anzeigen." },
      { n: "/ping", d: "Bot-Latenz anzeigen." },
      { n: "/status", d: "Detaillierte Bot-Statistiken." },
      { n: "/help [command]", d: "Detaillierte Beschreibung zu allen Befehlen oder einem bestimmten." },
    ],
  },
  {
    name: "Moderation",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    cmds: [
      { n: "/ban <user> [reason]", d: "Mitglied bannen (nur mit nötigen Berechtigungen)." },
      { n: "/unban <user_id>", d: "User per ID entbannen." },
      { n: "/kick <user> [reason]", d: "Mitglied vom Server kicken." },
      { n: "/mute <user> <duration> [reason]", d: "Mitglied in Timeout schicken." },
      { n: "/unmute <user>", d: "Timeout eines Mitglieds aufheben." },
      { n: "/warn <user> <reason>", d: "Mitglied verwarnen." },
      { n: "/unwarn <user> [case_id]", d: "Verwarnung entfernen (z.B. bei Fehler)." },
      { n: "/modlogs <user>", d: "Mod-Cases eines Mitglieds einsehen und ggf. löschen." },
      { n: "/clear [amount]", d: "Mehrere Nachrichten gleichzeitig löschen (max 100)." },
    ],
  },
  {
    name: "Tickets",
    icon: Ticket,
    color: "from-amber-500 to-orange-500",
    cmds: [
      { n: "/ticket claim", d: "Ticket übernehmen (Claim setzen)." },
      { n: "/ticket unclaim", d: "Claim wieder aufheben." },
      { n: "/ticket add <target>", d: "User oder Rolle zum Ticket hinzufügen." },
      { n: "/ticket remove <target>", d: "User oder Rolle aus Ticket entfernen." },
      { n: "/ticket close", d: "Ticket schließen (mit Feedback-Form)." },
      { n: "/ticket transcript", d: "HTML-Transkript erstellen." },
      { n: "/ticket rename <name>", d: "Ticket-Kanal umbenennen." },
      { n: "/ticket transfer <user>", d: "Ticket an anderen Supporter übertragen." },
    ],
  },
  {
    name: "Community",
    icon: MessageSquare,
    color: "from-emerald-500 to-teal-500",
    cmds: [
      { n: "/suggest <idea>", d: "Vorschlag abgeben (wenn Modul aktiv) — wird mit Voting versehen." },
      { n: "/report <user> <reason>", d: "Mitglied melden (Moderatoren entscheiden über Vorgehen)." },
      { n: "/news <title> <message>", d: "Server-Ankündigung mit Pings senden (wenn Modul aktiv)." },
      { n: "/support", d: "Support-Möglichkeiten anzeigen / Ticket öffnen." },
      { n: "/optout", d: "Bot soll deine Discord-Aktivitäten nicht mehr lesen." },
    ],
  },
  {
    name: "Tools",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    cmds: [
      { n: "/avatarmaker <letter> [color1] [color2]", d: "Eigenes Profilbild mit Buchstabe + Farbverlauf erstellen." },
      { n: "/bannermaker <text>", d: "Eigenes Profil-Banner erstellen (für Server Booster)." },
      { n: "/removebg", d: "Hintergrund eines Bildes entfernen (PNG/JPEG)." },
    ],
  },
];

export default function Commands() {
  if (!PAGE_VISIBLE) return null;
  const [q, setQ] = useState("");
  const filtered = categories.map(c => ({
    ...c,
    cmds: c.cmds.filter(cmd =>
      cmd.n.toLowerCase().includes(q.toLowerCase()) ||
      cmd.d.toLowerCase().includes(q.toLowerCase())
    ),
  })).filter(c => c.cmds.length > 0);

  const total = categories.reduce((sum, c) => sum + c.cmds.length, 0);

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <div className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-xs text-violet-300 mb-3">
          {total} BEFEHLE
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Alle <span className="text-gradient">BotForge Befehle</span>
        </h1>
        <p className="text-gray-400 mb-6 max-w-2xl">
          Alle Befehle funktionieren als Slash (<code className="bg-white/5 px-1 rounded">/</code>),
          Prefix (<code className="bg-white/5 px-1 rounded">!</code>) und No-Prefix
          (einfach das Wort ohne alles, wenn im Dashboard freigeschaltet).
        </p>
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Befehl suchen..."
            className="w-full pl-11 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-violet-500/50 outline-none"
          />
        </div>
      </div>

      <div className="space-y-8">
        {filtered.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">{cat.name}</h2>
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">{cat.cmds.length} Befehle</span>
              </div>
              <div className="glass p-4 space-y-1 rounded-2xl">
                {cat.cmds.map((c, j) => (
                  <div key={j} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition">
                    <code className="text-sm text-violet-300 font-mono min-w-[280px] flex-shrink-0">{c.n}</code>
                    <span className="text-sm text-gray-300">{c.d}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">Keine Befehle gefunden.</div>
        )}
      </div>
    </div>
  );
}
