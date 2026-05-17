# 🚂 BotForge — Railway Hosting Guide

> **Alles läuft auf EINEM Railway-Service.** Bot + Website + Dashboard-API + OAuth.
> Kein localhost, kein Vercel, kein separater Server.

---

## 📋 Was du brauchst

1. **Discord Developer Account** → discord.com/developers
2. **Railway Account** → railway.app (kostenlos starten, dann Hobby Plan ~5$/Monat)
3. **MongoDB Atlas** → mongodb.com (Free Tier reicht für 500+ Server)
4. **GitHub Account** → Für Auto-Deploy

---

## 🚀 Schritt-für-Schritt

### 1. Discord Application erstellen

1. Gehe zu [discord.com/developers/applications](https://discord.com/developers/applications)
2. Klicke "New Application" → Name: `BotForge`
3. Notiere dir:
   - **Application ID** (= Client ID)
   - **Public Key**
4. Gehe zu "Bot" → "Add Bot" → "Reset Token" → **Token kopieren!**
5. Aktiviere unter "Bot" → "Privileged Gateway Intents":
   - ✅ PRESENCE INTENT
   - ✅ SERVER MEMBERS INTENT
   - ✅ MESSAGE CONTENT INTENT
6. Gehe zu "OAuth2" → "Redirects" → Füge hinzu:
   - `https://DEINE-APP.up.railway.app/api/callback`

### 2. MongoDB Atlas einrichten

1. Erstelle ein Konto auf [mongodb.com](https://mongodb.com)
2. Erstelle einen Cluster (Free M0 reicht)
3. Erstelle einen Database-User (Username + Passwort)
4. Network Access → `0.0.0.0/0` erlauben (damit Railway zugreifen kann)
5. Klicke "Connect" → "Connect your application" → Connection String kopieren:
   ```
   mongodb+srv://USER:PASSWORT@cluster0.xxxxx.mongodb.net/botforge?retryWrites=true&w=majority
   ```

### 3. Repository auf GitHub pushen

```bash
# Website bauen
npm install
npm run build

# Alles committen
git init
git add .
git commit -m "BotForge v2.5"
git remote add origin https://github.com/DEIN_USER/botforge.git
git push -u origin main
```

### 4. Railway Service erstellen

1. Gehe zu [railway.app](https://railway.app) → "New Project"
2. "Deploy from GitHub Repo" → Wähle dein `botforge` Repo
3. Railway erkennt automatisch:
   - `requirements.txt` → Python installieren
   - `railway.json` → Start-Command: `python bot/bot.py`

### 5. Environment Variables eintragen

Im Railway Dashboard → dein Service → "Variables" Tab:

```
DISCORD_TOKEN=dein-bot-token
DISCORD_CLIENT_ID=deine-application-id
DISCORD_CLIENT_SECRET=dein-oauth2-secret
DISCORD_PUBLIC_KEY=dein-public-key
OWNER_ID=1303627964734246944
MONGO_URI=mongodb+srv://...
SESSION_SECRET=ein-langer-zufaelliger-string-hier
REDIRECT_URI=https://DEINE-APP.up.railway.app/api/callback
PREFIX=!
PORT=5000
```

### 6. Custom Domain (optional)

1. Railway → Settings → Domains
2. Generierte URL nutzen ODER Custom Domain hinzufügen
3. DNS bei deinem Provider: CNAME → Railway URL

### 7. Deploy prüfen

1. Railway → Deployments → Letztes Deployment anklicken
2. Logs lesen → Sollte zeigen:
   ```
   ✅ MongoDB verbunden
   ✅ Cog geladen: automod
   ✅ Cog geladen: tickets
   ...
   🚀 BotForge online als BotForge#1234
   ```
3. Website aufrufen: `https://DEINE-APP.up.railway.app`

---

## 🔄 Updates deployen

```bash
# Nach Code-Änderungen:
npm run build           # Website neu bauen
git add .
git commit -m "Update"
git push                # Railway deployt automatisch!
```

---

## 📊 config.json Einstellungen

Diese Datei steuert die Website und den Bot:

| Einstellung | Beschreibung |
|------------|-------------|
| `stats.use_live` | `true` = echte Bot-Daten, `false` = Fake-Werte |
| `dashboard.enable_demo_login` | Demo-Button im Dashboard Login |
| `demo_dashboard.enabled` | Geheimes Demo-Dashboard aktivieren |
| `demo_dashboard.secret_path` | URL-Pfad (z.B. `demo-bf-2025x`) |
| `modules.*` | Einzelne Bot-Module an/aus |
| `partners.featured` | Partner auf der Home-Page |

---

## ⚠️ Wichtig

- **NIEMALS** den Bot-Token in den Code schreiben → immer über Railway Variables
- **NIEMALS** `OWNER_ID` in öffentlichen Repos zeigen
- **IMMER** `npm run build` vor dem Push ausführen
- Der Bot startet Flask automatisch auf dem von Railway zugewiesenen Port
