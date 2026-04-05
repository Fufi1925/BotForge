
import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0b0f",
  surface: "#111318",
  card: "#161920",
  border: "#1e222e",
  accent: "#5865f2",
  accentHover: "#4752c4",
  green: "#57f287",
  red: "#ed4245",
  yellow: "#fee75c",
  text: "#e3e5e8",
  muted: "#72767d",
  blurple: "#5865f2",
};

const FONT = `'Syne', sans-serif`;

const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: ${FONT}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.surface}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
  input, select, textarea {
    background: ${COLORS.bg};
    border: 1px solid ${COLORS.border};
    color: ${COLORS.text};
    font-family: ${FONT};
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: ${COLORS.accent}; }
  textarea { resize: vertical; min-height: 80px; }
  select option { background: ${COLORS.card}; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .page { animation: fadeIn 0.25s ease; }
  .glow { box-shadow: 0 0 20px rgba(88,101,242,0.15); }
`;
document.head.appendChild(style);

// ── Icons ──────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d={d} />
  </svg>
);

const Icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  commands: "M8 9l3 3-3 3 M13 15h3",
  mod: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  welcome: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  auto: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  log: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  music: "M9 18V5l12-2v13 M6 21a3 3 0 100-6 3 3 0 000 6z M18 19a3 3 0 100-6 3 3 0 000 6z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  roles: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  plus: "M12 5v14 M5 12h14",
  trash: "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6 M10 11v6 M14 11v6 M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18 M6 6l12 12",
  discord: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.130 18.11a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
};

// ── UI Components ───────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant = "primary", small, full, style: s }) => {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    padding: small ? "6px 12px" : "10px 18px",
    borderRadius: 8, border: "none", cursor: "pointer",
    fontFamily: FONT, fontWeight: 600, fontSize: small ? 13 : 14,
    transition: "all 0.18s", width: full ? "100%" : "auto",
  };
  const variants = {
    primary: { background: COLORS.accent, color: "#fff" },
    danger: { background: COLORS.red, color: "#fff" },
    ghost: { background: "transparent", color: COLORS.muted, border: `1px solid ${COLORS.border}` },
    success: { background: COLORS.green, color: "#000" },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...s }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      onClick={onClick}>{children}</button>
  );
};

const Card = ({ children, style: s, glow }) => (
  <div style={{
    background: COLORS.card, border: `1px solid ${COLORS.border}`,
    borderRadius: 12, padding: 20, ...(glow ? { boxShadow: "0 0 30px rgba(88,101,242,0.12)" } : {}), ...s
  }}>{children}</div>
);

const Badge = ({ children, color }) => (
  <span style={{
    background: color + "22", color, padding: "3px 10px",
    borderRadius: 20, fontSize: 12, fontWeight: 600,
  }}>{children}</span>
);

const Toggle = ({ value, onChange }) => (
  <div onClick={() => onChange(!value)} style={{
    width: 44, height: 24, borderRadius: 12, cursor: "pointer",
    background: value ? COLORS.accent : COLORS.border,
    position: "relative", transition: "background 0.2s",
  }}>
    <div style={{
      position: "absolute", top: 3, left: value ? 23 : 3,
      width: 18, height: 18, borderRadius: "50%", background: "#fff",
      transition: "left 0.2s",
    }} />
  </div>
);

const StatCard = ({ label, value, sub, color, icon }) => (
  <Card style={{ flex: 1, minWidth: 160 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 8 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: color || COLORS.text }}>{value}</div>
        {sub && <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{sub}</div>}
      </div>
      <div style={{ background: (color || COLORS.accent) + "22", borderRadius: 10, padding: 10 }}>
        <Icon d={icon} size={22} color={color || COLORS.accent} />
      </div>
    </div>
  </Card>
);

const Label = ({ children }) => (
  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{children}</div>
);

const Divider = () => <div style={{ height: 1, background: COLORS.border, margin: "16px 0" }} />;

const Toast = ({ msg, type, onClose }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24, zIndex: 999,
    background: type === "success" ? COLORS.green : COLORS.red,
    color: type === "success" ? "#000" : "#fff",
    padding: "12px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14,
    display: "flex", alignItems: "center", gap: 8,
    animation: "fadeIn 0.2s ease",
  }}>
    <Icon d={type === "success" ? Icons.check : Icons.x} size={16} />
    {msg}
  </div>
);

// ── Pages ───────────────────────────────────────────────────────────────

function DashboardPage() {
  const stats = [
    { label: "Server Members", value: "1,247", sub: "+12 this week", color: COLORS.blurple, icon: Icons.roles },
    { label: "Commands Used", value: "8,439", sub: "Today: 342", color: COLORS.green, icon: Icons.commands },
    { label: "Messages Logged", value: "52,810", sub: "Last 30 days", color: COLORS.yellow, icon: Icons.log },
    { label: "Warns Issued", value: "34", sub: "This month", color: COLORS.red, icon: Icons.mod },
  ];

  const activity = [
    { user: "MaxMustermann#1234", action: "Used !ban on SpamUser#0001", time: "2 min ago", type: "mod" },
    { user: "Automod", action: "Deleted message with banned word", time: "8 min ago", type: "auto" },
    { user: "LucasK#5566", action: "Used !play Lofi Chill", time: "15 min ago", type: "music" },
    { user: "NewUser#9900", action: "Joined the server – Welcome sent!", time: "22 min ago", type: "welcome" },
    { user: "AdminXYZ#0001", action: "Updated bot settings", time: "1h ago", type: "settings" },
  ];

  const typeColor = { mod: COLORS.red, auto: COLORS.yellow, music: COLORS.blurple, welcome: COLORS.green, settings: COLORS.muted };

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: COLORS.muted, marginBottom: 24 }}>Übersicht deines Discord Bots</p>

      {/* Bot Status */}
      <Card style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }} glow>
        <div style={{
          width: 54, height: 54, borderRadius: "50%",
          background: "linear-gradient(135deg, #5865f2, #57f287)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24
        }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>BotForge Bot</div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>ID: 1234567890 • Prefix: <code style={{ background: COLORS.bg, padding: "1px 6px", borderRadius: 4 }}>!</code></div>
        </div>
        <Badge color={COLORS.green}>● Online</Badge>
        <Badge color={COLORS.blurple}>Ping: 42ms</Badge>
        <Badge color={COLORS.yellow}>Uptime: 99.8%</Badge>
      </Card>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Activity */}
      <Card>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d={Icons.activity} size={18} color={COLORS.accent} /> Letzte Aktivität
        </div>
        {activity.map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 0", borderBottom: i < activity.length - 1 ? `1px solid ${COLORS.border}` : "none"
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColor[a.type], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{a.user}</span>
              <span style={{ color: COLORS.muted, fontSize: 13 }}> — {a.action}</span>
            </div>
            <span style={{ color: COLORS.muted, fontSize: 12 }}>{a.time}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function CommandsPage() {
  const [commands, setCommands] = useState([
    { name: "!help", desc: "Zeigt alle Befehle an", enabled: true, cooldown: 5, perm: "everyone" },
    { name: "!ban", desc: "Bannt einen User", enabled: true, cooldown: 0, perm: "moderator" },
    { name: "!kick", desc: "Kickt einen User", enabled: true, cooldown: 0, perm: "moderator" },
    { name: "!mute", desc: "Mutet einen User", enabled: true, cooldown: 0, perm: "moderator" },
    { name: "!warn", desc: "Verwarnt einen User", enabled: true, cooldown: 0, perm: "moderator" },
    { name: "!play", desc: "Spielt Musik ab", enabled: false, cooldown: 3, perm: "everyone" },
    { name: "!skip", desc: "Überspringt Song", enabled: false, cooldown: 5, perm: "everyone" },
    { name: "!purge", desc: "Löscht Nachrichten", enabled: true, cooldown: 10, perm: "admin" },
    { name: "!userinfo", desc: "Infos über User", enabled: true, cooldown: 5, perm: "everyone" },
    { name: "!serverinfo", desc: "Infos über Server", enabled: true, cooldown: 5, perm: "everyone" },
    { name: "!poll", desc: "Erstellt eine Umfrage", enabled: true, cooldown: 30, perm: "everyone" },
    { name: "!giveaway", desc: "Startet ein Giveaway", enabled: true, cooldown: 0, perm: "admin" },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newCmd, setNewCmd] = useState({ name: "", desc: "", cooldown: 0, perm: "everyone" });

  const permColor = { everyone: COLORS.green, moderator: COLORS.yellow, admin: COLORS.red };

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Commands</h1>
          <p style={{ color: COLORS.muted }}>Befehle aktivieren, deaktivieren & konfigurieren</p>
        </div>
        <Btn onClick={() => setShowAdd(!showAdd)}>
          <Icon d={Icons.plus} size={16} /> Befehl hinzufügen
        </Btn>
      </div>

      {showAdd && (
        <Card style={{ marginBottom: 20, border: `1px solid ${COLORS.accent}` }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Neuen Befehl erstellen</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr", gap: 12 }}>
            <div><Label>Name</Label><input placeholder="!meincmd" value={newCmd.name} onChange={e => setNewCmd(p => ({ ...p, name: e.target.value }))} /></div>
            <div><Label>Beschreibung</Label><input placeholder="Was macht dieser Befehl?" value={newCmd.desc} onChange={e => setNewCmd(p => ({ ...p, desc: e.target.value }))} /></div>
            <div><Label>Cooldown (s)</Label><input type="number" min={0} value={newCmd.cooldown} onChange={e => setNewCmd(p => ({ ...p, cooldown: e.target.value }))} /></div>
            <div><Label>Berechtigung</Label>
              <select value={newCmd.perm} onChange={e => setNewCmd(p => ({ ...p, perm: e.target.value }))}>
                <option value="everyone">Everyone</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <Btn small onClick={() => {
              if (newCmd.name) { setCommands(p => [...p, { ...newCmd, enabled: true }]); setShowAdd(false); setNewCmd({ name: "", desc: "", cooldown: 0, perm: "everyone" }); }
            }}>Hinzufügen</Btn>
            <Btn small variant="ghost" onClick={() => setShowAdd(false)}>Abbrechen</Btn>
          </div>
        </Card>
      )}

      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1fr auto auto", gap: 0 }}>
          {["Befehl", "Beschreibung", "Berechtigung", "Cooldown", "Status", ""].map(h => (
            <div key={h} style={{ padding: "8px 12px", fontSize: 12, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${COLORS.border}` }}>{h}</div>
          ))}
          {commands.map((cmd, i) => (
            <>
              <div style={{ padding: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: COLORS.blurple, borderBottom: `1px solid ${COLORS.border}` }}>{cmd.name}</div>
              <div style={{ padding: "12px", fontSize: 13, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }}>{cmd.desc}</div>
              <div style={{ padding: "12px", borderBottom: `1px solid ${COLORS.border}` }}><Badge color={permColor[cmd.perm]}>{cmd.perm}</Badge></div>
              <div style={{ padding: "12px", fontSize: 13, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }}>{cmd.cooldown}s</div>
              <div style={{ padding: "12px", display: "flex", alignItems: "center", borderBottom: `1px solid ${COLORS.border}` }}>
                <Toggle value={cmd.enabled} onChange={v => setCommands(p => p.map((c, j) => j === i ? { ...c, enabled: v } : c))} />
              </div>
              <div style={{ padding: "12px", borderBottom: `1px solid ${COLORS.border}` }}>
                <Btn small variant="danger" onClick={() => setCommands(p => p.filter((_, j) => j !== i))}>
                  <Icon d={Icons.trash} size={13} />
                </Btn>
              </div>
            </>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ModerationPage() {
  const [settings, setSettings] = useState({
    automod: true, banWords: true, spamFilter: true, linkFilter: false,
    maxWarns: 3, warnAction: "mute", muteDuration: 10,
    banWordsList: "spam, discord.gg/free, nitro free",
    logChannel: "#mod-logs",
  });

  const [warns, setWarns] = useState([
    { user: "BadUser#1234", reason: "Spam", count: 2, by: "ModXYZ#0001" },
    { user: "TrollGuy#5678", reason: "Beleidigung", count: 3, by: "AdminABC#0002" },
    { user: "NewUser#9012", reason: "Advertising", count: 1, by: "Automod" },
  ]);

  const S = (key, val) => setSettings(p => ({ ...p, [key]: val }));

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Moderation</h1>
      <p style={{ color: COLORS.muted, marginBottom: 24 }}>AutoMod, Warn-System & Filter</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={Icons.mod} size={16} color={COLORS.red} /> AutoMod Einstellungen
          </div>
          {[
            { key: "automod", label: "AutoMod aktiviert" },
            { key: "banWords", label: "Verbotene Wörter filtern" },
            { key: "spamFilter", label: "Spam-Filter" },
            { key: "linkFilter", label: "Link-Filter" },
          ].map(item => (
            <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 14 }}>{item.label}</span>
              <Toggle value={settings[item.key]} onChange={v => S(item.key, v)} />
            </div>
          ))}
          <Divider />
          <Label>Verbotene Wörter (kommagetrennt)</Label>
          <textarea value={settings.banWordsList} onChange={e => S("banWordsList", e.target.value)} style={{ marginTop: 4 }} />
        </Card>

        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={Icons.bell} size={16} color={COLORS.yellow} /> Warn-System
          </div>
          <Label>Max. Verwarnungen vor Strafe</Label>
          <input type="number" min={1} max={10} value={settings.maxWarns} onChange={e => S("maxWarns", e.target.value)} style={{ marginBottom: 14 }} />
          <Label>Aktion bei Max. Warns</Label>
          <select value={settings.warnAction} onChange={e => S("warnAction", e.target.value)} style={{ marginBottom: 14 }}>
            <option value="mute">Mute</option>
            <option value="kick">Kick</option>
            <option value="ban">Ban</option>
          </select>
          <Label>Mute-Dauer (Minuten)</Label>
          <input type="number" min={1} value={settings.muteDuration} onChange={e => S("muteDuration", e.target.value)} style={{ marginBottom: 14 }} />
          <Label>Log-Channel</Label>
          <input value={settings.logChannel} onChange={e => S("logChannel", e.target.value)} />
        </Card>
      </div>

      <Card>
        <div style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d={Icons.bell} size={16} color={COLORS.yellow} /> Aktive Verwarnungen
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1fr auto", gap: 0 }}>
          {["User", "Grund", "Anzahl", "Von", ""].map(h => (
            <div key={h} style={{ padding: "8px 12px", fontSize: 12, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${COLORS.border}` }}>{h}</div>
          ))}
          {warns.map((w, i) => (
            <>
              <div style={{ padding: "12px", fontSize: 13, fontWeight: 600, borderBottom: `1px solid ${COLORS.border}` }}>{w.user}</div>
              <div style={{ padding: "12px", fontSize: 13, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }}>{w.reason}</div>
              <div style={{ padding: "12px", borderBottom: `1px solid ${COLORS.border}` }}>
                <Badge color={w.count >= 3 ? COLORS.red : w.count >= 2 ? COLORS.yellow : COLORS.green}>{w.count}x</Badge>
              </div>
              <div style={{ padding: "12px", fontSize: 13, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }}>{w.by}</div>
              <div style={{ padding: "12px", borderBottom: `1px solid ${COLORS.border}` }}>
                <Btn small variant="danger" onClick={() => setWarns(p => p.filter((_, j) => j !== i))}>Reset</Btn>
              </div>
            </>
          ))}
        </div>
      </Card>
    </div>
  );
}

function WelcomePage() {
  const [s, setS] = useState({
    enabled: true,
    channel: "#willkommen",
    message: "Willkommen auf dem Server, {user}! 🎉\nDu bist Mitglied #{count}.\n\nLies die Regeln in #regeln!",
    dmEnabled: false,
    dmMessage: "Hey {user}, willkommen! Lies unsere Regeln: {rules_link}",
    autoRole: true,
    role: "@Member",
    goodbye: true,
    goodbyeChannel: "#allgemein",
    goodbyeMsg: "{user} hat den Server verlassen. Tschüss! 👋",
    embedColor: "#5865f2",
  });
  const U = (k, v) => setS(p => ({ ...p, [k]: v }));

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Willkommens-System</h1>
      <p style={{ color: COLORS.muted, marginBottom: 24 }}>Begrüße neue Mitglieder automatisch</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 700 }}>Willkommens-Nachricht</div>
            <Toggle value={s.enabled} onChange={v => U("enabled", v)} />
          </div>
          <Label>Channel</Label>
          <input value={s.channel} onChange={e => U("channel", e.target.value)} style={{ marginBottom: 12 }} />
          <Label>Nachricht <span style={{ color: COLORS.muted, fontWeight: 400 }}>({"{user}"}, {"{count}"} verfügbar)</span></Label>
          <textarea value={s.message} onChange={e => U("message", e.target.value)} style={{ marginBottom: 12, minHeight: 120 }} />
          <Label>Embed-Farbe</Label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="color" value={s.embedColor} onChange={e => U("embedColor", e.target.value)} style={{ width: 44, height: 36, padding: 2, cursor: "pointer" }} />
            <input value={s.embedColor} onChange={e => U("embedColor", e.target.value)} style={{ flex: 1 }} />
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>DM-Willkommen</div>
              <Toggle value={s.dmEnabled} onChange={v => U("dmEnabled", v)} />
            </div>
            <Label>DM-Nachricht</Label>
            <textarea value={s.dmMessage} onChange={e => U("dmMessage", e.target.value)} style={{ minHeight: 80 }} />
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>Auto-Rolle</div>
              <Toggle value={s.autoRole} onChange={v => U("autoRole", v)} />
            </div>
            <Label>Rolle bei Beitritt</Label>
            <input value={s.role} onChange={e => U("role", e.target.value)} />
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>Abschiedsnachricht</div>
              <Toggle value={s.goodbye} onChange={v => U("goodbye", v)} />
            </div>
            <Label>Channel</Label>
            <input value={s.goodbyeChannel} onChange={e => U("goodbyeChannel", e.target.value)} style={{ marginBottom: 12 }} />
            <Label>Nachricht</Label>
            <input value={s.goodbyeMsg} onChange={e => U("goodbyeMsg", e.target.value)} />
          </Card>
        </div>
      </div>
    </div>
  );
}

function AutoResponderPage() {
  const [responses, setResponses] = useState([
    { trigger: "discord.gg", response: "Bitte keine Invite-Links! ❌", type: "contains", enabled: true },
    { trigger: "!ping", response: "Pong! 🏓", type: "exact", enabled: true },
    { trigger: "help me", response: "Schreib !help für alle Befehle!", type: "contains", enabled: true },
    { trigger: "guten morgen", response: "Guten Morgen! ☀️", type: "startsWith", enabled: false },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newR, setNewR] = useState({ trigger: "", response: "", type: "contains" });

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Auto-Responder</h1>
          <p style={{ color: COLORS.muted }}>Automatisch auf Nachrichten antworten</p>
        </div>
        <Btn onClick={() => setShowAdd(!showAdd)}><Icon d={Icons.plus} size={16} /> Hinzufügen</Btn>
      </div>

      {showAdd && (
        <Card style={{ marginBottom: 20, border: `1px solid ${COLORS.accent}` }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Neuer Auto-Responder</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div><Label>Trigger</Label><input placeholder='z.B. "help me"' value={newR.trigger} onChange={e => setNewR(p => ({ ...p, trigger: e.target.value }))} /></div>
            <div><Label>Antwort</Label><input placeholder="Bot-Antwort..." value={newR.response} onChange={e => setNewR(p => ({ ...p, response: e.target.value }))} /></div>
            <div><Label>Typ</Label>
              <select value={newR.type} onChange={e => setNewR(p => ({ ...p, type: e.target.value }))}>
                <option value="exact">Exakt</option>
                <option value="contains">Enthält</option>
                <option value="startsWith">Beginnt mit</option>
                <option value="regex">Regex</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <Btn small onClick={() => {
              if (newR.trigger && newR.response) {
                setResponses(p => [...p, { ...newR, enabled: true }]);
                setShowAdd(false); setNewR({ trigger: "", response: "", type: "contains" });
              }
            }}>Speichern</Btn>
            <Btn small variant="ghost" onClick={() => setShowAdd(false)}>Abbrechen</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {responses.map((r, i) => (
          <Card key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Toggle value={r.enabled} onChange={v => setResponses(p => p.map((x, j) => j === i ? { ...x, enabled: v } : x))} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <code style={{ background: COLORS.bg, padding: "3px 8px", borderRadius: 6, fontSize: 13, color: COLORS.blurple }}>{r.trigger}</code>
                <Badge color={COLORS.muted}>{r.type}</Badge>
              </div>
              <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>→ {r.response}</div>
            </div>
            <Btn small variant="danger" onClick={() => setResponses(p => p.filter((_, j) => j !== i))}>
              <Icon d={Icons.trash} size={13} />
            </Btn>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LoggingPage() {
  const [events, setEvents] = useState([
    { key: "messageDelete", label: "Nachricht gelöscht", enabled: true },
    { key: "messageEdit", label: "Nachricht bearbeitet", enabled: true },
    { key: "memberJoin", label: "Mitglied beigetreten", enabled: true },
    { key: "memberLeave", label: "Mitglied gegangen", enabled: true },
    { key: "ban", label: "Ban", enabled: true },
    { key: "kick", label: "Kick", enabled: true },
    { key: "roleUpdate", label: "Rolle aktualisiert", enabled: false },
    { key: "channelUpdate", label: "Channel aktualisiert", enabled: false },
    { key: "voiceJoin", label: "Voice beigetreten", enabled: false },
    { key: "voiceLeave", label: "Voice verlassen", enabled: false },
  ]);
  const [logChannel, setLogChannel] = useState("#logs");

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Logging</h1>
      <p style={{ color: COLORS.muted, marginBottom: 24 }}>Welche Events werden protokolliert?</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Log-Kanal</div>
          <Label>Channel</Label>
          <input value={logChannel} onChange={e => setLogChannel(e.target.value)} style={{ marginBottom: 14 }} />
          <div style={{ background: COLORS.bg, borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: COLORS.muted }}>Vorschau</div>
            <div style={{ fontSize: 13, borderLeft: `3px solid ${COLORS.blurple}`, paddingLeft: 10 }}>
              <div style={{ color: COLORS.red, fontWeight: 600 }}>🗑️ Nachricht gelöscht</div>
              <div style={{ color: COLORS.muted, marginTop: 4 }}>User: MaxMustermann#1234</div>
              <div style={{ color: COLORS.muted }}>Channel: #allgemein</div>
              <div style={{ color: COLORS.muted }}>Inhalt: "Hello world!"</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Events auswählen</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {events.map((ev, i) => (
              <div key={ev.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.bg, borderRadius: 8, padding: "10px 14px" }}>
                <span style={{ fontSize: 14 }}>{ev.label}</span>
                <Toggle value={ev.enabled} onChange={v => setEvents(p => p.map((x, j) => j === i ? { ...x, enabled: v } : x))} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MusicPage() {
  const [s, setS] = useState({
    enabled: false, prefix: "!",
    volume: 70, maxQueue: 50, autoLeave: true,
    djRole: "@DJ", djOnly: false,
    channel: "#musik-befehle",
    nowPlayingMsg: true,
    allowedSources: ["youtube", "spotify"],
  });

  const queue = [
    { pos: 1, title: "Lofi Hip Hop Mix", by: "LucasK#5566", duration: "58:22" },
    { pos: 2, title: "Chill Beats", by: "AnnaM#1234", duration: "3:45" },
  ];

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Musik</h1>
      <p style={{ color: COLORS.muted, marginBottom: 24 }}>Musik-Bot Einstellungen</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 700 }}>Musik-System</div>
            <Toggle value={s.enabled} onChange={v => setS(p => ({ ...p, enabled: v }))} />
          </div>
          <Label>Lautstärke Standard (%)</Label>
          <input type="range" min={0} max={100} value={s.volume} onChange={e => setS(p => ({ ...p, volume: +e.target.value }))} style={{ width: "100%", marginBottom: 4, accentColor: COLORS.blurple }} />
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 14 }}>{s.volume}%</div>
          <Label>Max. Queue-Länge</Label>
          <input type="number" value={s.maxQueue} onChange={e => setS(p => ({ ...p, maxQueue: e.target.value }))} style={{ marginBottom: 14 }} />
          <Label>Befehls-Channel</Label>
          <input value={s.channel} onChange={e => setS(p => ({ ...p, channel: e.target.value }))} style={{ marginBottom: 14 }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span>Auto-Leave bei leerem Channel</span>
            <Toggle value={s.autoLeave} onChange={v => setS(p => ({ ...p, autoLeave: v }))} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span>Now Playing Nachricht</span>
            <Toggle value={s.nowPlayingMsg} onChange={v => setS(p => ({ ...p, nowPlayingMsg: v }))} />
          </div>
          <Divider />
          <Label>DJ-Rolle (nur diese darf steuern)</Label>
          <input value={s.djRole} onChange={e => setS(p => ({ ...p, djRole: e.target.value }))} style={{ marginBottom: 12 }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Nur DJ-Rolle erlaubt</span>
            <Toggle value={s.djOnly} onChange={v => setS(p => ({ ...p, djOnly: v }))} />
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Aktuelle Queue</div>
            {queue.length === 0
              ? <div style={{ color: COLORS.muted, textAlign: "center", padding: 20 }}>Queue ist leer</div>
              : queue.map(q => (
                <div key={q.pos} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ color: COLORS.blurple, fontWeight: 700, fontSize: 18 }}>{q.pos}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{q.title}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>Von {q.by} • {q.duration}</div>
                  </div>
                </div>
              ))
            }
          </Card>
          <Card>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Erlaubte Quellen</div>
            {["youtube", "spotify", "soundcloud"].map(src => (
              <div key={src} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ textTransform: "capitalize", fontWeight: 500 }}>{src}</div>
                <Toggle
                  value={s.allowedSources.includes(src)}
                  onChange={v => setS(p => ({
                    ...p,
                    allowedSources: v ? [...p.allowedSources, src] : p.allowedSources.filter(x => x !== src)
                  }))}
                />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ token, setToken, showToast }) {
  const [t, setT] = useState(token || "");
  const [prefix, setPrefix] = useState("!");
  const [name, setName] = useState("BotForge Bot");
  const [status, setStatus] = useState("online");
  const [activity, setActivity] = useState("!help | BotForge");

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Einstellungen</h1>
      <p style={{ color: COLORS.muted, marginBottom: 24 }}>Bot-Konfiguration & Token</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={Icons.discord} size={16} color={COLORS.blurple} /> Discord Bot Token
          </div>
          <Label>Bot Token</Label>
          <input type="password" placeholder="MTIzNDU2Nzg5…" value={t} onChange={e => setT(e.target.value)} style={{ marginBottom: 8 }} />
          <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 14 }}>⚠️ Teile deinen Token niemals mit anderen!</div>
          <Btn full onClick={() => { setToken(t); showToast("Token gespeichert! ✓", "success"); }}>Token speichern</Btn>
          <Divider />
          <Label>Bot-Präfix</Label>
          <input value={prefix} onChange={e => setPrefix(e.target.value)} style={{ marginBottom: 14 }} />
          <Label>Bot-Name</Label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </Card>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Status & Aktivität</div>
          <Label>Online-Status</Label>
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ marginBottom: 14 }}>
            <option value="online">🟢 Online</option>
            <option value="idle">🟡 Abwesend</option>
            <option value="dnd">🔴 Bitte nicht stören</option>
            <option value="invisible">⚫ Unsichtbar</option>
          </select>
          <Label>Aktivitäts-Text</Label>
          <input value={activity} onChange={e => setActivity(e.target.value)} style={{ marginBottom: 14 }} />
          <Btn full onClick={() => showToast("Einstellungen gespeichert! ✓", "success")}>Speichern</Btn>
          <Divider />
          <Card style={{ background: COLORS.bg }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>DisCloud Deployment</div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>Bot zu DisCloud hochladen (kostenlos & kein Kreditkarte)</div>
            <Btn full variant="ghost" onClick={() => window.open("https://discloud.app", "_blank")}>
              <Icon d={Icons.link} size={14} /> DisCloud öffnen
            </Btn>
          </Card>
        </Card>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [token, setToken] = useState("");
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Icons.dashboard },
    { id: "commands", label: "Commands", icon: Icons.commands },
    { id: "moderation", label: "Moderation", icon: Icons.mod },
    { id: "welcome", label: "Willkommen", icon: Icons.welcome },
    { id: "autoresponder", label: "Auto-Responder", icon: Icons.auto },
    { id: "logging", label: "Logging", icon: Icons.log },
    { id: "music", label: "Musik", icon: Icons.music },
    { id: "settings", label: "Einstellungen", icon: Icons.settings },
  ];

  const pages = {
    dashboard: <DashboardPage />,
    commands: <CommandsPage />,
    moderation: <ModerationPage />,
    welcome: <WelcomePage />,
    autoresponder: <AutoResponderPage />,
    logging: <LoggingPage />,
    music: <MusicPage />,
    settings: <SettingsPage token={token} setToken={setToken} showToast={showToast} />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 230 : 70, minHeight: "100vh",
        background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`,
        display: "flex", flexDirection: "column", transition: "width 0.25s",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 18px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #5865f2, #57f287)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>⚡</div>
          {sidebarOpen && <span style={{ fontWeight: 800, fontSize: 17, whiteSpace: "nowrap" }}>BotForge</span>}
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {navItems.map(item => {
            const active = page === item.id;
            return (
              <div key={item.id}
                onClick={() => setPage(item.id)}
                title={!sidebarOpen ? item.label : ""}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                  borderRadius: 8, cursor: "pointer", marginBottom: 2,
                  background: active ? COLORS.accent + "22" : "transparent",
                  color: active ? COLORS.accent : COLORS.muted,
                  fontWeight: active ? 600 : 400, fontSize: 14,
                  transition: "all 0.15s", overflow: "hidden", whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = COLORS.card; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon d={item.icon} size={18} color={active ? COLORS.accent : COLORS.muted} style={{ flexShrink: 0 }} />
                {sidebarOpen && item.label}
              </div>
            );
          })}
        </nav>

        {/* Collapse btn */}
        <div style={{ padding: "12px 10px", borderTop: `1px solid ${COLORS.border}` }}>
          <div onClick={() => setSidebarOpen(p => !p)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer", color: COLORS.muted, fontSize: 13 }}>
            <span style={{ transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "0.25s", fontSize: 16 }}>◀</span>
            {sidebarOpen && "Einklappen"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>
            {navItems.find(n => n.id === page)?.label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!token && (
              <Badge color={COLORS.yellow}>⚠️ Kein Token gesetzt</Badge>
            )}
            <Badge color={COLORS.green}>● Bot Online</Badge>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #5865f2, #57f287)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          </div>
        </div>

        {/* Page */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {pages[page]}
        </div>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}
