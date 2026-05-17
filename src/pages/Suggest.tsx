import { useState } from "react";
import { Lightbulb, ChevronUp, Plus, Sparkles, MessageSquare } from "lucide-react";

const PAGE_VISIBLE = true;

const INITIAL = [
  { id: 1, title: "AI-AutoMod Übersetzungen", desc: "Warnungen automatisch in die Sprache des Users übersetzen.", votes: 42, status: "Geplant" },
  { id: 2, title: "Mobile App", desc: "Eine native iOS/Android App für das Dashboard.", votes: 38, status: "In Prüfung" },
  { id: 3, title: "Discord-Soundboard Integration", desc: "Bot soll Soundboard-Sounds in Voice spielen können.", votes: 28, status: "In Prüfung" },
  { id: 4, title: "Server-Analytics Export", desc: "Aktivitäts-Graphen als PDF/CSV exportieren.", votes: 19, status: "In Arbeit" },
  { id: 5, title: "Giveaway-Bedingungen", desc: "Rollenanforderungen für Giveaway-Teilnahmen.", votes: 15, status: "Neu" },
];

export default function Suggest() {
  if (!PAGE_VISIBLE) return null;
  const [items, setItems] = useState(INITIAL);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all");

  const vote = (id: number) => setItems(items.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));

  const submit = (e: any) => {
    e.preventDefault();
    if (!title || !desc) return;
    setItems([{ id: Date.now(), title, desc, votes: 1, status: "Neu" }, ...items]);
    setTitle("");
    setDesc("");
  };

  const filtered = filter === "all" ? items : items.filter(i => i.status.toLowerCase() === filter);
  const sorted = [...filtered].sort((a, b) => b.votes - a.votes);

  const statusColor = (s: string) => {
    if (s === "In Arbeit") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (s === "Geplant") return "bg-violet-500/20 text-violet-300 border-violet-500/30";
    if (s === "In Prüfung") return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    return "bg-white/5 text-gray-400 border-white/10";
  };

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30">
          <Lightbulb className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold uppercase tracking-wide">Feature-Vorschläge</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Was sollen wir <span className="text-gradient">bauen?</span></h1>
        <p className="text-gray-400 max-w-2xl">Stimme über bestehende Vorschläge ab oder reiche eigene ein. Die beliebtesten kommen ins nächste Update.</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "neu", "in prüfung", "geplant", "in arbeit"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${filter === f ? "bg-violet-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
          >
            {f === "all" ? "Alle" : f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-3">
          {sorted.map(item => (
            <div key={item.id} className="glass p-5 rounded-2xl flex gap-4 hover-pop">
              <button
                onClick={() => vote(item.id)}
                className="flex flex-col items-center bg-white/5 hover:bg-violet-500/20 border border-white/10 p-3 rounded-xl shrink-0 transition"
              >
                <ChevronUp className="w-5 h-5 text-violet-400 mb-1" />
                <span className="text-sm font-bold font-mono">{item.votes}</span>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold">{item.title}</h3>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${statusColor(item.status)}`}>{item.status}</span>
                </div>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
          {sorted.length === 0 && (
            <div className="glass p-8 text-center text-gray-500 rounded-2xl">Keine Vorschläge in dieser Kategorie.</div>
          )}
        </div>

        <div className="glass p-6 rounded-2xl h-fit sticky top-24">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-violet-400" /> Neuer Vorschlag
          </h2>
          <form onSubmit={submit} className="space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kurzer Titel"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm outline-none focus:border-violet-500/50"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Beschreibe deine Idee..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm outline-none focus:border-violet-500/50 min-h-24"
            />
            <button className="w-full bg-gradient-to-r from-violet-500 to-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Einreichen
            </button>
          </form>
          <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-500 flex items-center gap-2">
            <MessageSquare className="w-3 h-3" /> Du kannst Vorschläge auch per <code className="text-violet-300">/suggest</code> einreichen.
          </div>
        </div>
      </div>
    </div>
  );
}
