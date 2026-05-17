# BotForge Railway Quickstart

Ziel: Du gehst zu Railway, meldest dich an, erstellst ein neues Projekt, waehlst dein GitHub-Repo, traegst Secrets ein und generierst eine Domain. Mehr nicht.

## 1. GitHub Repo vorbereiten

Vor dem Push einmal lokal bauen:

```bash
npm install
npm run build
git add .
git commit -m "BotForge production"
git push
```

## 2. Railway Projekt erstellen

1. https://railway.app oeffnen
2. Login mit GitHub
3. New Project
4. Deploy from GitHub Repo
5. Dein BotForge Repo auswaehlen

Railway erkennt automatisch:

- `nixpacks.toml`: installiert Node + Python, baut Website, installiert Python Dependencies
- `railway.json`: startet `python bot/bot.py`
- `dist/index.html`: wird vom Flask Server als Website ausgeliefert

## 3. Secrets in Railway eintragen

Railway -> Service -> Variables:

```bash
DISCORD_TOKEN=dein_bot_token
DISCORD_CLIENT_ID=deine_application_id
DISCORD_CLIENT_SECRET=dein_client_secret
DISCORD_PUBLIC_KEY=dein_public_key
OWNER_ID=1303627964734246944
MONGO_URI=mongodb+srv://...
SESSION_SECRET=ein_langer_random_string
PREFIX=!
```

Optional fuer Music:

```bash
LAVALINK_HOST=dein_lavalink_host
LAVALINK_PORT=2333
LAVALINK_PASSWORD=dein_passwort
```

## 4. Domain generieren

Railway -> Service -> Settings -> Domains -> Generate Domain.

Danach hast du z.B.:

```text
https://dein-projekt.up.railway.app
```

## 5. Discord Redirect URL setzen

Discord Developer Portal -> OAuth2 -> Redirects:

```text
https://dein-projekt.up.railway.app/api/callback
```

Wenn du `REDIRECT_URI` nicht manuell setzt, nutzt BotForge automatisch `RAILWAY_PUBLIC_DOMAIN`.

## 6. Fertig

Die gleiche Railway Domain hostet:

- Website: `/`
- Dashboard: `/dashboard`
- Demo: `/demo-dashboard-test`
- API: `/api/stats`, `/api/system`, `/api/login`
- Health: `/health`

## Wenn Website nicht geht

Pruefe Railway Logs. Es muss im Build stehen:

```text
npm run build
vite build
dist/index.html
```

Falls nicht: Redeploy klicken. `nixpacks.toml` ist bereits korrekt eingerichtet.
