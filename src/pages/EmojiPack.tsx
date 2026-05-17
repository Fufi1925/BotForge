import { Download, Smile } from "lucide-react";
import { useState } from "react";

const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center"><div className="glass-strong p-12 rounded-3xl text-center glow-breathe"><h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1><p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p></div></div>;

const emojiPack = [
  { char: "🔥", name: "bf_fire", cat: "Moderation", desc: "Perfekt für Ankündigungen oder Warns" },
  { char: "⚡", name: "bf_zap", cat: "Utility", desc: "Zeigt schnelle Performance oder Latenz an" },
  { char: "💎", name: "bf_gem", cat: "Premium", desc: "Ideal für VIPs oder Supporter" },
  { char: "🚀", name: "bf_rocket", cat: "Utility", desc: "Perfekt für Level-Ups und Meilensteine" },
  { char: "🎮", name: "bf_game", cat: "Reaction Roles", desc: "Rollen-Zuweisung für Gaming" },
  { char: "🎯", name: "bf_target", cat: "Reaction Roles", desc: "Für eSports oder Ziele" },
  { char: "🌟", name: "bf_star", cat: "Giveaways", desc: "Verlosungen und Highlights" },
  { char: "💀", name: "bf_dead", cat: "Fun", desc: "Für lustige Chatmomente" },
  { char: "👑", name: "bf_crown", cat: "Premium", desc: "Reserviert für Server-Owner/Admins" },
  { char: "🐛", name: "bf_bug", cat: "Developer", desc: "Bug-Reports und Fehlersuche" },
  { char: "🎵", name: "bf_music", cat: "Music", desc: "Aktive Musik-Wiedergabe" },
  { char: "🎨", name: "bf_paint", cat: "Reaction Roles", desc: "Rollen-Zuweisung für Künstler" },
  { char: "🎫", name: "bf_ticket", cat: "Tickets", desc: "Support-Ticket öffnen" },
  { char: "🛡️", name: "bf_shield", cat: "Moderation", desc: "Schutz durch AutoMod" },
  { char: "❓", name: "bf_help", cat: "Utility", desc: "Hilfe-Command Emoji" },
  { char: "🔒", name: "bf_lock", cat: "Tickets", desc: "Ticket geschlossen" },
];

export default function EmojiPack() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(emojiPack, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "botforge_emojis.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setDownloading(false);
    }, 1500);
  };

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4">
      <div className="mb-10 fade-up text-center">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Smile className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold tracking-wide uppercase">BotForge Asset Center</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Custom Emoji <span className="text-gradient">Pack</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Lade die offiziellen, hochauflösenden BotForge Custom Emojis herunter. Perfekt optimiert für dein Discord-Server-Layout.
        </p>
      </div>

      <div className="glass p-8 mb-10 text-center relative overflow-hidden glow-violet">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 pointer-events-none" />
        <div className="relative z-10">
          <Download className="w-12 h-12 text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Emoji-Pack herunterladen</h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-6 text-sm">
            Enthält alle {emojiPack.length} offiziellen BotForge Emojis im JSON-Format für den direkten Import über das Dashboard oder `/emoji add`.
          </p>
          <button
            onClick={handleDownload}
            className="btn-primary inline-flex items-center gap-2"
            disabled={downloading}
          >
            {downloading ? "Bereite Download vor..." : "Download Emojis (.json)"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {emojiPack.map((e, i) => (
          <div key={i} className="glass p-5 text-center hover-lift flex flex-col items-center justify-center border border-white/5">
            <div className="text-4xl mb-3 filter drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]">{e.char}</div>
            <div className="font-mono text-xs text-violet-300 bg-violet-500/10 px-2 py-1 rounded mb-2">{e.name}</div>
            <div className="text-sm font-semibold text-white mb-1">{e.cat}</div>
            <div className="text-xs text-gray-400">{e.desc}</div>
          </div>
        ))}
      </div>

      <div className="glass p-6">
        <h3 className="font-bold text-lg mb-3">💡 So fügst du sie hinzu</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
          <li>Lade das Emoji-Pack über den Button oben herunter.</li>
          <li>Gehe in das BotForge-Dashboard zu deinem Server in den Tab <span className="text-violet-400 font-semibold">Custom Emojis</span>.</li>
          <li>Lade die Datei hoch oder nutze den Befehl <code className="text-cyan-300 font-mono">/emoji add &lt;name&gt; &lt;url&gt;</code>.</li>
          <li>Der Bot fügt die Emojis deinem Server automatisch mit den passenden Berechtigungen hinzu.</li>
        </ol>
      </div>
    </div>
  );
}
