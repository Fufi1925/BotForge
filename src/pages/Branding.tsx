import { Download, Copy, Shield, Palette } from "lucide-react";
import { useState } from "react";

export default function Branding() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { name: "Primary Violet", hex: "#7C3AED", desc: "Unsere Hauptfarbe für Akzente, Buttons und primäre Markierungen." },
    { name: "Secondary Cyan", hex: "#06B6D4", desc: "Verwendet für Verläufe, sekundäre Highlights und Links." },
    { name: "Accent Pink", hex: "#EC4899", desc: "Für Premium-Badges, Specials und festliche Banner-Karten." },
    { name: "Dark Background", hex: "#05050C", desc: "Der absolut tiefe Hintergrund für unser futuristisches UI." },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Palette className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Brand Guidelines</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Logo & <span className="text-gradient">Branding</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Lade offizielle BotForge Logos, Icons und Banner in höchster Auflösung herunter und erfahre mehr über unsere Farbcodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Offizielles Logo (PNG & SVG)</h2>
            <p className="text-sm text-gray-400 mb-6">
              Verwende unser Logo ausschließlich im quadratischen Format mit abgerundeten Ecken oder als Vektorgrafik für deine Server-Vorstellungen.
            </p>
          </div>
          <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center glow-violet">
              <svg className="w-12 h-12 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
          </div>
          <button className="btn-primary w-full inline-flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Logo-Paket herunterladen (.zip)
          </button>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Markenfarben</h2>
          <div className="space-y-3">
            {colors.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: c.hex }} />
                  <div>
                    <h4 className="font-bold text-sm text-white">{c.name}</h4>
                    <p className="text-[10px] text-gray-400">{c.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(c.hex)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold flex items-center gap-1 hover:bg-white/10 text-gray-300 hover:text-white transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedColor === c.hex ? "Kopiert!" : c.hex}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl border border-white/5">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-violet-400" />
          Nutzungsbedingungen für Bildmaterial
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
          <li>Verändere das Logo nicht in Form, Farbe oder Proportion.</li>
          <li>Platziere das Logo nur auf kontrastreichen Hintergründen.</li>
          <li>Nutze das Logo nicht, um eine offizielle Partnerschaft vorzutäuschen, wenn keine besteht.</li>
        </ul>
      </div>
    </div>
  );
}
