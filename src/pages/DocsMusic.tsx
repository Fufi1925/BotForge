import { Link } from "react-router-dom";
import { ChevronRight, Music, Radio } from "lucide-react";

export default function DocsMusic() {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link to="/docs" className="hover:text-white transition">Docs</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white">Musik-Player</span>
      </div>

      <h1 className="text-4xl font-black mb-4 text-gradient">Musik-Player & Lavalink</h1>
      <p className="text-gray-400 mb-8">Kristallklare Audio-Qualität mit unbegrenzter Wiedergabe über wavelink.</p>

      <div className="space-y-8">
        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Music className="w-4 h-4 text-violet-400" /></div>
            Befehle zur Steuerung
          </h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <code className="text-cyan-300 font-mono block mb-1">/play &lt;song|url&gt;</code>
              Spielt Musik von YouTube, Spotify (Playlists & Tracks) oder SoundCloud.
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <code className="text-cyan-300 font-mono block mb-1">/skip</code>
              Überspringt den aktuellen Song in der Queue.
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <code className="text-cyan-300 font-mono block mb-1">/volume &lt;0-150&gt;</code>
              Stellt die Lautstärke stufenlos ein. 100% ist Standard.
            </div>
          </div>
        </section>

        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Radio className="w-4 h-4 text-violet-400" /></div>
            Lavalink & wavelink
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            BotForge nutzt eigene Lavalink-Knoten auf Railway, um Audio zu dekodieren und extrem latenzfrei in den Voice-Channel zu senden. 
            Selbst bei 100+ gleichzeitigen Streams bleibt die CPU-Auslastung minimal.
          </p>
        </section>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link to="/docs/tickets" className="text-sm text-gray-400 hover:text-white transition">← Tickets</Link>
        <Link to="/docs" className="btn-primary text-xs inline-flex items-center gap-1">Zurück zu den Docs <ChevronRight className="w-3 h-3" /></Link>
      </div>
    </div>
  );
}
