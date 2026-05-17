import { Link } from "react-router-dom";
import { ChevronRight, Ticket, FileText } from "lucide-react";

export default function DocsTickets() {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link to="/docs" className="hover:text-white transition">Docs</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white">Ticket-System</span>
      </div>

      <h1 className="text-4xl font-black mb-4 text-gradient">Tickets mit Dropdown-Menü</h1>
      <p className="text-gray-400 mb-8">Verwalte Support-Tickets extrem übersichtlich, sicher und DSGVO-konform.</p>

      <div className="space-y-8">
        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Ticket className="w-4 h-4 text-violet-400" /></div>
            Das Ticket-Panel
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Das Herzstück unseres Support-Systems ist das <strong>Ticket-Panel</strong>. Im Gegensatz zu alten Bots, die mit unübersichtlichen Reactions arbeiten, 
            nutzt BotForge ein elegantes Discord <strong>Dropdown-Menü</strong>. 
          </p>
          <div className="p-3 bg-black/30 rounded-xl border border-white/5 font-mono text-xs overflow-x-auto">
            /ticket panel [channel] [title] [description]
          </div>
        </section>

        <section className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><FileText className="w-4 h-4 text-violet-400" /></div>
            Transcripts & Archivierung
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Beim Schließen eines Tickets mit <strong>/ticket close</strong> generiert BotForge automatisch ein detailliertes Transcript des Chats 
            inklusive Zeitstempel, User-IDs und Download-Links für Dateianhänge.
          </p>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
            <h4 className="font-bold mb-1 text-white">HTML-Transcripts</h4>
            <p className="text-gray-400">Wir hosten die Transcripts sicher, so dass dein Team sie direkt im Browser lesen kann.</p>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link to="/docs/automod" className="text-sm text-gray-400 hover:text-white transition">← AutoMod</Link>
        <Link to="/docs/music" className="btn-primary text-xs inline-flex items-center gap-1">Musik lesen <ChevronRight className="w-3 h-3" /></Link>
      </div>
    </div>
  );
}
