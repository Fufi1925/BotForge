import { Download, Smartphone, Laptop, FileText, Shield } from "lucide-react";

const downloads = [
  { title: "BotForge Desktop (Windows)", version: "v2.0.1", size: "64 MB", icon: Laptop, desc: "Unser natives Dashboard als Windows-App mit System-Tray Benachrichtigungen." },
  { title: "BotForge Desktop (macOS)", version: "v2.0.1", size: "68 MB", icon: Laptop, desc: "Native macOS App optimiert für Apple Silicon (M1/M2/M3) und Intel." },
  { title: "Mobile App (Android Beta)", version: "v1.9-beta", size: "18 MB", icon: Smartphone, desc: "Verwalte deine Discord-Server von unterwegs. APK-Direktdownload." },
  { title: "Branding-Kit & Assets", version: "2026 Update", size: "4.2 MB", icon: FileText, desc: "Offizielle Logos, Farbcodes und hochauflösende Wallpaper im ZIP." },
];

export default function Downloads() {
  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Download className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Asset- & App-Center</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          Download <span className="text-gradient">Center</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Lade unsere Desktop-Clients, Mobile-Apps und Medien-Assets herunter, um BotForge nahtlos in dein Setup zu integrieren.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {downloads.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover-lift flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">{item.title}</h3>
                    <p className="text-[10px] text-gray-400">{item.version} · {item.size}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <button className="btn-primary w-full inline-flex items-center justify-center gap-2 text-xs py-2">
                <Download className="w-4 h-4" /> Download starten
              </button>
            </div>
          );
        })}
      </div>

      <div className="glass p-6 rounded-2xl border border-white/5">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-violet-400" />
          Sicherheits-Garantie
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          Sämtliche ausführbaren Dateien (Windows/macOS) und App-Pakete (Android APK) sind digital signiert, 
          virengeprüft und Open-Source. Du kannst den Quellcode der Apps jederzeit in unserem GitHub-Repository einsehen.
        </p>
      </div>
    </div>
  );
}
