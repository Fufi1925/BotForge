import { useState } from "react";
import { Award, Search, Sparkles, User } from "lucide-react";

const initialLeaderboard = [
  { rank: 1, name: "Spike#1337", xp: 452830, level: 142, server: "Nebula Gaming", color: "from-yellow-400 to-amber-500" },
  { rank: 2, name: "Laura_Art", xp: 384920, level: 121, server: "ArtStation DE", color: "from-slate-300 to-slate-400" },
  { rank: 3, name: "GamerPro", xp: 324910, level: 109, server: "Nebula Gaming", color: "from-amber-600 to-amber-700" },
  { rank: 4, name: "MusicLover_99", xp: 294810, level: 98, server: "Music Lounge", color: "" },
  { rank: 5, name: "DevMaster", xp: 284920, level: 95, server: "CyberDev Hub", color: "" },
  { rank: 6, name: "NekoChan", xp: 254830, level: 87, server: "Anime Universe", color: "" },
  { rank: 7, name: "StudyGuy", xp: 224910, level: 79, server: "Study Together", color: "" },
  { rank: 8, name: "AlphaMod", xp: 194830, level: 68, server: "CyberDev Hub", color: "" },
];

export default function GlobalLeaderboard() {
  const [q, setQ] = useState("");
  
  const filtered = initialLeaderboard.filter(
    u => u.name.toLowerCase().includes(q.toLowerCase()) || u.server.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 fade-up">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs mb-4 border border-violet-500/30 glow-violet">
          <Award className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">Globale Bestenliste</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3">
          XP <span className="text-gradient">Leaderboard</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Sieh dir die aktivsten Mitglieder über alle registrierten BotForge-Server hinweg an.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-8 fade-up">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nach User oder Server suchen..."
          className="input pl-11"
        />
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-12 bg-white/5 p-4 text-xs uppercase font-bold text-gray-400 border-b border-white/5">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-5">Mitglied</div>
          <div className="col-span-3">Level</div>
          <div className="col-span-2 text-right">XP</div>
        </div>

        <div className="divide-y divide-white/5">
          {filtered.map((user, i) => (
            <div key={i} className="grid grid-cols-12 p-4 items-center hover:bg-white/5 transition">
              <div className="col-span-2 flex justify-center">
                {user.rank <= 3 ? (
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-black shadow`}>
                    {user.rank}
                  </div>
                ) : (
                  <span className="text-gray-500 font-mono font-semibold">#{user.rank}</span>
                )}
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="font-bold text-white">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.server}</div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Level {user.level}</span>
                </div>
              </div>
              <div className="col-span-2 text-right font-mono text-sm font-semibold text-violet-300">
                {user.xp.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
