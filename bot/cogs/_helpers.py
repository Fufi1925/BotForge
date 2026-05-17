"""BotForge Pro Embed System v3.0 — Modern, konsistent, schön.
200% Upgrade: Visual Hierarchy, Trennlinien, Status-Icons, Author-Tags.
"""

import datetime
import json
from pathlib import Path
import discord
from typing import Optional


class BF:
    """BotForge Brand Constants."""
    # Hauptfarben (Hex-Werte für Embeds)
    PRIMARY = 0x7C3AED
    SECONDARY = 0x06B6D4
    ACCENT = 0xEC4899

    # Status
    SUCCESS = 0x10B981
    ERROR = 0xEF4444
    WARNING = 0xF59E0B
    INFO = 0x3B82F6
    NEUTRAL = 0x6B7280

    # Module
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

    # Branding
    FOOTER = "BotForge · botforge.app"
    DEV = "by Fufi"
    DIVIDER = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    DIV_SHORT = "━━━━━━━━━━━━━━━━"
    BRAND_BAR = "▰▰▰▰▰▰▰▰▰▱▱▱"


I18N = {
    "de": {
        "executor": "Ausgeführt von",
        "moderator": "Moderator",
        "reason": "Grund",
        "duration": "Dauer",
        "remaining": "Verbleibende Zeit",
        "case": "Fall",
        "server": "Server",
        "appeal": "Einspruch einlegen",
        "appeal_text": "Wenn du denkst, dass diese Aktion falsch war, kontaktiere bitte das Team des Servers.",
        "no_reason": "Kein Grund angegeben",
        "actions": {
            "Ban": "Du wurdest in {server} gebannt.",
            "Kick": "Du wurdest aus {server} gekickt.",
            "Timeout": "Du wurdest in {server} getimeoutet.",
            "Untimeout": "Dein Timeout wurde in {server} entfernt.",
            "Warn": "Du wurdest in {server} verwarnt.",
            "Mute": "Du wurdest in {server} gemutet.",
            "Unmute": "Dein Mute wurde in {server} entfernt.",
        },
    },
    "en": {
        "executor": "Executor",
        "moderator": "Moderator",
        "reason": "Reason",
        "duration": "Duration",
        "remaining": "Remaining Time",
        "case": "Case",
        "server": "Server",
        "appeal": "Appeal",
        "appeal_text": "If you think this action was wrong, please contact the server team.",
        "no_reason": "No reason given",
        "actions": {
            "Ban": "You have been banned in {server}.",
            "Kick": "You have been kicked from {server}.",
            "Timeout": "You have been timed out in {server}.",
            "Untimeout": "Your timeout has been removed in {server}.",
            "Warn": "You have been warned in {server}.",
            "Mute": "You have been muted in {server}.",
            "Unmute": "Your mute has been removed in {server}.",
        },
    },
}


def _lang(lang: str | None) -> dict:
    return I18N.get((lang or "de").lower(), I18N["de"])


class E:
    """Modern Emoji Set."""
    # Status
    OK = "✅"
    FAIL = "❌"
    WARN = "⚠️"
    INFO = "ℹ️"
    LOAD = "⏳"
    CHECK = "✔️"

    # Decorative
    STAR = "⭐"
    SPARKLE = "✨"
    FIRE = "🔥"
    BOLT = "⚡"
    ROCKET = "🚀"
    DIAMOND = "💎"
    HEART = "💜"
    CROWN = "👑"

    # Module
    SHIELD = "🛡️"
    TICKET = "🎫"
    MUSIC = "🎵"
    LEVEL = "📊"
    BOT = "🤖"
    GEAR = "⚙️"
    BELL = "🔔"
    GIFT = "🎁"
    PARTY = "🎉"

    # Mod
    BAN = "🔨"
    KICK = "👢"
    TIMEOUT = "⏱️"
    LOCK = "🔒"
    UNLOCK = "🔓"

    # Misc
    CLOCK = "🕐"
    USERS = "👥"
    GLOBE = "🌐"
    CHANNEL = "📢"
    MESSAGE = "💬"
    ARROW = "➤"
    DOT = "•"


def _custom_emoji(name: str, fallback: str) -> str:
    """Loads optional custom emojis from bot/custom_emojis.json.

    Example: {"ok":"<:bf_ok:123>", "shield":"<:bf_shield:123>"}
    If not configured, fallback unicode emoji is used.
    """
    try:
        path = Path(__file__).resolve().parents[1] / "custom_emojis.json"
        if path.exists():
            data = json.loads(path.read_text(encoding="utf-8"))
            return data.get(name, fallback)
    except Exception:
        pass
    return fallback


class Embed:
    """Pro Embed Builder mit fluent API."""

    @staticmethod
    def base(
        bot: discord.Client,
        *,
        title: Optional[str] = None,
        description: Optional[str] = None,
        color: int = BF.PRIMARY,
        url: Optional[str] = None,
        thumbnail: Optional[str] = None,
        image: Optional[str] = None,
        author_name: Optional[str] = None,
        author_icon: Optional[str] = None,
        author_url: Optional[str] = None,
        footer_text: Optional[str] = None,
        footer_icon: Optional[str] = None,
        timestamp: bool = True,
    ) -> discord.Embed:
        embed = discord.Embed(
            title=title,
            description=description,
            color=color,
            url=url,
            timestamp=datetime.datetime.utcnow() if timestamp else None,
        )
        if thumbnail:
            embed.set_thumbnail(url=thumbnail)
        if image:
            embed.set_image(url=image)
        if author_name:
            embed.set_author(name=author_name, icon_url=author_icon, url=author_url)
        if footer_text:
            embed.set_footer(text=footer_text, icon_url=footer_icon)
        elif bot.user:
            embed.set_footer(text=BF.FOOTER, icon_url=bot.user.display_avatar.url)
        return embed

    @staticmethod
    def success(bot, title: str, desc: str = None, **kw) -> discord.Embed:
        return Embed.base(bot, title=f"{_custom_emoji('ok', E.OK)}  {title}", description=desc, color=BF.SUCCESS, **kw)

    @staticmethod
    def error(bot, title: str, desc: str = None, **kw) -> discord.Embed:
        return Embed.base(bot, title=f"{_custom_emoji('fail', E.FAIL)}  {title}", description=desc, color=BF.ERROR, **kw)

    @staticmethod
    def warning(bot, title: str, desc: str = None, **kw) -> discord.Embed:
        return Embed.base(bot, title=f"{_custom_emoji('warn', E.WARN)}  {title}", description=desc, color=BF.WARNING, **kw)

    @staticmethod
    def info(bot, title: str, desc: str = None, **kw) -> discord.Embed:
        return Embed.base(bot, title=f"{_custom_emoji('info', E.INFO)}  {title}", description=desc, color=BF.INFO, **kw)

    @staticmethod
    def loading(bot, title: str = "Verarbeite Anfrage...") -> discord.Embed:
        return Embed.base(bot, title=f"{E.LOAD}  {title}", color=BF.PRIMARY)

    @staticmethod
    def mod_action(
        bot,
        action: str,
        target: discord.Member,
        moderator: discord.Member,
        reason: str = "Kein Grund angegeben",
        duration: str = None,
        case_id: int = None,
        guild_icon: str = None,
        lang: str = "de",
    ) -> discord.Embed:
        """Pro Mod-Action Embed mit Author-Tag, Trennlinien und Case-ID."""
        icon_map = {
            "Ban": E.BAN, "Unban": E.UNLOCK,
            "Kick": E.KICK,
            "Timeout": E.TIMEOUT, "Untimeout": E.UNLOCK,
            "Warn": E.WARN, "Mute": E.LOCK, "Unmute": E.UNLOCK,
        }
        icon = _custom_emoji("mod", icon_map.get(action, E.SHIELD))
        tr = _lang(lang)
        reason = reason or tr["no_reason"]

        embed = Embed.base(
            bot,
            color=BF.MOD,
            thumbnail=target.display_avatar.url,
            author_name=f"{moderator.display_name}",
            author_icon=moderator.display_avatar.url,
            footer_text=BF.FOOTER,
            footer_icon=bot.user.display_avatar.url if bot.user else guild_icon,
        )

        # Hero-Description
        headline = tr["actions"].get(action, f"{action}: {{server}}").format(server=target.guild.name)
        embed.description = (
            f"## {icon} {headline}\n\n"
            f"**{tr['executor']}:** {moderator.mention}\n"
            f"**User:** {target.mention} (`{target.id}`)\n"
            f"**{tr['reason']}:** `{reason}`\n"
            + (f"**{tr['duration']}:** `{duration}`\n" if duration else "")
            + (f"**{tr['case']}:** `#{case_id}`\n" if case_id else "")
        )

        return embed

    @staticmethod
    def dm_action(
        bot,
        action: str,
        guild: discord.Guild,
        moderator: discord.User,
        reason: str = "Kein Grund angegeben",
        duration: str = None,
        lang: str = "de",
    ) -> discord.Embed:
        """DM-Embed an betroffenen User."""
        tr = _lang(lang)
        reason = reason or tr["no_reason"]
        action_text = tr["actions"].get(action, f"{action} in {{server}}").format(server=guild.name)
        embed = Embed.base(
            bot,
            color=BF.MOD,
            thumbnail=guild.icon.url if guild.icon else None,
            author_name=str(moderator),
            author_icon=moderator.display_avatar.url,
        )

        embed.description = (
            f"## {action_text}\n\n"
            f"**{tr['executor']}:** {moderator}\n"
            f"**{tr['reason']}:** `{reason}`\n"
            + (f"**{tr['remaining']}:** `{duration}`\n" if duration else "")
            + f"\n{tr['appeal_text']}"
        )
        return embed

    @staticmethod
    def welcome(bot, member: discord.Member, guild: discord.Guild) -> discord.Embed:
        embed = Embed.base(
            bot,
            color=BF.WELCOME,
            thumbnail=member.display_avatar.url,
            author_name=f"Neuer Member · {guild.name}",
            author_icon=guild.icon.url if guild.icon else None,
        )
        embed.description = (
            f"## {E.PARTY} Willkommen, {member.mention}!\n"
            f"Schön, dass du auf **{guild.name}** bist!\n"
            f"{BF.DIV_SHORT}"
        )
        embed.add_field(name=f"{E.USERS} Member-Nummer", value=f"```#{guild.member_count}```", inline=True)
        embed.add_field(name=f"{E.CLOCK} Account erstellt", value=f"<t:{int(member.created_at.timestamp())}:R>", inline=True)
        return embed

    @staticmethod
    def music_now_playing(bot, track, requested_by: discord.Member) -> discord.Embed:
        embed = Embed.base(
            bot,
            color=BF.MUSIC,
            thumbnail=getattr(track, "artwork", None),
            author_name=f"{E.MUSIC} Jetzt läuft",
        )
        title = getattr(track, "title", "Unbekannt")
        author = getattr(track, "author", "Unbekannt")
        length = getattr(track, "length", 0)
        url = getattr(track, "uri", "")
        mins, secs = divmod(length // 1000, 60)

        embed.description = (
            f"## [{title}]({url})\n"
            f"### {author}\n"
            f"{BF.DIV_SHORT}"
        )
        embed.add_field(name=f"{E.CLOCK} Dauer", value=f"```{mins}:{secs:02d}```", inline=True)
        embed.add_field(name=f"{E.USERS} Angefragt von", value=f"{requested_by.mention}", inline=True)
        return embed

    @staticmethod
    def level_up(bot, member: discord.Member, level: int) -> discord.Embed:
        embed = Embed.base(
            bot,
            color=BF.LEVEL,
            thumbnail=member.display_avatar.url,
        )
        embed.description = (
            f"## {E.PARTY} Level Up!\n"
            f"### {member.mention}\n"
            f"Du hast soeben **Level {level}** erreicht! {E.SPARKLE}\n"
            f"{BF.DIV_SHORT}\n"
            f"{E.STAR} Mach weiter so!"
        )
        return embed

    @staticmethod
    def stats(bot, title: str, items: dict, color: int = BF.PRIMARY) -> discord.Embed:
        embed = Embed.base(bot, title=f"{E.LEVEL}  {title}", color=color)
        for key, value in items.items():
            embed.add_field(name=key, value=f"```{value}```", inline=True)
        return embed


# Backwards-Compat Wrapper
def base_embed(bot, title=None, description=None, color=BF.PRIMARY, **kw):
    return Embed.base(bot, title=title, description=description, color=color, **kw)

def success_embed(bot, title, desc=None, **kw):
    return Embed.success(bot, title, desc, **kw)

def error_embed(bot, title, desc=None, **kw):
    return Embed.error(bot, title, desc, **kw)

def warn_embed(bot, title, desc=None, **kw):
    return Embed.warning(bot, title, desc, **kw)

def info_embed(bot, title, desc=None, **kw):
    return Embed.info(bot, title, desc, **kw)

def loading_embed(bot, title="Verarbeite..."):
    return Embed.loading(bot, title)

def mod_action_embed(bot, action, target, moderator, reason="Kein Grund", duration=None, case_id=None, guild_icon=None, lang="de"):
    return Embed.mod_action(bot, action, target, moderator, reason, duration, case_id, guild_icon, lang)

def dm_action_embed(bot, action, guild, moderator, reason="Kein Grund", duration=None, lang="de"):
    return Embed.dm_action(bot, action, guild, moderator, reason, duration, lang)
