# 🚀 BotForge — Komplettes Setup

## 📋 Konfiguration (config.json)

In `config.json` kannst du **alles** zentral einstellen:

### Stats: Live oder Fake?
```json
"stats": {
  "use_live": true,  // TRUE = Echte Live-Daten vom Bot
                     // FALSE = Fake-Daten aus der Config
  "fake": {
    "guilds": 847,
    "users": 248000,
    "channels": 14523,
    "commands_total": 12400000,
    "uptime_days": 143
  }
}
```

**Empfehlung:** Auf Railway `use_live: true` setzen — dann sind alle Stats echt!

### Dashboard Demo-Login
```json
"dashboard": {
  "enable_demo_login": true   // TRUE = Demo-Button sichtbar
                              // FALSE = Nur Discord-OAuth Login
}
```

### Module aktivieren/deaktivieren
```json
"modules": {
  "tickets": true,
  "automod": true,
  "music": true,
  "welcome": true,
  "levels": true,
  "logging": true,
  "moderation": true,
  "custom_commands": true,
  "giveaways": true,
  "reaction_roles": true,
  "ai_features": false,   // Noch in Entwicklung
  "economy": true,
  "integrations": true
}
```

### Partner konfigurieren
```json
"partners": {
  "enabled": true,
  "featured": [
    {"name": "Nebula Gaming", "members": 12400, "icon": "🎮"},
    {"name": "ArtStation DE", "members": 28300, "icon": "🎨"},
    {"name": "Music Lounge", "members": 8400, "icon": "🎵"},
    {"name": "CyberDev Hub", "members": 4800, "icon": "💻"}
  ]
}
```

---

## 🚂 Railway Deployment

### 1. Vorbereitung
```bash
# Website bauen
npm install
npm run build

# Alles committen
git add .
git commit -m "BotForge v2.0 Ready"
git push
```

### 2. Railway Setup
1. Gehe auf [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Wähle dein Repo aus
4. **Wichtig:** Railway erkennt automatisch:
   - `package.json` → baut die Website
   - `requirements.txt` → installiert Python-Packages
   - `railway.json` → Start-Command (`python bot/bot.py`)

### 3. Environment Variables eintragen
Im Railway Dashboard unter "Variables":

| Variable | Wert |
|----------|------|
| `DISCORD_TOKEN` | Dein Bot-Token von discord.com/developers |
| `DISCORD_CLIENT_ID` | Application Client ID |
| `DISCORD_CLIENT_SECRET` | OAuth2 Client Secret |
| `DISCORD_PUBLIC_KEY` | Interactions Public Key |
| `MONGO_URI` | MongoDB Atlas Connection String |
| `SESSION_SECRET` | Zufälliger String (z.B. `openssl rand -hex 32`) |
| `REDIRECT_URI` | `https://deine-app.up.railway.app/api/callback` |
| `LAVALINK_HOST` | Lavalink-Server Host (optional) |
| `LAVALINK_PASSWORD` | Lavalink Passwort (optional) |
| `PORT` | `5000` (wird automatisch gesetzt) |

### 4. Discord Developer Portal
1. Gehe zu [discord.com/developers](https://discord.com/developers)
2. Wähle deine Application
3. **OAuth2 → Redirects:**
   - `https://deine-app.up.railway.app/api/callback` hinzufügen
4. **Bot → Privileged Intents:**
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent

### 5. Custom Domain (optional)
1. Railway → Settings → Domains
2. `botforge.app` hinzufügen
3. DNS bei deinem Registrar:
   - CNAME: `@` → `up.railway.app`

---

## ✅ Checkliste

- [ ] `config.json` erstellt und angepasst
- [ ] `use_live: true` für echte Stats
- [ ] `.env` oder Railway Variables eingetragen
- [ ] Discord OAuth2 Redirect-URL gesetzt
- [ ] Alle 3 Privileged Intents aktiviert
- [ ] MongoDB Atlas Cluster erstellt
- [ ] Website gebaut (`npm run build`)
- [ ] Auf GitHub gepusht
- [ ] Railway Deploy erfolgreich

---

## 🎨 Partner auf der Website

Partner werden **automatisch** von `config.json` geladen und auf der Home-Page prominent angezeigt.

Um neue Partner hinzuzufügen:
1. `config.json` bearbeiten
2. Neuen Eintrag im `partners.featured` Array hinzufügen
3. Deployen (Railway lädt automatisch neu)

---

## 📊 Stats: Live vs. Fake

| Modus | Vorteil | Nachteil |
|-------|---------|----------|
| **Live** (`use_live: true`) | Echte Daten, immer aktuell | Bot muss online sein |
| **Fake** (`use_live: false`) | Funktioniert immer, auch offline | Manuell pflegen |

**Empfehlung:** Auf Production **immer `use_live: true`** — der Bot läuft eh 24/7 auf Railway!

---

## 🛠️ Troubleshooting

### Bot startet nicht
- Prüfe `DISCORD_TOKEN` in Railway Variables
- Schau ins Railway Log (Deployments → Latest → View Logs)

### Dashboard zeigt keine Stats
- Prüfe ob `use_live: true` und Bot online ist
- Oder setze `use_live: false` und trage Fake-Daten ein

### OAuth Login funktioniert nicht
- Redirect-URL in Discord Developer Portal muss exakt匹配 Railway-URL sein
- `SESSION_SECRET` muss gesetzt sein

### Website zeigt alte Version
- Railway cached manchmal — Deploy neu triggern
- Browser Cache leeren (Strg+F5)

---

## 🎉 Fertig!

Dein BotForge ist jetzt:
- ✅ Auf Railway gehostet (1 Service für alles)
- ✅ Mit echter Live-Statistik (oder Fake-Daten)
- ✅ Mit prominenter Partner-Präsentation
- ✅ Mit Demo-Login (wenn aktiviert)
- ✅ Mit 100+ Commands
- ✅ Mit modernstem Dashboard

Viel Erfolg mit deinem Bot! 🚀
