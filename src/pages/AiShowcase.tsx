import { Sparkles, Bot, MessageSquare, Languages, Image as ImageIcon, Zap } from "lucide-react";
const features = [
  { icon: MessageSquare, title: "AI-Chatbot", desc: "GPT-4 powered Conversation direkt im Discord-Channel", status: "Beta" },
  { icon: Languages, title: "Auto-Translation", desc: "Übersetzt Nachrichten in Echtzeit in 50+ Sprachen", status: "Live" },
  { icon: ImageIcon, title: "AI-Image-Gen", desc: "Erstelle Bilder via DALL-E direkt mit /imagine", status: "Bald" },
  { icon: Sparkles, title: "Smart-Mod", desc: "KI erkennt toxische Sprache mit 99% Genauigkeit", status: "Live" },
  { icon: Zap, title: "Auto-Reply", desc: "Bot antwortet automatisch auf häufige Fragen", status: "Live" },
  { icon: Bot, title: "Voice-to-Text", desc: "Transkribiert Voice-Channels in Echtzeit", status: "Beta" },
];
export default function AiShowcase() {
  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" /><span className="font-semibold uppercase tracking-wide">AI Features</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Powered by <span className="text-gradient">AI.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">BotForge nutzt modernste KI für Moderation, Übersetzungen und intelligente Antworten.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass p-6 hover-lift card-shine relative overflow-hidden anim-up" style={{animationDelay:`${i*0.06}s`}}>
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.status === "Live" ? "bg-green-500/20 text-green-300" : f.status === "Beta" ? "bg-amber-500/20 text-amber-300" : "bg-violet-500/20 text-violet-300"}`}>{f.status}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-violet-400 animate-pulse" />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
