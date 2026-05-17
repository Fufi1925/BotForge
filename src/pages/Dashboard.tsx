import { useState } from "react";
import {
  LayoutDashboard, Ticket, Users, Mic, BarChart3, Shield,
  Video, Megaphone, MessageSquare, Award, Layers,
  Plus, Lock, Trash2, Image as ImageIcon,
  ChevronLeft, Power, Edit2, Send, X, Menu, Search,
  Hand, Headphones, Gavel, Volume2, Hash, Star, Lightbulb,
  Crown, Settings, LogOut, ExternalLink, Palette, Globe, Briefcase
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

// ============ UI Atoms ============
function Toggle({ on, onChange }: any) {
  return (
    <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition ${on ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function ModuleBanner({ active, onToggle }: any) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl mb-6 ${active ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? "bg-emerald-100" : "bg-red-100"}`}>
          <Power className={`w-5 h-5 ${active ? "text-emerald-600" : "text-red-500"}`} />
        </div>
        <div>
          <div className={`font-bold ${active ? "text-emerald-700" : "text-red-600"}`}>
            {active ? "Modul aktiviert" : "Modul deaktiviert"}
          </div>
          <div className="text-xs text-gray-500">
            {active ? "Klicke den Button, um das Modul zu deaktivieren." : "Aktuell ist dieses Modul deaktiviert."}
          </div>
        </div>
      </div>
      <button onClick={onToggle} className={`px-4 py-2 rounded-lg text-sm font-medium border ${active ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50" : "bg-red-100 border-red-300 text-red-600 hover:bg-red-200"}`}>
        {active ? "Deaktivieren" : "Aktivieren"}
      </button>
    </div>
  );
}

function Card({ title, children, action }: any) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, required, children }: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-900 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <div className="text-xs text-gray-500 mb-2">{hint}</div>}
      {children}
    </div>
  );
}

function Input(props: any) {
  return <input {...props} className={`w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-indigo-400 outline-none ${props.className || ""}`} />;
}

function Select(props: any) {
  return <select {...props} className={`w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-indigo-400 outline-none ${props.className || ""}`} />;
}

function ToggleRow({ label, desc, on, onChange }: any) {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900">{label}</div>
          {desc && <div className="text-xs text-gray-500 mt-0.5">{desc}</div>}
        </div>
        <Toggle on={on} onChange={onChange} />
      </div>
    </div>
  );
}

function PageHeader({ title, desc }: any) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
  );
}

// ============ EMBED EDITOR (mit Variablen) ============
const VARIABLES = ["%SERVERNAME%", "%USERNAME%", "%MENTION%", "%TOTALUSERCOUNT%", "%USERCOUNT%", "%BOTCOUNT%"];

function EmbedEditor({ open, onClose, initialTitle = "", initialDesc = "" }: any) {
  const [embed, setEmbed] = useState({
    title: initialTitle || "Welcome here!",
    description: initialDesc || "Hey %MENTION%! Please follow all our rules and make sure you are polite and respectful to others. Now, have fun!",
    color: "#5865F2",
    image: "",
    thumbnail: "",
    author_name: "",
    author_icon: "",
  });
  const [activeField, setActiveField] = useState<"title" | "description">("description");

  if (!open) return null;

  const insertVar = (v: string) => {
    if (activeField === "title") setEmbed({ ...embed, title: embed.title + v });
    else setEmbed({ ...embed, description: embed.description + v });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold">Embed Bearbeiten</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Preview */}
          <div className="bg-[#313338] rounded-lg p-3 mb-4">
            <div className="rounded bg-[#2b2d31] border-l-4 max-w-full overflow-hidden" style={{ borderLeftColor: embed.color }}>
              <div className="p-3">
                <div className="flex gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold flex items-center justify-between gap-2">
                      <span>{embed.title}</span>
                      <span className="text-[10px] text-gray-400">{embed.title.length} / 256</span>
                    </div>
                    <div className="text-xs text-gray-200 mt-1 whitespace-pre-wrap flex items-start justify-between gap-2">
                      <div className="flex-1">{embed.description}</div>
                      <span className="text-[10px] text-gray-400 shrink-0">{embed.description.length} / 4000</span>
                    </div>
                  </div>
                  {embed.thumbnail ? (
                    <img src={embed.thumbnail} alt="" className="w-16 h-16 rounded object-cover" onError={(e: any) => e.target.style.display = "none"} />
                  ) : (
                    <div className="w-16 h-16 rounded bg-white/10 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                </div>
                {embed.image && <img src={embed.image} alt="" className="mt-2 rounded max-w-full" onError={(e: any) => e.target.style.display = "none"} />}
              </div>
            </div>
          </div>

          {/* Variables */}
          <div className="flex flex-wrap gap-2 mb-4">
            {VARIABLES.map(v => (
              <button key={v} onClick={() => insertVar(v)} className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded text-xs font-mono">
                {v}
              </button>
            ))}
          </div>

          {/* Fields */}
          <Field label="Titel">
            <Input
              value={embed.title}
              maxLength={256}
              onFocus={() => setActiveField("title")}
              onChange={(e: any) => setEmbed({ ...embed, title: e.target.value })}
            />
          </Field>
          <Field label="Beschreibung">
            <textarea
              value={embed.description}
              maxLength={4000}
              onFocus={() => setActiveField("description")}
              onChange={e => setEmbed({ ...embed, description: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-indigo-400 outline-none min-h-[100px]"
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Farbe">
              <div className="flex gap-2">
                <input type="color" value={embed.color} onChange={e => setEmbed({ ...embed, color: e.target.value })} className="w-12 h-10 rounded border border-gray-200" />
                <Input value={embed.color} onChange={(e: any) => setEmbed({ ...embed, color: e.target.value })} />
              </div>
            </Field>
            <Field label="Thumbnail URL">
              <Input value={embed.thumbnail} onChange={(e: any) => setEmbed({ ...embed, thumbnail: e.target.value })} placeholder="https://..." />
            </Field>
          </div>
          <Field label="Bild (Banner)">
            <div className="flex gap-2">
              <Input value={embed.image} onChange={(e: any) => setEmbed({ ...embed, image: e.target.value })} placeholder="https://..." />
              <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </Field>

          <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 p-2 rounded-lg flex items-center gap-2 mt-3">
            <Lock className="w-3 h-3" /> Footer ist fest: "BotForge · botforge.app"
          </div>
        </div>

        <div className="flex justify-end gap-2 p-5 border-t border-gray-200 sticky bottom-0 bg-white">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Abbrechen</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">Speichern</button>
        </div>
      </div>
    </div>
  );
}

// ============ MODULES ============

function OverviewModule() {
  const { theme, setMode, setAccent } = useTheme();

  const presetColors = ["#7C3AED", "#6366F1", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#000000"];

  return (
    <div>
      <PageHeader title="© Koblenz RP" desc="Server Übersicht & Allgemeine Einstellungen." />

      <Card title="Allgemeine Einstellungen">
        <Field label="Dashboard-Farbe" hint="Wähle eine Farbe für dein Dashboard. Standard ist Schwarz/Dunkel.">
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setMode("dark")}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${theme.mode === "dark" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200"}`}
              >
                🌙 Dunkel (Standard)
              </button>
              <button
                onClick={() => setMode("light")}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${theme.mode === "light" ? "bg-indigo-50 text-indigo-700 border-indigo-300" : "bg-white text-gray-700 border-gray-200"}`}
              >
                ☀️ Hell
              </button>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-2">Akzentfarbe:</div>
              <div className="flex gap-2 flex-wrap">
                {presetColors.map(c => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    className={`w-8 h-8 rounded-lg border-2 ${theme.accent === c ? "border-gray-900 scale-110" : "border-gray-200"} transition-transform`}
                    style={{ background: c }}
                  />
                ))}
                <input type="color" value={theme.accent} onChange={e => setAccent(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border-2 border-gray-200" />
              </div>
            </div>
          </div>
        </Field>

        <Field label="Embed-Farbe" hint="Farbe, die in Embed-Nachrichten vom Bot benutzt wird">
          <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">Farbe wählen</span>
          </div>
        </Field>

        <Field label="Sprache" hint="Sprache, die der Bot auf dem Server nutzt">
          <Select defaultValue="Deutsch">
            <option>Deutsch</option>
            <option>English</option>
          </Select>
        </Field>

        <Field label="Zeitzone" hint="Zeitzone, in der sich der Server befindet">
          <Select defaultValue="Europe/Berlin">
            <option>Europe/Berlin</option>
            <option>Europe/London</option>
            <option>America/New_York</option>
          </Select>
        </Field>
      </Card>

      <Card title={<><Headphones className="w-4 h-4 inline mr-2" /> Support</>}>
        <p className="text-sm text-gray-600 mb-4">
          Hier bekommst du Hilfe vom BotForge-Support. Wenn du Hilfe anforderst, kannst du hier den Zugriff auf deinen Server für unser Team aktivieren.
        </p>
        <a href="https://discord.gg/botforge" target="_blank" rel="noreferrer" className="w-full block px-4 py-3 bg-indigo-500 text-white rounded-lg text-center text-sm font-medium hover:bg-indigo-600 inline-flex items-center justify-center gap-2">
          <ExternalLink className="w-4 h-4" /> BotForge Support-Server
        </a>
      </Card>
    </div>
  );
}

function WelcomeModule() {
  const [active, setActive] = useState(true);
  const [showEmbed, setShowEmbed] = useState<"join" | "leave" | null>(null);
  const [joinOn, setJoinOn] = useState(true);
  const [leaveOn, setLeaveOn] = useState(true);
  const [rolesOn, setRolesOn] = useState(true);

  return (
    <div>
      <PageHeader title="Willkommen" desc="Führe diverse Aktionen aus, wenn ein Nutzer deinen Server betritt." />
      <ModuleBanner active={active} onToggle={() => setActive(!active)} />

      <Card title="Nachricht in den Willkommenskanal">
        <ToggleRow label="Beitritts-Nachrichten aktivieren" desc="Eine Nachricht in einen Kanal senden, wenn ein Nutzer dem Server beitritt" on={joinOn} onChange={() => setJoinOn(!joinOn)} />
        <Field label="Kanal" required hint="Der Kanal, in dem die Nachricht gesendet wird">
          <Select><option>👋 | Willkommen</option></Select>
        </Field>
        <button onClick={() => setShowEmbed("join")} className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
          <Edit2 className="w-4 h-4" /> Embed-Editor öffnen
        </button>
      </Card>

      <Card title="Nachricht in den Leave-Kanal">
        <ToggleRow label="Leave-Nachrichten aktivieren" desc="Eine Nachricht in einen Kanal senden, wenn ein Nutzer den Server verlässt" on={leaveOn} onChange={() => setLeaveOn(!leaveOn)} />
        <Field label="Kanal" required hint="Der Kanal, in dem die Nachricht gesendet wird">
          <Select><option>✈️ | Abflug</option></Select>
        </Field>
        <button onClick={() => setShowEmbed("leave")} className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
          <Edit2 className="w-4 h-4" /> Embed-Editor öffnen
        </button>
      </Card>

      <Card title="Automatische Rollen">
        <ToggleRow label="Automatische Rollen aktivieren" desc="Dem Nutzer automatisch Rollen geben, sobald der den Server betritt" on={rolesOn} onChange={() => setRolesOn(!rolesOn)} />
        <Field label="Rollen" required hint="Die Rollen, die der Nutzer beim Beitritt erhält">
          <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg flex flex-wrap gap-1 items-center">
            <span className="px-2 py-0.5 bg-gray-100 rounded text-sm flex items-center gap-1">Unverified <X className="w-3 h-3 cursor-pointer" /></span>
          </div>
        </Field>
      </Card>

      <EmbedEditor
        open={!!showEmbed}
        onClose={() => setShowEmbed(null)}
        initialTitle={showEmbed === "join" ? "Welcome here!" : "Goodbye!"}
        initialDesc={showEmbed === "join" ? "Hey %MENTION%! Please follow all our rules and make sure you are polite and respectful to others. Now, have fun!" : "We will miss %MENTION% very much."}
      />
    </div>
  );
}

function SupportModule() {
  const [active, setActive] = useState(true);
  return (
    <div>
      <PageHeader title="Support" desc="Schaffe eine neue Supportmöglichkeit mit dem Voice Support." />
      <ModuleBanner active={active} onToggle={() => setActive(!active)} />

      <Card title="Zeiten" action={<button className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50"><Plus className="w-4 h-4" /></button>}>
        {["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].map(day => (
          <Field key={day} label={day}>
            <div className="flex gap-2 items-center">
              <Input defaultValue={day === "Samstag" || day === "Sonntag" ? "12:00 - 21:00" : day === "Freitag" ? "15:00 - 00:00" : "15:00 - 21:00"} className="flex-1" />
              <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 className="w-4 h-4" /></button>
            </div>
          </Field>
        ))}
      </Card>

      <Card title="Allgemeines">
        <Field label="Warteraum" hint="Kanal, dem der Nutzer beitritt, um einen neuen Supportfall zu erstellen">
          <Select><option>⏳ | Support Warteraum</option></Select>
        </Field>
        <Field label="Benachrichtigungs-Kanal" hint="Kanal, in dem Teammitglieder über neue Supportfälle benachrichtigt werden">
          <Select><option>📞 | Support-Leitstelle</option></Select>
        </Field>
        <Field label="Team Rolle" hint="Rolle, die bei neuen Supportfällen markiert wird und Supportfälle übernehmen kann">
          <Select><option>『❤️』 Staff Team</option></Select>
        </Field>
        <Field label="Support-Kanal Prefix" hint="Zeichen, die vor den Kanalnamen gesetzt werden">
          <Input defaultValue="1" maxLength={50} />
        </Field>
        <ToggleRow label="Eigene Kanäle verwenden" desc="Nutze existierende Kanäle, anstatt dass der Bot einen neuen Kanal erstellt" on={true} onChange={() => {}} />
        <Field label="Kategorie" required hint="Kategorie, in dem sich die Sprach-Support-Kanäle befinden">
          <Select><option>------support------</option></Select>
        </Field>
      </Card>

      <Card title="Duty-Modus">
        <ToggleRow label="Duty-System aktivieren" desc="Nur eingecheckte Teammitglieder werden bei einem neuen Supportfall benachrichtigt" on={false} onChange={() => {}} />
      </Card>

      <Card title="Wartemusik">
        <ToggleRow label="Wartemusik aktivieren" desc="Spiele Wartemusik, sobald ein Nutzer den Warteraum betritt" on={true} onChange={() => {}} />
        <Field label="Open-Sound">
          <div className="flex gap-2">
            <Select className="w-40"><option>Eigenes Audio</option></Select>
            <Input defaultValue="https://cdn.botforge.app/sound/open.mp3" className="flex-1" />
          </div>
        </Field>
        <Field label="Close-Sound">
          <div className="flex gap-2">
            <Select className="w-40"><option>Eigenes Audio</option></Select>
            <Input defaultValue="https://cdn.botforge.app/sound/close.mp3" className="flex-1" />
          </div>
        </Field>
      </Card>
    </div>
  );
}

function ProtectionModule() {
  const [active, setActive] = useState(true);
  const [tab, setTab] = useState("verify");
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div>
      <PageHeader title="Guild Protection" desc="Schütze deinen Server durch eine Verifizierung vor Raids u.ä." />

      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
        <button onClick={() => setTab("verify")} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${tab === "verify" ? "bg-indigo-500 text-white" : "text-gray-600"}`}>
          <Users className="w-4 h-4" /> Verifizierung
        </button>
        <button onClick={() => setTab("rules")} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${tab === "rules" ? "bg-indigo-500 text-white" : "text-gray-600"}`}>
          <Shield className="w-4 h-4" /> Protection Rules
        </button>
      </div>

      <ModuleBanner active={active} onToggle={() => setActive(!active)} />

      {tab === "verify" && (
        <Card title="Verifizierung">
          <ToggleRow label="Captcha aktivieren" desc="Erzwinge, dass der Nutzer ein Captcha lösen muss, bevor er auf den Server zugreifen kann" on={false} onChange={() => {}} />
          <Field label="Kanal" hint="Kanal, in dem die Verifizierungs-Nachricht gesendet wird">
            <Select><option>✅ | Verifizieren</option></Select>
          </Field>
          <ToggleRow label="Verifizierung prüfen" desc="Aktiviere, dass Teammitglieder neue Verifizierungen erst prüfen müssen" on={false} onChange={() => {}} />
          <ToggleRow label="Rollen verteilen" desc="Aktiviere, dass der Bot Rollen nach der Verifizierung verteilt" on={true} onChange={() => {}} />
          <ToggleRow label="Rollen entfernen" desc="Aktiviere, dass der Bot Rollen nach der Verifizierung entfernt" on={true} onChange={() => {}} />
          <div className="flex justify-between gap-2">
            <button onClick={() => setShowEmbed(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-200">
              <Edit2 className="w-4 h-4" /> Embed-Editor öffnen
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
              <Send className="w-4 h-4" /> Nachricht senden
            </button>
          </div>
        </Card>
      )}

      {tab === "rules" && (
        <>
          <Card title="Protection Rules">
            <ToggleRow label="Nachricht per DM" desc="Aktiviere, dass dem Nutzer eine Direkt-Nachricht bei einem Angriff gesendet wird" on={false} onChange={() => {}} />
            <Field label="Log-Kanal"><Select><option>Kanal auswählen...</option></Select></Field>
            <Field label="Mitglieder" hint="Mitglieder, die von allen Regeln ausgenommen sind"><Select><option>Mitglieder auswählen...</option></Select></Field>
          </Card>
          <Card title="Protection Rules">
            <button className="w-full p-6 border border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center"><Plus className="w-5 h-5" /></div>
            </button>
          </Card>
        </>
      )}

      <EmbedEditor open={showEmbed} onClose={() => setShowEmbed(false)} initialTitle="Server verification" initialDesc="You want to get started on this server? That's no problem! Simply verify yourself using the button below and you're ready to go." />
    </div>
  );
}

function GenericModule({ title, desc, deactivated = true }: any) {
  const [active, setActive] = useState(!deactivated);
  return (
    <div>
      <PageHeader title={title} desc={desc} />
      <ModuleBanner active={active} onToggle={() => setActive(!active)} />
      <Card title="Konfiguration">
        <div className="text-sm text-gray-500 italic text-center py-8">
          Aktiviere das Modul, um die Konfiguration zu sehen.
        </div>
      </Card>
    </div>
  );
}

// ============ MAIN DASHBOARD ============
export default function Dashboard() {
  const { theme } = useTheme();
  const [activeModule, setActiveModule] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLight = theme.mode === "light";
  const bgClass = isLight ? "bg-gray-100" : "bg-gray-900";
  const sideBarBg = isLight ? "bg-white border-gray-200" : "bg-gray-950 border-gray-800";
  const textColor = isLight ? "text-gray-900" : "text-gray-100";

  const menu = [
    { id: "overview", label: "Übersicht", icon: LayoutDashboard, special: true },
    { id: "plus", label: "BotForge Plus", icon: Crown, plus: true },
    { id: "welcome", label: "Willkommen", icon: Hand },
    { id: "support", label: "Support", icon: Headphones },
    { id: "ticket", label: "Ticket", icon: Ticket },
    { id: "moderation", label: "Moderation", icon: Gavel },
    { id: "voice", label: "Private Kanäle", icon: Volume2 },
    { id: "stats", label: "Server Statistiken", icon: BarChart3 },
    { id: "rewards", label: "Beteiligungs Belohnungen", icon: Award },
    { id: "team", label: "Teamverwaltung", icon: Users },
    { id: "club", label: "Club-Management", icon: Briefcase },
    { id: "news", label: "Neuigkeiten", icon: Megaphone },
    { id: "social", label: "Social-Media", icon: Hash },
    { id: "protection", label: "Guild Protection", icon: Shield },
    { id: "suggestions", label: "Vorschläge", icon: Lightbulb },
  ];

  return (
    <div className={`min-h-screen ${bgClass} ${textColor}`}>
      {/* HEADER */}
      <header className={`${isLight ? "bg-white border-gray-200" : "bg-gray-950 border-gray-800"} border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg ${isLight ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}>
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold">© Koblenz RP</div>
            <div className="text-xs text-gray-400">1427735791693725906</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">K</div>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className={`fixed lg:sticky top-[57px] left-0 z-20 w-72 ${sideBarBg} border-r h-[calc(100vh-57px)] overflow-y-auto transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="p-4 flex items-center gap-2 border-b border-gray-200/20">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg">🪐</span>
            </div>
            <span className={`font-bold text-lg ${isLight ? "text-gray-900" : "text-white"}`}>BotForge</span>
            <button onClick={() => setSidebarOpen(false)} className={`ml-auto p-1.5 rounded-lg lg:hidden ${isLight ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3">
            <button className={`w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-lg text-sm ${isLight ? "hover:bg-gray-100" : "hover:bg-gray-800"} font-semibold`}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>

            <div className={`flex items-center gap-3 px-3 py-2 mb-3 rounded-lg ${isLight ? "bg-gray-50" : "bg-gray-900"} cursor-pointer`}>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">K</div>
              <span className="text-sm font-medium flex-1">© Koblenz RP</span>
              <ChevronLeft className="w-4 h-4 rotate-[-90deg]" />
            </div>

            <div className="space-y-0.5">
              {menu.map(item => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;

                if (item.plus) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveModule(item.id); setSidebarOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-gradient-to-r from-amber-400/20 via-pink-400/20 to-purple-400/20 border border-amber-300/30 my-2"
                    >
                      <div className="text-left flex-1">
                        <div className={`font-bold ${isLight ? "text-gray-900" : "text-white"}`}>{item.label}</div>
                        <div className="text-[10px] text-gray-500">Hol dir ein Upgrade für deinen Server!</div>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveModule(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                        : `${isLight ? "text-gray-700 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800"}`
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`p-4 border-t ${isLight ? "border-gray-200" : "border-gray-800"} mt-4 space-y-2 text-xs`}>
            <a href="/legal" className={`block ${isLight ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>📄 Impressum</a>
            <a href="/privacy" className={`block ${isLight ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>🛡️ Datenschutzerklärung</a>
            <a href="https://discord.gg/botforge" className={`block ${isLight ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>💬 Support-Discord</a>
            <a href="/team" className={`block ${isLight ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>👥 Team-Dashboard</a>
            <div className={`flex items-center gap-2 pt-3 mt-2 border-t ${isLight ? "border-gray-200" : "border-gray-800"}`}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
              <span className="text-xs font-medium">Fufi</span>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* MAIN */}
        <main className="flex-1 p-4 lg:p-8 max-w-5xl">
          {activeModule === "overview" && <OverviewModule />}
          {activeModule === "welcome" && <WelcomeModule />}
          {activeModule === "support" && <SupportModule />}
          {activeModule === "protection" && <ProtectionModule />}
          {activeModule === "ticket" && <GenericModule title="Ticket" desc="Verwalte das Ticket-System mit Panels und Kategorien." />}
          {activeModule === "moderation" && <GenericModule title="Moderation" desc="Linked Moderation & Mod-Commands." />}
          {activeModule === "voice" && <GenericModule title="Private Kanäle" desc="Custom Voice: Join-to-Create temporäre Channels." />}
          {activeModule === "stats" && <GenericModule title="Server Statistiken" desc="Live-Stats als Voice-Channel-Namen." />}
          {activeModule === "rewards" && <GenericModule title="Beteiligungs Belohnungen" desc="Belohne Nutzer für die Verwendung deines Server-Tags oder Status-Textes." />}
          {activeModule === "team" && <GenericModule title="Teamverwaltung" desc="Verwalte dein Team auf professionelle Art." />}
          {activeModule === "club" && <GenericModule title="Club-Management" desc="Automatische Club-Registrierung." />}
          {activeModule === "news" && <GenericModule title="Neuigkeiten" desc="Halte deine Nutzer mit Ankündigungen auf dem Laufenden." />}
          {activeModule === "social" && <GenericModule title="Social-Media" desc="Twitch & YouTube Notifications." />}
          {activeModule === "suggestions" && <GenericModule title="Vorschläge" desc="Vorschlagssystem mit Voting." />}
          {activeModule === "plus" && (
            <div>
              <PageHeader title="BotForge Plus" desc="Hol dir ein Upgrade für deinen Server!" />
              <div className="bg-gradient-to-br from-amber-100 via-pink-100 to-purple-100 p-8 rounded-2xl border border-amber-300/50">
                <Crown className="w-12 h-12 text-amber-500 mb-4" />
                <h2 className="text-2xl font-black mb-2">Werde Plus-Member</h2>
                <p className="text-gray-700 mb-4">Eigener Bot mit deinem Namen & Avatar, kein BotForge-Branding, Premium-Support.</p>
                <a href="/premium" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-bold">
                  Nur 4,99 € / Monat <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
