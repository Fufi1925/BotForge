# 🤖 BotForge — KI-Reproduktions-Prompt v3.0

> Dieser Prompt erzeugt **1:1 das gleiche Ergebnis** wie das aktuelle BotForge-Projekt.
> Kopiere den kompletten Inhalt zwischen den Trennlinien in eine KI (Claude, GPT, Gemini)
> und sie wird das exakt gleiche Projekt erstellen.

---

## 🎯 PROMPT START

---

Baue mir ein vollständiges **BotForge** Projekt. Es ist ein moderner Discord-Bot mit Web-Dashboard,
das auf **EINEM Railway-Service** läuft. Niemals localhost. Niemals Vercel. Niemals getrennte Services.

### 👤 Über mich
- **Name:** Fufi
- **Discord ID:** `1303627964734246944` (Owner mit komplettem Bypass)
- **Rolle:** Einziger Entwickler, einziger Hoster
- BotForge ist **kein Open Source** — ich hoste, andere nutzen
- Meine ID hat **immer** vollen Zugriff auf alle Befehle, ohne dass das jemand erfährt

### 🤝 Partner (genau einer)
- **Koblenz RP**
- 523 Members
- Icon: 🏙️
- Verifiziert
- Beschreibung: "Die größte deutsche Roleplay-Community aus Koblenz"
- Discord-Link: `https://discord.gg/koblenzrp`

### 🔗 Offizielle Schwester-Projekte
- **ModForge** ist offiziell Teil von BotForge
- URL: `https://mod-forge.up.railway.app/`
- Muss auf der Home Page und im Footer prominent verlinkt werden

---

## 📦 PROJEKTSTRUKTUR

```
botforge/
├── package.json              # Vite + React + TypeScript + Tailwind 4
├── vite.config.ts            # Vite mit vite-plugin-singlefile
├── tsconfig.json             # TypeScript strict
├── index.html                # SPA Entry
├── tailwind.config            # Wird automatisch erkannt
├── nixpacks.toml             # Railway Build-Steuerung
├── railway.json              # Start Command + Healthcheck
├── Procfile                  # Backup für Railway: web: python bot/bot.py
├── requirements.txt          # Python Dependencies
├── config.json               # Globale Konfiguration (Stats, Module, Partner)
├── system_config.json        # Page Visibility + Demo Settings
├── custom_emojis.json        # Custom Emoji Overrides
├── .env.example              # Beispiel für alle Secrets
├── .gitignore
├── README.md
├── HOSTING.md                # Railway Anleitung kurz
├── RAILWAY_QUICKSTART.md     # Schritt-für-Schritt
├── RAILWAY_SETUP.md          # Detailliert
├── SETUP.md                  # Lokales Setup
├── EMOJIS.md                 # Emoji-Liste
├── IDEAS.md                  # 100+ Feature-Ideen
├── prompt.md                 # Dieser Prompt
│
├── src/                      # Frontend React
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css             # 500+ Zeilen Animationen
│   ├── components/
│   │   ├── Navbar.tsx        # Dropdown-Navigation, 5 Gruppen
│   │   ├── Footer.tsx        # Multi-Column Footer
│   │   ├── AnimatedBackground.tsx  # Mesh-Gradient + Grid Overlay
│   │   ├── PageGate.tsx      # Coming Soon Wrapper
│   │   └── ComingSoon.tsx    # Standalone Coming Soon
│   ├── hooks/
│   │   ├── useLiveStats.ts   # Fetch /api/stats
│   │   └── usePageVisibility.ts  # Fetch /api/system page_visibility
│   ├── utils/
│   │   └── cn.ts             # tailwind-merge + clsx
│   └── pages/                # 50+ Seiten, alle mit PAGE_VISIBLE Flag
│       ├── Home.tsx          # Komplett neu mit massiv Animationen
│       ├── Dashboard.tsx     # Server-Picker + 14 Tabs
│       ├── DemoDashboard.tsx # Versteckte Demo
│       ├── TestDashboardDemo.tsx  # Public Test-Demo
│       ├── Status.tsx
│       ├── Commands.tsx
│       ├── Partners.tsx
│       ├── Team.tsx
│       ├── Docs.tsx
│       ├── DocsSetup.tsx
│       ├── DocsModeration.tsx
│       ├── DocsTickets.tsx
│       ├── DocsMusic.tsx
│       ├── DocsAutoMod.tsx
│       ├── Features.tsx
│       ├── Pricing.tsx
│       ├── PremiumDetail.tsx
│       ├── Trust.tsx
│       ├── SecurityPortal.tsx
│       ├── Branding.tsx
│       ├── EmojiPack.tsx
│       ├── Badges.tsx
│       ├── Analytics.tsx
│       ├── GlobalLeaderboard.tsx
│       ├── GrowthSimulator.tsx
│       ├── GuildPartners.tsx
│       ├── Affiliate.tsx
│       ├── Maintenance.tsx
│       ├── IncidentHistory.tsx
│       ├── ApiDocs.tsx
│       ├── Changelog.tsx
│       ├── Roadmap.tsx
│       ├── Support.tsx
│       ├── Contact.tsx
│       ├── Suggest.tsx
│       ├── FaqPage.tsx
│       ├── CommunityHub.tsx
│       ├── Comparison.tsx
│       ├── Showcase.tsx
│       ├── Testimonials.tsx
│       ├── Tutorials.tsx
│       ├── ServerTemplates.tsx
│       ├── Migrate.tsx
│       ├── Integrations.tsx
│       ├── Economy.tsx
│       ├── Events.tsx
│       ├── AiShowcase.tsx
│       ├── Blog.tsx
│       ├── Widgets.tsx
│       ├── Downloads.tsx
│       ├── OpenSource.tsx
│       ├── Jobs.tsx
│       ├── Legal.tsx
│       ├── Uptime.tsx
│       ├── Terms.tsx
│       └── Privacy.tsx
│
└── bot/                      # Python Discord Bot + Flask Server
    ├── bot.py                # Hauptbot mit Owner-Bypass
    ├── dashboard.py          # Flask Server (API + Static SPA)
    ├── config.py             # Secrets aus Environment
    ├── runtime.txt           # python-3.11
    ├── Procfile
    ├── custom_emojis.json
    └── cogs/
        ├── __init__.py
        ├── _helpers.py       # Embed Builder System
        └── core.py           # ALLE Commands (kein anderer Cog!)
```

---

## 🔧 TECH STACK (genau diese Versionen)

### Frontend (`package.json`)
```json
{
  "dependencies": {
    "clsx": "2.1.1",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.16.0",
    "react": "19.2.6",
    "react-dom": "19.2.6",
    "react-router-dom": "^7.15.0",
    "tailwind-merge": "3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.17",
    "@types/node": "22.19.17",
    "@types/react": "19.2.7",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "5.1.1",
    "tailwindcss": "4.1.17",
    "typescript": "5.9.3",
    "vite": "7.3.2",
    "vite-plugin-singlefile": "2.3.0"
  }
}
```

### Backend (`requirements.txt`)
```
discord.py>=2.3.2
python-dotenv>=1.0.0
motor>=3.3.2
pymongo>=4.6.0
flask>=3.0.0
requests>=2.31.0
aiohttp>=3.9.0
Pillow>=10.0.0
wavelink>=3.4.0
```

---

## 🚂 RAILWAY DEPLOYMENT (kritisch!)

### Ablauf für den User
1. railway.app öffnen
2. Login mit GitHub
3. New Project → Deploy from GitHub Repo
4. Repo wählen
5. Variables eintragen
6. Generate Domain
7. **Fertig** — mehr nicht

### `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["nodejs_20", "python311", "python311Packages.pip"]

[phases.install]
cmds = [
  "npm install",
  "python -m pip install --upgrade pip",
  "pip install -r requirements.txt"
]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "python bot/bot.py"
```

### `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "python bot/bot.py",
    "restartPolicyType": "ON_FAILURE",
    "healthcheckPath": "/health"
  }
}
```

### `Procfile` (Root)
```
web: python bot/bot.py
```

### Environment Variables
```bash
DISCORD_TOKEN=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_PUBLIC_KEY=...
OWNER_ID=1303627964734246944
MONGO_URI=mongodb+srv://...
SESSION_SECRET=long_random_string
PREFIX=!
LAVALINK_HOST=optional
LAVALINK_PORT=2333
LAVALINK_PASSWORD=optional
```

`REDIRECT_URI` wird automatisch aus `RAILWAY_PUBLIC_DOMAIN` gebaut, sodass keine manuelle Konfiguration nötig ist.

---

## 🤖 BOT-CORE — `bot/bot.py`

### Klasse `BotForge(commands.Bot)`
- **Intents:** alle (Message Content, Members, Presences)
- **Prefix:** dynamisch per Callable, holt Server-Prefix aus Config
- **case_insensitive:** True (`!Ban` und `!ban` funktionieren beide)
- **help_command:** None (eigener Help-Befehl im Core-Cog)

### `setup_hook()` macht
1. **Owner-Bypass-Check:** registriert global, sodass Owner alle Commands nutzen kann
2. **MongoDB:** verbindet via `motor` mit `MONGO_URI`
3. **Cog-Loading:** lädt **NUR** `cogs.core` (alte Cogs gibt es nicht mehr)
4. **Slash-Sync:**
   - Globaler Sync via `tree.sync()`
   - Pro-Guild Sync via `tree.copy_global_to(guild)` + `tree.sync(guild)` (wichtig: ohne diesen Schritt brauchen Slash-Commands bis zu 1 Stunde)
5. **Status-Rotation:** alle 10 Sekunden 6 verschiedene Status

### `on_message()` (KRITISCH für Prefix Fix!)
```python
async def on_message(self, message):
    if message.author.bot:
        return
    if not message.guild:
        await self.process_commands(message)
        return

    cfg = await self.get_guild_config(message.guild.id)
    prefix = cfg.get("prefix") or Config.PREFIX or "!"
    stripped = message.content.strip()
    if not stripped:
        return

    # 1. Echter Prefix oder Mention
    mention_prefixes = (f"<@{self.user.id}>", f"<@!{self.user.id}>")
    if stripped.startswith(prefix) or stripped.startswith(mention_prefixes):
        await self.process_commands(message)
        return

    # 2. No-Prefix Modus aus Config
    no_prefix = cfg.get("no_prefix", {}) or {}
    allowed = False
    if no_prefix.get("enabled"):
        allowed_users = {int(u) for u in no_prefix.get("users", []) if str(u).isdigit()}
        allowed_roles = {int(r) for r in no_prefix.get("roles", []) if str(r).isdigit()}
        allowed = (
            no_prefix.get("allow_everyone", False)
            or message.author.id in allowed_users
            or any(r.id in allowed_roles for r in message.author.roles)
        )

    # Owner immer erlaubt
    if message.author.id == int(Config.OWNER_ID or 0):
        allowed = True

    if not allowed:
        return

    # No-Prefix Command erkannt → Prefix temporär voranstellen
    first = stripped.split(maxsplit=1)[0].lower()
    command_names = {c.name.lower() for c in self.commands}
    aliases = {a.lower() for c in self.commands for a in getattr(c, "aliases", [])}
    if first not in command_names and first not in aliases:
        return

    original = message.content
    try:
        message.content = f"{prefix}{original}"
        await self.process_commands(message)
    finally:
        message.content = original
```

### `on_command_error()` Owner-Bypass
```python
if ctx.author.id == int(Config.OWNER_ID or 0):
    if isinstance(error, (commands.MissingPermissions, commands.MissingRole,
                          commands.NotOwner, commands.BotMissingPermissions,
                          commands.CheckFailure)):
        try:
            ctx.command.reset_cooldown(ctx)
            ctx.owner_bypass = True
            await ctx.reinvoke()  # Umgeht alle Checks
        except Exception:
            pass
        return
```

### `get_guild_config()` Default-Struktur
```python
{
    "_id": guild_id,
    "prefix": "!",
    "language": "de",
    "no_prefix": {
        "enabled": True,
        "users": [Config.OWNER_ID] if Config.OWNER_ID else [],
        "roles": [],
        "allow_everyone": False
    },
    "welcome": {"enabled": False, "channel": None, "message": "Willkommen {user}!"},
    "leave": {"enabled": False, "channel": None, "message": "{user} hat uns verlassen."},
    "automod": {"enabled": False, "filters": {}, "actions": {}},
    "tickets": {"enabled": False, "category": None, "transcript_channel": None},
    "logging": {"enabled": True, "channel": None, "events": {}},
    "levels": {"enabled": False, "xp_per_msg": 15, "cooldown": 60},
    "music": {"enabled": True, "dj_role": None, "24_7": False},
    "mod_dm": {"warn": True, "timeout": True, "kick": True, "ban": True, "automod": True}
}
```

---

## 📦 EMBED-SYSTEM — `bot/cogs/_helpers.py`

### Klasse `BF` (Brand Constants)
```python
PRIMARY = 0x7C3AED       # Violett
SECONDARY = 0x06B6D4     # Cyan
ACCENT = 0xEC4899        # Pink
SUCCESS = 0x10B981
ERROR = 0xEF4444
WARNING = 0xF59E0B
INFO = 0x3B82F6
NEUTRAL = 0x6B7280
MUSIC = 0xA855F7
TICKET = 0xF59E0B
LEVEL = 0xEAB308
MOD = 0xDC2626
PREMIUM = 0xFBBF24
AUTOMOD = 0xEF4444
WELCOME = 0x10B981
LOG = 0x6B7280
ECONOMY = 0xF59E0B
GIVEAWAY = 0xEC4899

FOOTER = "BotForge · botforge.app"
DEV = "by Fufi"
```

### Klasse `E` (Emoji Constants)
Alle Emojis in einer Klasse:
- `OK = "✅"`, `FAIL = "❌"`, `WARN = "⚠️"`, `INFO = "ℹ️"`, `LOAD = "⏳"`
- `SHIELD = "🛡️"`, `TICKET = "🎫"`, `MUSIC = "🎵"`, `LEVEL = "📊"`, `BOT = "🤖"`
- `BAN = "🔨"`, `KICK = "👢"`, `TIMEOUT = "⏱️"`, `LOCK = "🔒"`, `UNLOCK = "🔓"`
- `STAR = "⭐"`, `SPARKLE = "✨"`, `FIRE = "🔥"`, `BOLT = "⚡"`, `ROCKET = "🚀"`

### `_custom_emoji(name, fallback)`
Liest aus `bot/custom_emojis.json` Custom-Emoji-Overrides. Wenn Server eigene Emojis hat:
```json
{
  "ok": "<:bf_ok:123456>",
  "shield": "<:bf_shield:123456>"
}
```

### `Embed.base()` (Builder Pattern)
Erstellt Standard-Embed mit:
- Footer immer `BotForge · botforge.app` mit Bot-Avatar
- Optional: title, description, color, thumbnail, image, author
- Timestamp standardmäßig an

### Vordefinierte Embed-Methoden
- `Embed.success(bot, title, desc)` → grün, ✅
- `Embed.error(bot, title, desc)` → rot, ❌
- `Embed.warning(bot, title, desc)` → gelb, ⚠️
- `Embed.info(bot, title, desc)` → blau, ℹ️
- `Embed.loading(bot, title)` → primary, ⏳
- `Embed.mod_action(bot, action, target, mod, reason, duration, case_id, lang)` → Moderations-Embed im Stil des User-Screenshots
- `Embed.dm_action(bot, action, guild, mod, reason, duration, lang)` → DM an betroffenen User
- `Embed.welcome(bot, member, guild)` → Welcome-Embed
- `Embed.music_now_playing(bot, track, requester)` → Now-Playing
- `Embed.level_up(bot, member, level)` → Level-Up
- `Embed.stats(bot, title, items_dict, color)` → Stats-Embed mit Codeblock-Werten

### Internationalisierung (`I18N`)
Dictionary mit `de` und `en`. Wird über `cfg["language"]` ausgewählt.
```python
"de": {
  "executor": "Ausgeführt von",
  "moderator": "Moderator",
  "reason": "Grund",
  "duration": "Dauer",
  "remaining": "Verbleibende Zeit",
  "case": "Fall",
  "server": "Server",
  "appeal": "Einspruch einlegen",
  "appeal_text": "Wenn du denkst...",
  "no_reason": "Kein Grund angegeben",
  "actions": {
    "Ban": "Du wurdest in {server} gebannt.",
    "Kick": "Du wurdest aus {server} gekickt.",
    "Timeout": "Du wurdest in {server} getimeoutet.",
    ...
  }
}
```

---

## ⚙️ COMMANDS — `bot/cogs/core.py`

**WICHTIG:** Alle Commands sind `commands.hybrid_command`, also Slash + Prefix + No-Prefix.
Es gibt **keine anderen Cogs**.

### Utility
- `help` (Aliases: `h`) — Zeigt Übersicht aller Commands mit Modulen
- `ping` — Gateway-Latenz mit Status-Bewertung
- `status` — Server, User, Ping, Uptime
- `setup` — Verweist aufs Dashboard
- `settings` — Zeigt aktuelle Server-Settings

### Moderation (mit DM an User + Case-ID)
- `ban <member> [reason]`
- `kick <member> [reason]`
- `timeout <member> [duration=10m] [reason]` (Aliases: `to`)
- `warn <member> [reason]` — speichert in MongoDB
- `clear [amount=10]` — max. 100 Nachrichten
- `lock` — sperrt Channel für `@everyone`
- `unlock` — entsperrt Channel

### Konfiguration
- `automod [enabled]` — Toggle AutoMod
- `welcome [enabled]` — Toggle Welcome
- `logs [channel]` — Setzt Log-Channel
- `embed <title> <text>` — Sendet Custom-Embed

### Tickets (Hybrid Group)
- `ticket panel` — sendet Panel
- `ticket close` — schließt Channel nach 5s
- `ticket stats` — zeigt Statistiken

### Music (Stubs, falls Lavalink nicht verbunden)
- `play <query>` (Aliases: `p`)
- `pause`
- `resume`
- `skip` (Aliases: `s`)
- `stop`
- `volume <0-150>` (Aliases: `vol`)

### Leveling
- `rank [member]` — XP, Level, Rank
- `leaderboard` (Aliases: `lb`) — Top User

### Helper-Methoden in Core
```python
async def cfg(self, guild_id) -> dict:
    return await self.bot.get_guild_config(guild_id)

async def _case(self, guild_id) -> int:
    # Atomarer Counter via MongoDB
    doc = await self.bot.db.cases.find_one_and_update(
        {"_id": guild_id},
        {"$inc": {"counter": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    return doc.get("counter", 1)

async def _dm_action(self, member, action, mod, reason, duration=None):
    # Sendet DM an User mit Embed.dm_action()
```

---

## 🌐 FLASK SERVER — `bot/dashboard.py`

### Aufgaben
1. Liefert React SPA aus `dist/`
2. Bietet REST API unter `/api/*`
3. OAuth2 mit Discord
4. Läuft im Hintergrund-Thread parallel zum Bot

### Routes

| Route | Methode | Funktion |
|---|---|---|
| `/` | GET | SPA Index |
| `/<path>` | GET | SPA oder statische Datei |
| `/static/<path>` | GET | Vite Assets |
| `/favicon.ico` | GET | Favicon |
| `/api/login` | GET | Redirect zu Discord OAuth |
| `/api/callback` | GET | OAuth Callback, speichert Session |
| `/api/logout` | GET | Session löschen |
| `/api/me` | GET | Eingeloggter User (auth required) |
| `/api/guilds` | GET | User-Guilds mit Manage-Permission und Bot drauf |
| `/api/guilds/<id>/config` | GET | Lädt Server-Config aus MongoDB |
| `/api/guilds/<id>/config` | POST | Speichert Server-Config |
| `/api/stats` | GET | Live Bot-Stats oder Fake aus `config.json` |
| `/api/system` | GET | Komplette `config.json` |
| `/health` | GET | Healthcheck für Railway |

### `serve_spa()` Logik
```python
def serve_spa(**kwargs):
    path = kwargs.get("path", "")
    index_file = os.path.join(DIST_DIR, "index.html")
    if not os.path.isfile(index_file):
        return ("<h1>BotForge build missing</h1><p>Railway muss npm run build ausführen.</p>", 503)
    if path and not path.startswith("api") and not path.startswith("health"):
        full = os.path.join(DIST_DIR, path)
        if os.path.isfile(full):
            return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, "index.html")
```

### `/api/stats` Live oder Fake
```python
use_live = cfg.get("stats", {}).get("use_live", True)
if use_live and bot and bot.is_ready():
    return real_data
return fake_data_from_config
```

---

## ⚙️ KONFIGURATION — `config.json`

```json
{
  "bot": {
    "name": "BotForge",
    "version": "3.0.0",
    "prefix": "!",
    "developer": "Fufi",
    "owner_id": "1303627964734246944"
  },
  "stats": {
    "use_live": true,
    "fake": {
      "guilds": 1,
      "users": 523,
      "channels": 12,
      "commands_total": 0,
      "uptime_days": 0
    }
  },
  "dashboard": {
    "enable_demo_login": true,
    "maintenance_mode": false,
    "theme": "dark",
    "default_language": "de"
  },
  "no_prefix": {
    "enabled": true,
    "users": ["1303627964734246944"],
    "roles": [],
    "allow_everyone": false,
    "commands": ["help", "play", "rank", "ping", "status", "ticket", "warn", "timeout", "ban", "kick", "clear", "lock", "unlock"]
  },
  "official_projects": {
    "modforge": {
      "name": "ModForge",
      "url": "https://mod-forge.up.railway.app/",
      "description": "ModForge ist offiziell Teil von BotForge."
    }
  },
  "demo_dashboard": {
    "enabled": false,
    "secret_path": "demo-bf-2025x"
  },
  "modules": {
    "tickets": true, "automod": true, "music": true, "welcome": true,
    "levels": true, "logging": true, "moderation": true, "custom_commands": true,
    "giveaways": true, "reaction_roles": true, "ai_features": false,
    "economy": true, "integrations": true
  },
  "partners": {
    "enabled": true,
    "featured": [
      {
        "name": "Koblenz RP",
        "members": 523,
        "icon": "🏙️",
        "desc": "Die größte deutsche Roleplay-Community aus Koblenz",
        "link": "https://discord.gg/koblenzrp",
        "verified": true
      }
    ]
  },
  "branding": {
    "primary_color": "#7C3AED",
    "secondary_color": "#06B6D4",
    "logo_url": "/logo.png"
  },
  "page_visibility": {
    "home": true,
    "dashboard": true,
    "commands": true,
    "..." : "alle Pages explizit auflisten"
  }
}
```

---

## 🎨 FRONTEND — `src/index.css` (Animationen)

**KRITISCH:** Über 500 Zeilen CSS mit folgenden Klassen:

### Glass System
- `.glass` — Standard Glass-Card (rgba, blur 18px, border)
- `.glass-strong` — Stärkere Variante (rgba, blur 24px)
- `.gradient-border` — Animierter Verlaufs-Border

### Glow
- `.glow-cyan`, `.glow-violet`, `.glow-pink`, `.glow-green`, `.glow-amber`
- `.glow-breathe` — Pulsierender Glow

### Animations Mega Set (alle als Keyframes + Klassen)
```css
@keyframes float-y, float-x, spin-slow, wiggle, shimmer-x, pop-in,
fade-slide-up, fade-slide-down, fade-slide-left, fade-slide-right,
glow-breathe, border-rotate, ticker, glitch, typewriter, pulse;
```

### Klassen
- `.float-y`, `.float-x` — Schwebt vertikal/horizontal
- `.spin-slow` — Rotiert 30s
- `.wiggle` — Wackelt
- `.pop-in` — Skaliert von 0.85 auf 1
- `.in-up`, `.in-down`, `.in-left`, `.in-right` — Slide-In
- `.glow-breathe` — Pulse-Glow
- `.del-1` bis `.del-6` — Animation Delays
- `.hover-pop` — Hebt sich auf Hover mit Schatten
- `.hover-lift`, `.hover-glow`, `.text-glow-hover`
- `.card-shine` — Lichtreflex-Effekt
- `.ticker-track` — Marquee-Animation
- `.num-glow` — Text-Shadow für Statistik-Zahlen
- `.stagger > *` — Gestaffelte Children-Animation
- `.pulse-dot` — Live-Indikator

### Components
- `.switch` und `.switch.on` — Toggle-Switch
- `.input` — Form-Input mit Focus-Effekt
- `.btn-primary` — Gradient-Button
- `.btn-ghost` — Outline-Button
- `.text-gradient` — Verlaufs-Text

---

## 🏠 HOME PAGE — `src/pages/Home.tsx`

### Struktur (von oben nach unten)
1. **Hero**
   - Live-Badge mit Pulse-Dot, zeigt Server + Members
   - H1 mit `text-gradient` und `float-y`
   - 3 Buttons: "Bot einladen", "Dashboard öffnen", "Demo testen"
   - Trust-Badges in Stagger-Animation
   - Mock Dashboard-Preview mit Browser-Fenster, 3 Stats und Bar-Chart

2. **Stats Grid** — 4 Counter-Cards mit `useCounter` Hook
   - Server, Members, Commands, Uptime
   - Jede Card mit Glow-Hintergrund und `card-shine`

3. **ModForge Banner**
   - Großer Card-Link auf `https://mod-forge.up.railway.app/`
   - "Offiziell Teil von BotForge"

4. **Partner Section**
   - Nur Koblenz RP
   - Verifiziert-Badge, Member-Zahl, Beschreibung

5. **Features Grid** — 8 Cards (AutoMod, Tickets, Music, Welcome, Levels, Logging, Custom CMDs, Premium)

6. **How It Works** — 3 Schritte (Einladen, Konfigurieren, Genießen)

7. **Demo Banner** — Gradient-Border, Link zu `/demo-dashboard-test`

8. **Ticker** — Marquee mit Stichworten

9. **CTA Footer** — Glow-Breathe Card mit "Bereit?" und 2 Buttons

### `useCounter` Hook
```tsx
function useCounter(target, ms = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}
```

---

## 📄 PAGE-VISIBLE FLAG (in jeder Page-Datei)

Jede Page-Datei hat oben:
```tsx
const PAGE_VISIBLE = true;
const LOCAL_COMING_SOON = (
  <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center">
    <div className="glass-strong p-12 rounded-3xl text-center glow-breathe">
      <h1 className="text-5xl font-black text-gradient mb-3">Coming Soon</h1>
      <p className="text-gray-400">Diese Seite wird gerade von Fufi gebaut.</p>
    </div>
  </div>
);

export default function PageName() {
  if (!PAGE_VISIBLE) return LOCAL_COMING_SOON;
  // ...rest der Page
}
```

Wird `PAGE_VISIBLE = false` gesetzt → Coming Soon erscheint.

---

## 🧭 NAVBAR — `src/components/Navbar.tsx`

### 5 Dropdown-Gruppen
1. **Produkt** (Features, Premium, Emoji Pack, Commands, Downloads)
2. **Community** (Partner, Team, Gilden, Leaderboard, Vorschläge, Affiliate)
3. **Docs** (Dokumentation, Setup, AutoMod, Tickets, Music, API Docs, FAQ)
4. **Status** (Live Status, Analytics, Incidents, Wartung, Sicherheit)
5. **Mehr** (Dashboard, Demo, Wachstum, Branding, Kontakt, Changelog, Roadmap)

### Logo
- Bot-Icon mit Gradient-Background
- Pulse-Dot (grün) als Online-Anzeige
- Versions-Tag

### Hover-Verhalten
- Dropdown zeigt Items mit Icon + Name + Beschreibung
- Mobile Menü mit Stagger-Animation

---

## 🧪 TEST DASHBOARD DEMO — `src/pages/TestDashboardDemo.tsx`

Eine **öffentliche** Demo unter `/demo-dashboard-test`:
- Sticky Sidebar mit Server "Koblenz RP"
- 5 Sidebar-Tabs: Übersicht, AutoMod, Tickets, Music, Commands
- Header mit "Demo Configuration" und Speichern-Button
- 4 Stat-Cards mit Icons
- 3 Toggle-Cards (AutoMod, Tickets, Music)
- "Demo gespeichert"-Banner nach Klick
- Keine echten Daten, kein Login nötig

---

## 🎯 VERSTECKTE DEMO — `src/pages/DemoDashboard.tsx`

Eine **versteckte** Demo unter geheimer URL:
- Path wird aus `config.json` → `demo_dashboard.secret_path` geladen
- Nur erreichbar wenn `demo_dashboard.enabled: true`
- Komplettes Dashboard mit allen 14 Tabs

---

## 🔐 DASHBOARD — `src/pages/Dashboard.tsx`

### Login Flow
1. User klickt "Mit Discord anmelden" → `/api/login`
2. Redirect zu Discord OAuth
3. Callback zu `/api/callback` setzt Session
4. Server-Picker zeigt User-Guilds mit Manage-Permission

### Server-Picker
- Karten mit Server-Avatar (Gradient + Erstbuchstabe)
- Member-Count
- "Bot online"-Indikator
- Suche

### 14 Tabs (Sidebar Navigation)
1. **Übersicht** — Stats, Top Commands, Recent Actions
2. **AutoMod** — 8 Filter, Aktionen, Whitelist
3. **Welcome** — Channel, Nachricht, Banner-Upload, Auto-Role
4. **Tickets** — Panel-Builder, Kategorien, Transcript-Channel
5. **Music** — DJ-Rolle, 24/7 Mode, Volume-Limit
6. **Logging** — Channel, 25+ Events
7. **Levels** — XP, Cooldown, Rewards, Leaderboard
8. **Reaction Roles** — Dropdown-Builder
9. **Custom Commands** — Liste + Editor
10. **Embed Builder** — Visual Editor mit Preview
11. **Server-Settings** — Prefix, Sprache, No-Prefix Config
12. **E-Mail Notifications** — Owner E-Mail, Webhooks
13. **Premium** — Status, Features, Branding
14. **Audit Log** — Änderungen am Dashboard

---

## 🎨 ANIMATED BACKGROUND — `src/components/AnimatedBackground.tsx`

- `.bg-mesh` — Zwei pulsierende Gradient-Blobs (violett + cyan)
- Drittes Pink-Blob im Zentrum
- `.bg-grid` — Subtle Grid-Overlay mit Radial-Mask
- Float-Animation 22s

---

## ✅ ANFORDERUNGEN BEIM BAUEN

1. **Alle Page-Dateien** müssen `PAGE_VISIBLE = true` Flag oben haben
2. **Alle Commands** müssen Hybrid sein (Slash + Prefix + No-Prefix)
3. **Owner-ID `1303627964734246944`** hat immer kompletten Zugriff
4. **Embeds** müssen alle den Footer `BotForge · botforge.app` haben
5. **Custom Emojis** müssen über `bot/custom_emojis.json` überschreibbar sein
6. **Sprache** wird aus Server-Config geladen (de Standard)
7. **Partner** ist nur Koblenz RP, nirgendwo andere Server erfinden
8. **ModForge** muss mit `https://mod-forge.up.railway.app/` verlinkt sein
9. **Build muss durchlaufen** — `npm run build` erzeugt `dist/index.html`
10. **Flask serviert Website + API** parallel zum Bot in EINEM Prozess

---

## 🎬 ABLAUF DER KI

1. Erstelle alle Dateien gemäß Struktur
2. Installiere npm Packages mit den exakten Versionen
3. Baue Frontend mit Vite
4. Verifiziere Build-Erfolg
5. Stelle sicher dass Bot-Code lauffähig ist
6. README mit Setup-Anleitung

---

## 🧪 VERIFIKATION

Am Ende muss gelten:
- `npm run build` läuft ohne Fehler durch
- `dist/index.html` existiert
- `python bot/bot.py` startet ohne Crashes (lokal mit Test-Token)
- Slash Commands `/help`, `/ping`, `/status` funktionieren
- Prefix Commands `!help`, `!ping`, `!status` funktionieren
- No-Prefix `help`, `ping` funktionieren wenn User in der Allowlist ist
- Owner mit ID `1303627964734246944` kann alle Mod-Commands ausführen, ohne dass eine Permission gesetzt sein muss
- Website unter `/` lädt
- Dashboard unter `/dashboard` zeigt Login
- Test-Demo unter `/demo-dashboard-test` zeigt interaktives Dashboard

---

## 💡 ERWEITERUNGEN

- Falls KI Zeit hat: 50+ Page-Dateien mit jeweils eigenem Inhalt erstellen
- Footer mit 4 Spalten (Produkt, Community, Docs, Legal)
- Mobile-responsive überall
- Dark Theme komplett
- TypeScript strict
- Kein Open Source (proprietär)

---

## 🚨 NIEMALS

- Niemals localhost als Hosting empfehlen
- Niemals Vercel oder andere Frontend-Hoster vorschlagen
- Niemals andere Partner als Koblenz RP nennen
- Niemals andere Entwickler als Fufi nennen
- Niemals den Owner-Bypass öffentlich erwähnen
- Niemals Open Source Lizenz einbauen
- Niemals separate Services für Bot und Website

---

## 🎁 BONUS: 100 Feature-Ideen

In `IDEAS.md` 100+ Feature-Ideen gruppiert:
- Tickets, AutoMod, Moderation, Music, Welcome, Customization
- Logging/Analytics, Giveaways, AI, Integrations
- Developer-Features, Security, Monetization

---

## 📞 PROMPT ENDE

Wenn du diesen Prompt vollständig umsetzt, hast du **1:1 das gleiche BotForge** wie das aktuelle Repo:
- Bot mit allen Commands
- Website mit 50+ animierten Pages
- Dashboard mit echtem OAuth
- Test-Demo mit Live-Toggles
- Railway One-Service Deployment
- Prefix + Slash + No-Prefix funktionieren
- Owner-Bypass für Fufi
- Koblenz RP als einziger Partner
- ModForge als offizielles Schwester-Projekt

**Made by Fufi · BotForge v3.0**
