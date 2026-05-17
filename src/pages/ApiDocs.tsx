export default function ApiDocs() {
  const endpoints = [
    { m: "GET", p: "/health", d: "Health-Check mit Bot-Status", auth: false },
    { m: "GET", p: "/api/stats", d: "Live Bot-Statistiken (Server, User, Ping, Uptime)", auth: false },
    { m: "GET", p: "/api/login", d: "Startet Discord OAuth-Flow", auth: false },
    { m: "GET", p: "/api/callback", d: "OAuth Callback (intern)", auth: false },
    { m: "GET", p: "/api/me", d: "Aktueller eingeloggter User", auth: true },
    { m: "GET", p: "/api/guilds", d: "Server-Liste mit Manage-Rechten", auth: true },
    { m: "GET", p: "/api/guilds/:id/config", d: "Server-Config laden", auth: true },
    { m: "POST", p: "/api/guilds/:id/config", d: "Server-Config speichern", auth: true },
    { m: "GET", p: "/api/logout", d: "Logout und Session löschen", auth: true },
  ];

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl font-black mb-3 fade-up">
        API <span className="text-gradient">Documentation</span>
      </h1>
      <p className="text-gray-400 mb-10">
        Die BotForge API ist öffentlich für Developer. Basis-URL: <code className="text-violet-300">https://api.botforge.app</code>
      </p>

      <div className="glass p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">🔐 Authentication</h2>
        <p className="text-sm text-gray-300 mb-3">
          Die meisten Endpoints erfordern Discord OAuth2. Der Login-Flow läuft über <code className="text-violet-300">/api/login</code>.
          Nach erfolgreichem Login wird eine Session gesetzt.
        </p>
        <div className="p-3 rounded-xl bg-black/40 font-mono text-xs overflow-x-auto">
          GET /api/login → Redirect zu Discord → Callback mit Code → Session gesetzt
        </div>
      </div>

      <div className="glass p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">📡 Endpoints</h2>
        <div className="space-y-2">
          {endpoints.map((e, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 flex-wrap">
              <span className={`text-xs font-bold px-2 py-1 rounded ${e.m === "GET" ? "bg-green-500/20 text-green-300" : "bg-amber-500/20 text-amber-300"}`}>
                {e.m}
              </span>
              <code className="text-sm text-cyan-300 font-mono">{e.p}</code>
              <span className="text-sm text-gray-300 flex-1">{e.d}</span>
              {e.auth && <span className="text-xs px-2 py-1 rounded bg-violet-500/20 text-violet-300">🔒 Auth</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-6">
        <h2 className="font-bold text-lg mb-4">📊 Beispiel: /api/stats</h2>
        <div className="p-4 rounded-xl bg-black/40 font-mono text-xs overflow-x-auto">
{`{
  "guilds": 847,
  "users": 248000,
  "channels": 14523,
  "ping": 42,
  "uptime": 1243200,
  "commands": { "play": 4283, "ticket": 1843 },
  "version": "2.0.0"
}`}
        </div>
      </div>
    </div>
  );
}
