import { useState } from "react";
import { Mail, Send, Headphones, ExternalLink, MessageSquare } from "lucide-react";

const PAGE_VISIBLE = true;

export default function Contact() {
  if (!PAGE_VISIBLE) return null;
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30">
          <Mail className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">Kontakt</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Schreib uns <span className="text-gradient">eine Nachricht.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Ob Bug, Feature-Wunsch, Geschäftsanfrage oder einfach Hallo sagen.</p>
      </div>

      {/* Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="glass p-6 rounded-2xl hover-pop card-shine">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold mb-1">Discord Support</h3>
          <p className="text-xs text-gray-400 mb-4">Schnellste Antwort. Ø 15 Min.</p>
          <span className="text-sm text-violet-300 inline-flex items-center gap-1">Beitreten <ExternalLink className="w-3 h-3" /></span>
        </a>
        <a href="mailto:fufi@botforge.app" className="glass p-6 rounded-2xl hover-pop card-shine">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold mb-1">E-Mail</h3>
          <p className="text-xs text-gray-400 mb-4">Für geschäftliche Anfragen.</p>
          <span className="text-sm text-cyan-300 truncate inline-block max-w-full">fufi@botforge.app</span>
        </a>
        <a href="/suggest" className="glass p-6 rounded-2xl hover-pop card-shine">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold mb-1">Feature-Wunsch?</h3>
          <p className="text-xs text-gray-400 mb-4">Reich einen Vorschlag ein.</p>
          <span className="text-sm text-emerald-300 inline-flex items-center gap-1">Vorschlag <ExternalLink className="w-3 h-3" /></span>
        </a>
      </div>

      {/* Form */}
      <div className="glass p-8 rounded-3xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Send className="w-5 h-5 text-violet-400" /> Direkt-Nachricht
        </h2>
        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nachricht gesendet!</h3>
            <p className="text-sm text-gray-400">Wir melden uns innerhalb von 24 Stunden.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 text-gray-300">Name</label>
                <input required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-violet-500/50" placeholder="Dein Name" />
              </div>
              <div>
                <label className="block text-sm mb-1.5 text-gray-300">E-Mail</label>
                <input required type="email" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-violet-500/50" placeholder="du@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1.5 text-gray-300">Betreff</label>
              <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-violet-500/50">
                <option>Allgemeine Frage</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Partner-Bewerbung</option>
                <option>Sonstiges</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1.5 text-gray-300">Nachricht</label>
              <textarea required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-violet-500/50 min-h-32" placeholder="Wie können wir dir helfen?" />
            </div>
            <button className="btn-primary inline-flex items-center gap-2">
              <Send className="w-4 h-4" /> Nachricht senden
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
