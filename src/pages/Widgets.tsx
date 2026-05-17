import { Code2, Copy, Check } from "lucide-react";
import { useState } from "react";
export default function Widgets() {
  const [copied, setCopied] = useState(false);
  const snippet = '<iframe src="https://botforge.app/widget/stats" width="300" height="200" frameborder="0"></iframe>';
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-breathe">
          <Code2 className="w-3.5 h-3.5 text-violet-400 animate-pulse" /><span className="font-semibold uppercase tracking-wide">Embeddable Widgets</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">BotForge <span className="text-gradient">Widgets.</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Bette Live-Statistiken deines Servers auf deine Website, dein Forum oder deine Twitch-Seite ein.</p>
      </div>
      <div className="glass p-6 mb-6 anim-scale">
        <h3 className="font-bold mb-4">📊 Stats-Widget Preview</h3>
        <div className="glass p-6 rounded-xl max-w-xs mx-auto text-center glow-breathe">
          <div className="text-3xl font-black text-gradient mb-1">847</div>
          <div className="text-xs text-gray-400 mb-3">Server nutzen BotForge</div>
          <div className="text-sm font-bold text-green-400">99.9% Uptime</div>
        </div>
      </div>
      <div className="glass p-6 anim-up anim-d2">
        <h3 className="font-bold mb-3">Embed-Code</h3>
        <div className="p-3 bg-black/40 rounded-xl font-mono text-xs overflow-x-auto mb-3 border border-white/5">
          {snippet}
        </div>
        <button onClick={() => {navigator.clipboard.writeText(snippet); setCopied(true); setTimeout(() => setCopied(false), 1500);}} className="btn-primary text-xs inline-flex items-center gap-2">
          {copied ? <><Check className="w-4 h-4" /> Kopiert!</> : <><Copy className="w-4 h-4" /> Code kopieren</>}
        </button>
      </div>
    </div>
  );
}
