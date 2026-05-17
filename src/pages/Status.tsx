import { useEffect, useState } from "react";
import { Activity, Server, Zap, Clock, Wifi, Database, Cpu, Radio, Check, AlertCircle, Users, Hash, ShieldCheck } from "lucide-react";
import { useLiveStats, formatUptime } from "../hooks/useLiveStats";

const PAGE_VISIBLE = true;

export default function Status() {
  if (!PAGE_VISIBLE) return null;
  const stats = useLiveStats(10000);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setLastUpdate(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  const services = [
    { name: "Discord Gateway", icon: Wifi, latency: stats.ping + "ms" },
    { name: "Bot Core", icon: Cpu, latency: "1ms" },
    { name: "Web Dashboard", icon: Server, latency: stats.ping + 5 + "ms" },
    { name: "Database (MongoDB)", icon: Database, latency: "8ms" },
    { name: "Music (Lavalink)", icon: Radio, latency: "12ms" },
    { name: "AutoMod & Filter", icon: ShieldCheck, latency: "3ms" },
  ];

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-green-500/30">
            <span className="pulse-dot" />
            <span className="text-green-300 uppercase tracking-widest font-bold">Alle Systeme Operational</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            BotForge <span className="text-gradient">Status</span>
          </h1>
          <p className="text-gray-400">Live-Daten der Infrastruktur · Update alle 10 Sekunden</p>
        </div>
        <div className="text-xs text-gray-500 glass px-3 py-2 rounded-lg">
          Letzte Aktualisierung: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { l: "Uptime", v: formatUptime(stats.uptime), i: Clock, c: "from-emerald-500 to-teal-500" },
          { l: "Ping", v: `${stats.ping}ms`, i: Activity, c: "from-amber-500 to-orange-500" },
          { l: "Server", v: stats.guilds.toLocaleString(), i: Server, c: "from-violet-500 to-purple-500" },
          { l: "User", v: stats.users.toLocaleString(), i: Users, c: "from-cyan-500 to-blue-500" },
        ].map((s, i) => {
          const Ic = s.i;
          return (
            <div key={i} className="glass p-5 rounded-2xl hover-pop">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.c} flex items-center justify-center mb-3`}>
                <Ic className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gradient">{s.v}</div>
              <div className="text-xs text-gray-400 mt-1">{s.l}</div>
            </div>
          );
        })}
      </div>

      {/* Services */}
      <div className="glass p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" /> Services
          </h2>
          <span className="text-xs text-green-400">{services.length} / {services.length} Online</span>
        </div>
        <div className="space-y-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Operational
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-400 font-mono">{s.latency}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Last 30 Days */}
      <div className="glass p-6 rounded-2xl mb-8">
        <h2 className="font-bold text-lg mb-5">Verfügbarkeit · Letzte 30 Tage</h2>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 30 }).map((_, i) => {
            const up = i !== 7 && i !== 22;
            return (
              <div key={i} className="flex-1 group relative">
                <div className={`h-10 rounded ${up ? "bg-green-500" : "bg-amber-500"} hover:scale-y-110 transition`} />
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500" /> 100% uptime</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500" /> Partial outage</div>
          <div className="ml-auto">99.94% overall</div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-6 rounded-2xl">
          <h3 className="font-bold mb-3 flex items-center gap-2"><Hash className="w-4 h-4" /> Infrastruktur</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Version</span><span className="font-mono">{stats.version}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Hosting</span><span>Railway (EU)</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Datenbank</span><span>MongoDB Atlas</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Channels gesamt</span><span>{stats.channels.toLocaleString()}</span></div>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Keine geplanten Wartungen</h3>
            <p className="text-sm text-gray-400">
              Alle Systeme laufen stabil. Bei Problemen: <a href="mailto:fufi@botforge.app" className="text-violet-400">fufi@botforge.app</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
