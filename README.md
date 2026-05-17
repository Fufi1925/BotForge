# 🤖 BotForge

**Der futuristische All-in-One Discord-Bot mit modernem Web-Dashboard.**

> ⚠️ **Wichtig:** BotForge wird **zentral vom Entwickler gehostet**.  
> Du als Server-Owner musst **nichts installieren oder hosten**.  
> Einfach den Bot über den Invite-Link zu deinem Server hinzufügen und per Dashboard konfigurieren.  
> Das Hosting auf Railway.com übernimmt ausschließlich der Bot-Entwickler.

BotForge ist ein **Public-Bot**, gebaut für Hunderte von Servern. Komplett über das Dashboard konfigurierbar, mit Live-Stats, AutoMod, Tickets mit Discord-Dropdown, Music, Logging und 40+ weiteren Modulen. 

Die Web-Plattform umfasst mittlerweile stolze **28 eigenständige, futuristisch animierte Seiten** und bietet Administratoren volle Customization-Freiheit über **E-Mails, Discord-Bots und Kontaktdaten**.

---

## ✨ Features

| Modul | Beschreibung |
|-------|-------------|
| 🛡️ **AutoMod 2.0** | Beleidigungen, Spam, Links, Invites, Caps, Mass-Mentions, NSFW — mit automatischer DM |
| 🎫 **Tickets** | **Echtes Discord-Dropdown-Menü** mit bis zu 25 Kategorien, Transcripts, Team-Claim |
| 🎵 **Music** | YouTube, Spotify, SoundCloud über Lavalink · 24/7 Mode · Filters |
| 🎉 **Welcome/Leave** | Animiertes Banner-Card (Pillow), Auto-Role, DM |
| 📊 **Leveling** | XP, Rank-Card (Pillow), Leaderboard, Rollen-Rewards |
| 📝 **Advanced Logging** | 25+ Events — auch Bot-Aktionen — pro-Channel Routing |
| 🔨 **Moderation** | ban, kick, timeout, warn — mit automatischen DMs (Grund + Dauer + Moderator) |
| 🎨 **Embed Builder** | Drag & Drop, Banner-Upload, Live-Preview (Footer fix) |
| 🎭 **Custom Commands** | Eigene `/` Commands mit Variablen (`{user}`, `{server}`, ...) |
| 😀 **Custom Emojis** | Upload direkt über Dashboard oder `/emoji` |
| 🎁 **Giveaways** | Button-basierte Verlosungen mit Reroll |
| ❤️ **Reaction Roles** | Dropdown-Menüs für Self-Assign-Rollen |

---

## 🚀 So nutzt du BotForge (als Server-Owner)

### 1️⃣ Bot einladen

Klicke auf den Invite-Link und wähle deinen Server:

```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

Bestätige die Berechtigungen — fertig!

### 2️⃣ Dashboard öffnen

Gehe auf **[botforge.app/dashboard](https://botforge.app/dashboard)** und logge dich mit Discord ein. Wähle deinen Server aus.

### 3️⃣ Konfigurieren

Alle Module lassen sich per Mausklick einstellen:
- Welcome-Nachrichten + Banner
- AutoMod-Filter
- Ticket-Dropdown-Kategorien
- Log-Channels
- Music-Settings
- Leveling-Rewards
- ... und viele mehr

**Kein einziger Command nötig** — aber alle 100+ Commands sind natürlich auch verfügbar.

---

## 🌐 Website & Asset Center

Die Marketing-Website + Dashboard-Frontend liegen im Repo-Root (React + Vite + Tailwind).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production-Build → dist/
```

### 📄 Die 28 vollständig integrierten Seiten:
1. **`/` (Home)** — Futuristisches Interface mit Partner-Karussell und 3-Schritt-Anleitung
2. **`/dashboard`** — Discord OAuth & High-End Einstellungsmatrix (18 Module)
3. **`/commands`** — 100+ Slash-Commands durchsuchbar
4. **`/status`** — Live Ping, Uptime und Service-Messung alle 10 Sekunden
5. **`/emojis`** — Asset Center zum Download unserer Custom Emojis
6. **`/team`** — Unser Entwickler- und Support-Team im Portrait
7. **`/docs`** — Startpunkt des Dokumentations-Centers
8. **`/docs/setup`** — Anleitung zur Ersteinrichtung und Rollen-Hierarchie
9. **`/docs/moderation`** — Mod-Command-Dokumentation und DMs
10. **`/docs/automod`** — AutoMod 2.0 Filter-Konfiguration
11. **`/docs/tickets`** — Ticket-System-Erklärung und Transcripts
12. **`/docs/music`** — wavelink/Lavalink Audio-Dokumentation
13. **`/features`** — Interaktiver Vergleich zwischen Free und Premium
14. **`/premium`** — Premium-Vorteile, Abos und Preisspezifikationen
15. **`/leaderboard`** — Globale Serverübergreifende XP-Bestenliste mit Suche
16. **`/analytics`** — Systemlast, Command-Heatmaps und Aktivitätsgraphen
17. **`/status/incidents`** — Lückenloses Archiv vergangener Gateway-Störungen
18. **`/faq`** — Häufige Fragen filterbar nach Modulen
19. **`/branding`** — Press-Kit mit hochauflösenden Logos und Farb-Copierern
20. **`/affiliate`** — Partner- und Empfehlungsprogramm mit lifetime Provisionen
21. **`/contact`** — Kontakt-Center mit Direktanfragen-Routing
22. **`/suggest`** — Live Feature-Vorschlags- und Abstimmungs-Portal
23. **`/status/maintenance`** — Geplante Arbeiten und Knotenpunkt-Reboots
24. **`/guilds`** — Gilden- und eSports-Partnerschaften
25. **`/security`** — DSGVO-Zertifikate und TLS-Verschlüsselungsdaten
26. **`/downloads`** — Native Desktop-Clients (Windows/macOS) und Android-APK
27. **`/growth`** — Interaktiver Server-Wachstumsrechner
28. **`/terms`** & **`/privacy`** — DSGVO-konforme Rechtstexte

### ⚙️ E-Mail, Discord & Bot Customization
Administratoren können im **Settings-Tab** des Dashboards:
- **Owner E-Mail** eintragen für automatische Wartungswarnungen und wöchentliche Aktivitätsberichte.
- **Custom Discord-Bot-Name** festlegen (Premium), um den Namen des Bots serverseitig anzupassen.
- **E-Mail Benachrichtigungen** aktivieren/deaktivieren.
- **Easy Commands** ein-/ausschalten.

---

## 🤖 Bot-Code (`bot/`) — nur für den Entwickler relevant

> Dieser Abschnitt ist **nur für den Bot-Entwickler** — nicht für normale Server-Owner.

### Lokales Setup (Entwickler)

```bash
cd bot
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example ../.env                           # und Werte eintragen
python bot.py
```

### Struktur

```
bot/
├── bot.py                 # Haupt-Bot, lädt alle Cogs, startet Dashboard
├── config.py              # Secrets aus Environment
├── dashboard.py           # Flask-Dashboard + Discord OAuth2 + REST-API
└── cogs/
    ├── automod.py         # AutoMod 2.0 mit 8 Filtern + DMs
    ├── tickets.py         # Ticket-System mit Discord-Dropdown-Menü
    ├── music.py           # Lavalink-Player (YouTube/Spotify/SoundCloud)
    ├── welcome.py         # Welcome/Leave + Banner-Card
    ├── levels.py          # XP + Rank-Card + Leaderboard
    ├── logging.py         # 15+ Log-Events + pro-Channel Routing
    ├── moderation.py      # ban/kick/timeout/warn mit DMs
    └── utility.py         # Stats, Help, Custom Commands, Emoji, Embed
```

### Dashboard-API (Flask, Port 5000)

Der Bot startet automatisch ein Flask-Dashboard. Dieses wird vom React-Frontend aufgerufen.

| Endpoint | Methode | Beschreibung |
|----------|---------|--------------|
| `/api/login` | GET | Discord OAuth starten |
| `/callback` | GET | OAuth Callback |
| `/api/me` | GET | Aktueller User (login required) |
| `/api/guilds` | GET | Server-Liste mit Manage-Guild (login required) |
| `/api/guilds/<id>/config` | GET | Server-Config laden |
| `/api/guilds/<id>/config` | POST | Server-Config speichern |
| `/api/stats` | GET | Live Bot-Stats (public) |
| `/health` | GET | Health-Check |

---

## 🚂 Hosting auf Railway (nur Entwickler!)

> **Nur der Bot-Entwickler hostet auf Railway.** Server-Owner brauchen das nicht.
> **Alles läuft auf EINEM Railway-Service:** Bot + Dashboard-API + Website (via Flask).

### Architektur

```
Railway Service (1x)
├── Python bot.py läuft
│   ├── Discord Bot (Gateway + REST)
│   ├── Flask Server (Port 5000)
│   │   ├── /api/* → Dashboard REST-API
│   │   ├── /health → Health-Check
│   │   └── /* → statische Website aus /dist/
│   └── MongoDB (extern: Atlas)
└── Domain: botforge.app → Railway
```

### Setup — Schritt für Schritt

**1. Website bauen:**
```bash
npm install
npm run build   # erzeugt /dist/ mit der kompletten SPA
```

**2. Repo auf GitHub pushen** (sowohl `bot/` als auch `dist/` committen — Railway serviert die statischen Dateien direkt).

**3. Railway:**
1. Neues Projekt auf [railway.app](https://railway.app)
2. "Deploy from GitHub Repo" → Repo auswählen
3. **Root Directory:** `bot`
4. **Start Command:** `python bot.py`
5. **Python Version:** 3.11+ (via `runtime.txt` oder Auto-Detect)
6. **Port:** Railway setzt `PORT` automatisch, Flask hört darauf

**4. Environment Variables eintragen:**

| Variable | Wert |
|----------|------|
| `DISCORD_TOKEN` | Bot-Token vom Developer Portal |
| `DISCORD_CLIENT_ID` | Application Client ID |
| `DISCORD_CLIENT_SECRET` | OAuth2 Client Secret |
| `DISCORD_PUBLIC_KEY` | Interactions Public Key |
| `MONGO_URI` | MongoDB Atlas Connection String |
| `SESSION_SECRET` | Langer zufälliger String |
| `REDIRECT_URI` | `https://deine-domain.up.railway.app/api/callback` |
| `LAVALINK_HOST` | Lavalink-Server Host |
| `LAVALINK_PASSWORD` | Lavalink Passwort |

**5. Discord Developer Portal:**
- OAuth2 → Redirects: `https://deine-domain.up.railway.app/api/callback` hinzufügen
- Bot → Privileged Intents: **alle 3 aktivieren** (Presence, Server Members, Message Content)

**6. Custom Domain (optional):**
- Railway → Settings → Domains → `botforge.app` hinzufügen
- DNS: CNAME auf Railway-Domain

### Zusätzliche Services (optional)

- **MongoDB Atlas** (extern, kostenlos bis 512 MB)
- **Lavalink** (Docker: `fredboat/lavalink:latest` als zweiter Railway Service)

### Deploy-Flow bei Updates

```bash
# Nach Änderungen:
npm run build                    # Website neu bauen
git add dist/ bot/               # Änderungen stagen
git commit -m "Update"
git push                         # Railway deploied automatisch
```

---

## 🔐 Secrets

**NIEMALS** echte Tokens ins Repo committen!

| Umgebung | Wo liegen Secrets? |
|----------|-------------------|
| Lokal | `.env` (gitignored) |
| Railway | Dashboard → Variables |
| Vercel | Project Settings → Environment Variables |

---

## 📦 Commands (100+)

Über 100 Slash-Commands in 8 Kategorien. Alle sichtbar mit `/help` oder auf [botforge.app/commands](https://botforge.app/commands).

**Highlights:**
- `/ticket panel` — sendet Dropdown-Menü
- `/ticket add-category` — Kategorie hinzufügen
- `/play <query>` — Music spielen
- `/automod toggle` — AutoMod an/aus
- `/warn <user> <grund>` — Warn mit automatischer DM
- `/rank` — Rank-Card (generiert via Pillow)
- `/embed` — Embed mit Farbe, Titel, Beschreibung

---

## 🧱 Tech-Stack

| Bereich | Technologie |
|---------|-------------|
| Bot | Python 3.11 · discord.py 2.3+ · motor · wavelink · Pillow |
| Dashboard API | Flask · Discord OAuth2 |
| DB | MongoDB Atlas |
| Music | Lavalink + wavelink |
| Website | React 18 · TypeScript · Vite 7 · Tailwind 4 · lucide-react |
| Hosting | Railway (Bot + API) · Vercel (Website) |

---

## 📄 License

MIT — nutze, forke, verbessere.

---

Made with 💜 by BotForge · Not affiliated with Discord Inc.
