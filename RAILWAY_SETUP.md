# 🚂 BotForge — Komplette Railway Hosting Anleitung

> **Alles läuft auf EINEM Railway-Service.**  
> Bot + Website + Dashboard-API + OAuth + statische Dateien.  
> Kein localhost. Kein Vercel. Kein separater Server. **Ein Service. Eine URL. Alles drin.**

---

## 📋 Was du brauchst (Setup-Zeit: ~15 Minuten)

| Service | Zweck | Kosten |
|---------|-------|--------|
| **Discord Developer Account** | Bot-Token + OAuth | Kostenlos |
| **Railway Account** | Bot + Website hosten | ~5$/Monat (Hobby Plan) |
| **MongoDB Atlas** | Datenbank für Configs | Kostenlos (M0 Free Tier) |
| **GitHub Account** | Auto-Deploy via Push | Kostenlos |

---

## 🚀 Schritt 1: Discord Application erstellen

1. Öffne **[discord.com/developers/applications](https://discord.com/developers/applications)**
2. Klicke **"New Application"** → Name: `BotForge`
3. Im Tab **"General Information"** notiere dir:
   - **Application ID** = `DISCORD_CLIENT_ID`
   - **Public Key** = `DISCORD_PUBLIC_KEY`
4. Tab **"OAuth2" → "General"**:
   - Klicke **"Reset Secret"** → **Client Secret kopieren** = `DISCORD_CLIENT_SECRET`
5. Tab **"OAuth2" → "Redirects"**:
   - Füge hinzu: `https://DEINE-RAILWAY-URL.up.railway.app/api/callback`
6. Tab **"Bot"**:
   - **"Reset Token"** → **Token kopieren** = `DISCORD_TOKEN` (NIEMALS teilen!)
   - Aktiviere alle **3 Privileged Gateway Intents**:
     - ✅ Presence Intent
     - ✅ Server Members Intent
     - ✅ Message Content Intent

---

## 💾 Schritt 2: MongoDB Atlas einrichten

1. **[mongodb.com](https://mongodb.com)** → Konto erstellen
2. **"Build a Database"** → **M0 Free** wählen
3. Region: **Frankfurt (eu-central-1)**
4. **Database Access** → Neuer User:
   - Username: `botforge`
   - Password: Generieren & sichern
5. **Network Access** → **"Allow access from anywhere"** (`0.0.0.0/0`)
6. **Database** → **Connect** → **"Drivers"**:
   - Connection String kopieren:
     ```
     mongodb+srv://botforge:<password>@cluster0.xxxxx.mongodb.net/botforge?retryWrites=true&w=majority
     ```
   - Ersetze `<password>` mit deinem echten Passwort
   - Dies ist deine `MONGO_URI`

---

## 📦 Schritt 3: Code auf GitHub pushen

```bash
# Website bauen
npm install
npm run build

# Git initialisieren
git init
git add .
git commit -m "BotForge v3.0 Production"

# GitHub Repo erstellen, dann:
git remote add origin https://github.com/DEIN_USER/botforge.git
git branch -M main
git push -u origin main
```

> ⚠️ **WICHTIG:** Stelle sicher, dass `.env` in `.gitignore` steht!

---

## 🚂 Schritt 4: Railway Deployment

### 4.1 Projekt erstellen
1. **[railway.app](https://railway.app)** → Login mit GitHub
2. **"New Project"** → **"Deploy from GitHub Repo"**
3. Wähle dein `botforge`-Repo aus

### 4.2 Railway erkennt automatisch:
- ✅ `package.json` → führt `npm install` und `npm run build` aus
- ✅ `requirements.txt` → installiert Python-Packages
- ✅ `railway.json` → Start-Command: `python bot/bot.py`
- ✅ Port → wird automatisch über `PORT` env zugewiesen

### 4.3 Environment Variables eintragen

Im Railway Dashboard → dein Service → **"Variables"** Tab → folgende eintragen:

```bash
# === DISCORD ===
DISCORD_TOKEN=dein-bot-token-hier
DISCORD_CLIENT_ID=deine-application-id
DISCORD_CLIENT_SECRET=dein-client-secret
DISCORD_PUBLIC_KEY=dein-public-key
OWNER_ID=1303627964734246944
PREFIX=!

# === DATENBANK ===
MONGO_URI=mongodb+srv://botforge:DEIN_PW@cluster0.xxx.mongodb.net/botforge?retryWrites=true&w=majority

# === DASHBOARD ===
SESSION_SECRET=langer-zufaelliger-string-hier-32-zeichen-mindestens
REDIRECT_URI=https://DEINE-DOMAIN.up.railway.app/api/callback

# === RAILWAY (automatisch) ===
PORT=5000
DASHBOARD_HOST=0.0.0.0
```

**SESSION_SECRET generieren:**
```bash
# In Terminal:
openssl rand -hex 32
# oder online: https://randomkeygen.com/
```

### 4.4 Custom Domain (optional)
1. Railway → Service → **Settings** → **Domains**
2. **"Generate Domain"** → erhältst `botforge-production.up.railway.app`
3. ODER eigene Domain:
   - **"Custom Domain"** → `botforge.app` eingeben
   - DNS bei deinem Provider: `CNAME @ → up.railway.app`

### 4.5 Discord Developer Portal updaten
- Geh zurück zu **OAuth2 → Redirects**
- Ersetze Platzhalter mit deiner echten Railway-URL:
  ```
  https://botforge-production.up.railway.app/api/callback
  ```

---

## ✅ Schritt 5: Deployment prüfen

1. Railway → **Deployments** → letztes Deployment anklicken
2. **View Logs** — sollte zeigen:
   ```
   ✅ MongoDB verbunden
   ✅ Cog geladen: automod
   ✅ Cog geladen: tickets
   ✅ Cog geladen: music
   ✅ Cog geladen: welcome
   ✅ Cog geladen: levels
   ✅ Cog geladen: logging
   ✅ Cog geladen: moderation
   ✅ Cog geladen: utility
   ✅ 100 Slash Commands gesynct
   🚀 BotForge online als BotForge#XXXX
   ```
3. Website öffnen: `https://DEINE-DOMAIN.up.railway.app`
4. Du solltest die BotForge Home-Page sehen!

---

## 🤖 Schritt 6: Bot auf Server einladen

1. **Discord Developer Portal** → OAuth2 → **URL Generator**
2. Scopes: `bot` + `applications.commands`
3. Permissions: **Administrator** (oder spezifischere)
4. Generierter Link → öffnen → Server auswählen → autorisieren
5. Bot ist nun auf deinem Server!

---

## 🔄 Updates deployen

Jedes Mal wenn du Code änderst:

```bash
# 1. Website neu bauen
npm run build

# 2. Alles committen
git add .
git commit -m "Update: ..."
git push

# 3. Railway deployed AUTOMATISCH!
# Du musst nichts weiter tun.
```

---

## ⚙️ config.json — Die zentrale Steuerung

Diese Datei steuert ALLES auf der Website:

### Stats (echt oder fake):
```json
"stats": {
  "use_live": true,    // TRUE = echte Daten vom Bot
  "fake": { "guilds": 1, "users": 523 }  // Nur wenn use_live=false
}
```

### Page Visibility (jede Seite an/aus):
```json
"page_visibility": {
  "home": true,          // Seite normal sichtbar
  "economy": false,      // Zeigt "Coming Soon" an
  "ai": false,
  "downloads": false
}
```

### Demo-Dashboard (geheim):
```json
"demo_dashboard": {
  "enabled": false,                    // FALSE = nicht erreichbar
  "secret_path": "demo-bf-2025x"       // Nur du kennst diesen Pfad
}
```

### Partner:
```json
"partners": {
  "featured": [
    {
      "name": "Koblenz RP",
      "members": 523,
      "icon": "🏙️",
      "desc": "Die größte deutsche Roleplay-Community",
      "link": "https://discord.gg/koblenzrp",
      "verified": true
    }
  ]
}
```

---

## 🛠️ Troubleshooting

### Bot startet nicht
- **Check 1:** `DISCORD_TOKEN` in Railway Variables korrekt eingetragen?
- **Check 2:** Logs anschauen → meist steht der Fehler dort
- **Check 3:** Python-Version 3.11+ in `runtime.txt`?

### Dashboard zeigt 503
- **Check 1:** MongoDB Connection-String korrekt?
- **Check 2:** Network Access auf `0.0.0.0/0` in MongoDB Atlas?
- **Check 3:** `SESSION_SECRET` gesetzt?

### OAuth Login schlägt fehl
- **Check 1:** `REDIRECT_URI` in Railway = `REDIRECT_URI` in Discord Developer Portal?
- **Check 2:** Pfad muss exakt `/api/callback` enden
- **Check 3:** HTTPS verwenden (nicht HTTP)

### Website zeigt alte Version
- Railway cached manchmal → in Railway: "Redeploy" klicken
- Browser-Cache leeren: `Strg + Shift + R`

### Stats zeigen 0 / falsche Werte
- `config.json` → `use_live` auf `true` setzen
- Bot muss vollständig online sein (siehe Logs)

---

## 🎯 Quick-Reference: Alle wichtigen Pfade

| Was | URL / Pfad |
|-----|------------|
| Website | `https://DEINE-DOMAIN.up.railway.app/` |
| Dashboard | `/dashboard` |
| Login | `/api/login` |
| Live Stats API | `/api/stats` |
| System-Config API | `/api/system` |
| Health-Check | `/health` |
| Geheimes Demo | `/{secret_path}` (nur wenn enabled) |

---

## 💜 Tipps von Fufi

1. **Backup deine MongoDB regelmäßig** — Atlas hat automatische Backups im Free Tier
2. **Setze `OWNER_ID`** — dann hast du als Fufi überall Bypass-Rechte
3. **Verstecke `demo_dashboard.secret_path`** — wechsle ihn alle paar Wochen
4. **Page Visibility nutzen** — entwickle Features in Ruhe, schalte sie später live
5. **Railway Logs immer aktiv lassen** — sofort sehen wenn was crashed

---

## 🚀 Fertig!

Du hast jetzt:
- ✅ Bot auf Railway gehostet
- ✅ Website auf gleicher Railway-URL
- ✅ Dashboard mit Discord-Login
- ✅ Live-Stats funktionieren
- ✅ MongoDB für Configs
- ✅ Auto-Deploy bei `git push`

**Ein Service. Eine URL. Alles drin. So macht man das.** 💜

---

*Made with ❤️ by Fufi · BotForge v3.0*
