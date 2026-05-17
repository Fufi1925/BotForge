"""Config — lädt alle Secrets aus der Umgebung (.env / Railway)."""

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # Discord
    TOKEN = os.getenv("DISCORD_TOKEN", "")
    CLIENT_ID = os.getenv("DISCORD_CLIENT_ID", "")
    CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET", "")
    OWNER_ID = os.getenv("OWNER_ID", "1303627964734246944")
    PUBLIC_KEY = os.getenv("DISCORD_PUBLIC_KEY", "")
    PREFIX = os.getenv("PREFIX", "!")

    # Dashboard OAuth
    # Railway setzt RAILWAY_PUBLIC_DOMAIN automatisch, wenn eine Domain generiert wurde.
    _railway_domain = os.getenv("RAILWAY_PUBLIC_DOMAIN", "")
    REDIRECT_URI = os.getenv(
        "REDIRECT_URI",
        f"https://{_railway_domain}/api/callback" if _railway_domain else ""
    )
    SESSION_SECRET = os.getenv("SESSION_SECRET", "change-me-please")

    # Database
    MONGO_URI = os.getenv("MONGO_URI", "")

    # Music (Lavalink)
    LAVALINK_HOST = os.getenv("LAVALINK_HOST", "localhost")
    LAVALINK_PORT = int(os.getenv("LAVALINK_PORT", "2333"))
    LAVALINK_PASSWORD = os.getenv("LAVALINK_PASSWORD", "youshallnotpass")

    # Dashboard
    DASHBOARD_PORT = int(os.getenv("PORT", "5000"))
    DASHBOARD_HOST = os.getenv("DASHBOARD_HOST", "0.0.0.0")
