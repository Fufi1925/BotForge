# ⚡ BotForge – Discord Bot

Ein vollständiger Discord Bot mit Web-Dashboard.

![Status](https://img.shields.io/badge/status-online-brightgreen)
![Python](https://img.shields.io/badge/python-3.10+-blue)
![License](https://img.shields.io/badge/license-MIT-purple)

---

## 🚀 Features

- 🛡️ **Moderation** – Ban, Kick, Mute, Warn, Purge, Lock/Unlock
- 👋 **Willkommen** – Auto-Willkommen, DM, Auto-Rolle
- ⚡ **Auto-Responder** – Trigger → Antwort Regeln
- 📋 **Logging** – Message Delete/Edit, Joins, Bans
- 🎲 **Fun** – Coinflip, Dice, 8-Ball, Meme, Giveaway, Poll
- 🔧 **Utility** – Userinfo, Serverinfo, Avatar, Ping
- 🖥️ **Web Dashboard** – Komplettes React Dashboard

---

## ⚙️ Installation

### 1. Repository klonen
```bash
git clone https://github.com/DEIN-NAME/botforge.git
cd botforge
```

### 2. Libraries installieren
```bash
pip install -r requirements.txt
```

### 3. Token eintragen
Erstelle eine `.env` Datei:
```
DISCORD_TOKEN=DEIN_TOKEN_HIER
```

### 4. Bot starten
```bash
python bot.py
```

---

## 🌐 Hosting auf DisCloud (kostenlos)

1. Gehe zu [discloud.app](https://discloud.app)
2. Registriere dich (kein Kreditkarte nötig)
3. Klicke auf **"New App"**
4. Zippe alle Dateien und lade sie hoch
5. Fertig! ✅

---

## 📁 Projektstruktur

```
botforge/
├── bot.py              # Discord Bot (Python)
├── dashboard.jsx       # Web Dashboard (React)
├── requirements.txt    # Python Libraries
├── discloud.config     # DisCloud Konfiguration
├── .env                # Token (NICHT auf GitHub pushen!)
└── .gitignore          # Schützt deine Daten
```

---

## 🤖 Befehle

| Befehl | Beschreibung | Berechtigung |
|--------|-------------|--------------|
| `!ban <user>` | Bannt einen User | Moderator |
| `!kick <user>` | Kickt einen User | Moderator |
| `!mute <user> <min>` | Mutet einen User | Moderator |
| `!warn <user> <grund>` | Verwarnt einen User | Moderator |
| `!purge <anzahl>` | Löscht Nachrichten | Moderator |
| `!lock` / `!unlock` | Channel sperren | Admin |
| `!setlog <#kanal>` | Log-Kanal setzen | Admin |
| `!setwelcome <#kanal>` | Willkommens-Kanal | Admin |
| `!addresponse <trigger> <antwort>` | Auto-Responder | Admin |
| `!userinfo` | User-Infos | Jeder |
| `!serverinfo` | Server-Infos | Jeder |
| `!ping` | Bot-Latenz | Jeder |
| `!coinflip` | Kopf oder Zahl | Jeder |
| `!dice [seiten]` | Würfeln | Jeder |
| `!8ball <frage>` | Magic 8-Ball | Jeder |
| `!meme` | Zufälliges Meme | Jeder |
| `!poll <frage>` | Umfrage erstellen | Jeder |
| `!giveaway <min> <preis>` | Giveaway starten | Admin |

---

## ⚠️ Wichtig

**Teile deinen Token NIEMALS öffentlich!** Die `.env` Datei ist in `.gitignore` eingetragen und wird nicht auf GitHub hochgeladen.

---

Made with ❤️ and ⚡ BotForge
