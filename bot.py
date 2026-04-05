
# ╔══════════════════════════════════════════════════════════════╗
# ║          BotForge Discord Bot  –  bot.py                     ║
# ║  Sprache: Python 3.10+  |  Library: discord.py 2.x           ║
# ║  Hosting: DisCloud (kostenlos, keine Kreditkarte)            ║
# ╚══════════════════════════════════════════════════════════════╝
#
#  Installation:
#    pip install discord.py yt-dlp PyNaCl aiohttp python-dotenv
#
#  Starte mit:
#    python bot.py
#
#  Setze DISCORD_TOKEN in einer .env Datei ODER direkt unten.
# ───────────────────────────────────────────────────────────────

import discord
from discord.ext import commands, tasks
import asyncio
import json
import os
import datetime
import random
import aiohttp
from dotenv import load_dotenv

load_dotenv()

# ─── KONFIGURATION ────────────────────────────────────────────
TOKEN = os.getenv("DISCORD_TOKEN") or "DEIN_TOKEN_HIER"
PREFIX = "!"
BOT_STATUS = "!help | BotForge"

# ─── DATEN-SPEICHER (in-memory, kann durch DB ersetzt werden) ──
warns_db = {}          # {guild_id: {user_id: [{"reason":..., "by":...}]}}
auto_responses = {}    # {guild_id: [{"trigger": ..., "response": ..., "type": ...}]}
log_channels = {}      # {guild_id: channel_id}
welcome_config = {}    # {guild_id: {...}}

# ─── BOT SETUP ────────────────────────────────────────────────
intents = discord.Intents.all()
bot = commands.Bot(command_prefix=PREFIX, intents=intents, help_command=None)

# ════════════════════════════════════════════════════════════════
#  EVENTS
# ════════════════════════════════════════════════════════════════

@bot.event
async def on_ready():
    print(f"✅ {bot.user} ist online!")
    print(f"   Servers: {len(bot.guilds)}")
    await bot.change_presence(
        status=discord.Status.online,
        activity=discord.Activity(type=discord.ActivityType.watching, name=BOT_STATUS)
    )

@bot.event
async def on_member_join(member: discord.Member):
    guild = member.guild
    cfg = welcome_config.get(guild.id)
    
    # Standard-Kanal suchen wenn nicht konfiguriert
    if not cfg:
        channel = discord.utils.find(lambda c: "willkommen" in c.name.lower() or "welcome" in c.name.lower(), guild.text_channels)
        if channel:
            embed = discord.Embed(
                title=f"👋 Willkommen, {member.name}!",
                description=f"Du bist Mitglied **#{guild.member_count}** auf **{guild.name}**!\nLies unsere Regeln und hab Spaß! 🎉",
                color=0x5865F2
            )
            embed.set_thumbnail(url=member.display_avatar.url)
            await channel.send(embed=embed)
        return
    
    # Konfigurierter Willkommens-Kanal
    channel = guild.get_channel(cfg.get("channel_id"))
    if channel:
        msg = cfg.get("message", "Willkommen {user}!") \
                 .replace("{user}", member.mention) \
                 .replace("{name}", member.name) \
                 .replace("{count}", str(guild.member_count)) \
                 .replace("{server}", guild.name)
        embed = discord.Embed(description=msg, color=cfg.get("color", 0x5865F2))
        embed.set_author(name=member.name, icon_url=member.display_avatar.url)
        await channel.send(embed=embed)
    
    # Auto-Rolle
    if cfg.get("auto_role_id"):
        role = guild.get_role(cfg["auto_role_id"])
        if role:
            await member.add_roles(role)
    
    # DM-Willkommen
    if cfg.get("dm_enabled") and cfg.get("dm_message"):
        try:
            dm_msg = cfg["dm_message"].replace("{user}", member.name).replace("{server}", guild.name)
            await member.send(dm_msg)
        except:
            pass

@bot.event
async def on_member_remove(member: discord.Member):
    guild = member.guild
    cfg = welcome_config.get(guild.id)
    channel_id = cfg.get("goodbye_channel_id") if cfg else None
    channel = guild.get_channel(channel_id) if channel_id else None
    if channel:
        await channel.send(f"👋 **{member.name}** hat den Server verlassen. Tschüss!")

@bot.event
async def on_message(message: discord.Message):
    if message.author.bot:
        return
    
    # Auto-Responder
    guild_responses = auto_responses.get(message.guild.id if message.guild else 0, [])
    content_lower = message.content.lower()
    for ar in guild_responses:
        trigger = ar["trigger"].lower()
        t = ar.get("type", "contains")
        matched = False
        if t == "exact" and content_lower == trigger:
            matched = True
        elif t == "contains" and trigger in content_lower:
            matched = True
        elif t == "startsWith" and content_lower.startswith(trigger):
            matched = True
        if matched:
            await message.channel.send(ar["response"])
            break
    
    await bot.process_commands(message)

@bot.event
async def on_message_delete(message: discord.Message):
    if not message.guild or message.author.bot:
        return
    ch_id = log_channels.get(message.guild.id)
    if ch_id:
        ch = message.guild.get_channel(ch_id)
        if ch:
            embed = discord.Embed(title="🗑️ Nachricht gelöscht", color=0xED4245,
                                   timestamp=datetime.datetime.utcnow())
            embed.add_field(name="User", value=message.author.mention)
            embed.add_field(name="Channel", value=message.channel.mention)
            embed.add_field(name="Inhalt", value=message.content[:1024] or "*(kein Text)*", inline=False)
            await ch.send(embed=embed)

@bot.event
async def on_message_edit(before: discord.Message, after: discord.Message):
    if not before.guild or before.author.bot or before.content == after.content:
        return
    ch_id = log_channels.get(before.guild.id)
    if ch_id:
        ch = before.guild.get_channel(ch_id)
        if ch:
            embed = discord.Embed(title="✏️ Nachricht bearbeitet", color=0xFEE75C,
                                   timestamp=datetime.datetime.utcnow())
            embed.add_field(name="User", value=before.author.mention)
            embed.add_field(name="Channel", value=before.channel.mention)
            embed.add_field(name="Vorher", value=before.content[:512] or "–", inline=False)
            embed.add_field(name="Nachher", value=after.content[:512] or "–", inline=False)
            await ch.send(embed=embed)

@bot.event
async def on_member_ban(guild, user):
    ch_id = log_channels.get(guild.id)
    if ch_id:
        ch = guild.get_channel(ch_id)
        if ch:
            embed = discord.Embed(title="🔨 User gebannt", color=0xED4245,
                                   timestamp=datetime.datetime.utcnow())
            embed.add_field(name="User", value=str(user))
            await ch.send(embed=embed)

@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("❌ Du hast keine Berechtigung für diesen Befehl!")
    elif isinstance(error, commands.MissingRequiredArgument):
        await ctx.send(f"❌ Fehlende Argumente! Benutze `{PREFIX}help {ctx.command}`")
    elif isinstance(error, commands.MemberNotFound):
        await ctx.send("❌ User nicht gefunden!")
    elif isinstance(error, commands.CommandOnCooldown):
        await ctx.send(f"⏳ Cooldown! Warte noch {error.retry_after:.1f} Sekunden.")

# ════════════════════════════════════════════════════════════════
#  HILFE
# ════════════════════════════════════════════════════════════════

@bot.command(name="help")
async def help_cmd(ctx, category: str = None):
    """Zeigt alle Befehle"""
    if category is None:
        embed = discord.Embed(title="⚡ BotForge – Hilfe", color=0x5865F2,
                               description=f"Präfix: `{PREFIX}` | Nutze `{PREFIX}help <kategorie>` für mehr Info")
        embed.add_field(name="🛡️ Moderation", value=f"`{PREFIX}help mod`", inline=True)
        embed.add_field(name="👋 Willkommen", value=f"`{PREFIX}help welcome`", inline=True)
        embed.add_field(name="🎵 Musik", value=f"`{PREFIX}help music`", inline=True)
        embed.add_field(name="🎲 Fun", value=f"`{PREFIX}help fun`", inline=True)
        embed.add_field(name="🔧 Utility", value=f"`{PREFIX}help utility`", inline=True)
        embed.add_field(name="⚙️ Admin", value=f"`{PREFIX}help admin`", inline=True)
        embed.set_footer(text="BotForge Bot")
        await ctx.send(embed=embed)

    elif category.lower() == "mod":
        embed = discord.Embed(title="🛡️ Moderation Befehle", color=0xED4245)
        cmds = [
            ("!ban <user> [grund]", "Bannt einen User"),
            ("!kick <user> [grund]", "Kickt einen User"),
            ("!mute <user> <minuten> [grund]", "Mutet einen User"),
            ("!unmute <user>", "Unmutet einen User"),
            ("!warn <user> <grund>", "Verwarnt einen User"),
            ("!warns <user>", "Zeigt Verwarnungen"),
            ("!clearwarns <user>", "Löscht alle Verwarnungen"),
            ("!purge <anzahl>", "Löscht Nachrichten"),
            ("!slowmode <sekunden>", "Setzt Slowmode"),
            ("!lock", "Sperrt den Channel"),
            ("!unlock", "Entsperrt den Channel"),
        ]
        embed.description = "\n".join([f"`{c[0]}` — {c[1]}" for c in cmds])
        await ctx.send(embed=embed)

    elif category.lower() == "fun":
        embed = discord.Embed(title="🎲 Fun Befehle", color=0x57F287)
        cmds = [
            ("!coinflip", "Kopf oder Zahl"),
            ("!dice [seiten]", "Würfeln"),
            ("!8ball <frage>", "Magische 8-Ball Antwort"),
            ("!meme", "Zufälliges Meme"),
            ("!poll <frage>", "Erstellt eine Umfrage"),
            ("!giveaway <zeit> <preis>", "Startet ein Giveaway"),
        ]
        embed.description = "\n".join([f"`{c[0]}` — {c[1]}" for c in cmds])
        await ctx.send(embed=embed)

    elif category.lower() == "utility":
        embed = discord.Embed(title="🔧 Utility Befehle", color=0xFEE75C)
        cmds = [
            ("!userinfo [user]", "Infos über einen User"),
            ("!serverinfo", "Infos über den Server"),
            ("!avatar [user]", "Avatar eines Users"),
            ("!ping", "Bot-Latenz anzeigen"),
            ("!botinfo", "Bot-Informationen"),
        ]
        embed.description = "\n".join([f"`{c[0]}` — {c[1]}" for c in cmds])
        await ctx.send(embed=embed)

# ════════════════════════════════════════════════════════════════
#  MODERATION
# ════════════════════════════════════════════════════════════════

@bot.command()
@commands.has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member, *, reason="Kein Grund angegeben"):
    """Bannt einen User"""
    await member.ban(reason=f"{reason} | Von: {ctx.author}")
    embed = discord.Embed(title="🔨 User gebannt", color=0xED4245)
    embed.add_field(name="User", value=member.mention)
    embed.add_field(name="Grund", value=reason)
    embed.add_field(name="Moderator", value=ctx.author.mention)
    await ctx.send(embed=embed)

@bot.command()
@commands.has_permissions(kick_members=True)
async def kick(ctx, member: discord.Member, *, reason="Kein Grund angegeben"):
    """Kickt einen User"""
    await member.kick(reason=f"{reason} | Von: {ctx.author}")
    embed = discord.Embed(title="👢 User gekickt", color=0xFEE75C)
    embed.add_field(name="User", value=member.mention)
    embed.add_field(name="Grund", value=reason)
    await ctx.send(embed=embed)

@bot.command()
@commands.has_permissions(moderate_members=True)
async def mute(ctx, member: discord.Member, minutes: int = 10, *, reason="Kein Grund"):
    """Mutet einen User"""
    duration = datetime.timedelta(minutes=minutes)
    await member.timeout(duration, reason=reason)
    embed = discord.Embed(title="🔇 User gemutet", color=0xFEE75C)
    embed.add_field(name="User", value=member.mention)
    embed.add_field(name="Dauer", value=f"{minutes} Minuten")
    embed.add_field(name="Grund", value=reason)
    await ctx.send(embed=embed)

@bot.command()
@commands.has_permissions(moderate_members=True)
async def unmute(ctx, member: discord.Member):
    """Unmutet einen User"""
    await member.timeout(None)
    await ctx.send(f"✅ **{member.name}** wurde ungemutet.")

@bot.command()
@commands.has_permissions(kick_members=True)
async def warn(ctx, member: discord.Member, *, reason: str):
    """Verwarnt einen User"""
    gid = str(ctx.guild.id)
    uid = str(member.id)
    if gid not in warns_db:
        warns_db[gid] = {}
    if uid not in warns_db[gid]:
        warns_db[gid][uid] = []
    
    warns_db[gid][uid].append({"reason": reason, "by": str(ctx.author), "time": str(datetime.datetime.utcnow())})
    count = len(warns_db[gid][uid])
    
    embed = discord.Embed(title="⚠️ Verwarnung", color=0xFEE75C)
    embed.add_field(name="User", value=member.mention)
    embed.add_field(name="Grund", value=reason)
    embed.add_field(name="Verwarnungen gesamt", value=f"{count}/3")
    await ctx.send(embed=embed)
    
    # Auto-Strafe bei 3 Verwarnungen
    if count >= 3:
        await member.timeout(datetime.timedelta(minutes=30), reason="3 Verwarnungen erreicht")
        await ctx.send(f"🔇 **{member.name}** wurde automatisch für 30 Minuten gemutet (3 Verwarnungen).")

@bot.command()
async def warns(ctx, member: discord.Member = None):
    """Zeigt Verwarnungen eines Users"""
    member = member or ctx.author
    gid = str(ctx.guild.id)
    uid = str(member.id)
    user_warns = warns_db.get(gid, {}).get(uid, [])
    
    embed = discord.Embed(title=f"⚠️ Verwarnungen von {member.name}", color=0xFEE75C)
    if not user_warns:
        embed.description = "Keine Verwarnungen! ✅"
    else:
        for i, w in enumerate(user_warns, 1):
            embed.add_field(name=f"#{i}", value=f"**Grund:** {w['reason']}\n**Von:** {w['by']}", inline=False)
    await ctx.send(embed=embed)

@bot.command()
@commands.has_permissions(kick_members=True)
async def clearwarns(ctx, member: discord.Member):
    """Löscht alle Verwarnungen"""
    gid = str(ctx.guild.id)
    uid = str(member.id)
    if gid in warns_db and uid in warns_db[gid]:
        warns_db[gid][uid] = []
    await ctx.send(f"✅ Alle Verwarnungen von **{member.name}** wurden gelöscht.")

@bot.command()
@commands.has_permissions(manage_messages=True)
async def purge(ctx, amount: int):
    """Löscht Nachrichten"""
    if amount < 1 or amount > 100:
        return await ctx.send("❌ Zwischen 1 und 100 Nachrichten!")
    deleted = await ctx.channel.purge(limit=amount + 1)
    msg = await ctx.send(f"✅ **{len(deleted)-1}** Nachrichten gelöscht.")
    await asyncio.sleep(3)
    await msg.delete()

@bot.command()
@commands.has_permissions(manage_channels=True)
async def slowmode(ctx, seconds: int = 0):
    """Setzt Slowmode"""
    await ctx.channel.edit(slowmode_delay=seconds)
    if seconds == 0:
        await ctx.send("✅ Slowmode deaktiviert.")
    else:
        await ctx.send(f"✅ Slowmode auf **{seconds}** Sekunden gesetzt.")

@bot.command()
@commands.has_permissions(manage_channels=True)
async def lock(ctx):
    """Sperrt den Channel"""
    overwrite = ctx.channel.overwrites_for(ctx.guild.default_role)
    overwrite.send_messages = False
    await ctx.channel.set_permissions(ctx.guild.default_role, overwrite=overwrite)
    await ctx.send("🔒 Channel **gesperrt**.")

@bot.command()
@commands.has_permissions(manage_channels=True)
async def unlock(ctx):
    """Entsperrt den Channel"""
    overwrite = ctx.channel.overwrites_for(ctx.guild.default_role)
    overwrite.send_messages = True
    await ctx.channel.set_permissions(ctx.guild.default_role, overwrite=overwrite)
    await ctx.send("🔓 Channel **entsperrt**.")

@bot.command()
@commands.has_permissions(manage_roles=True)
async def addrole(ctx, member: discord.Member, role: discord.Role):
    """Gibt einem User eine Rolle"""
    await member.add_roles(role)
    await ctx.send(f"✅ **{role.name}** an **{member.name}** vergeben.")

@bot.command()
@commands.has_permissions(manage_roles=True)
async def removerole(ctx, member: discord.Member, role: discord.Role):
    """Entfernt eine Rolle von einem User"""
    await member.remove_roles(role)
    await ctx.send(f"✅ **{role.name}** von **{member.name}** entfernt.")

# ════════════════════════════════════════════════════════════════
#  UTILITY
# ════════════════════════════════════════════════════════════════

@bot.command()
async def ping(ctx):
    """Zeigt Bot-Latenz"""
    latency = round(bot.latency * 1000)
    embed = discord.Embed(title="🏓 Pong!", color=0x57F287)
    embed.add_field(name="Latenz", value=f"{latency}ms")
    await ctx.send(embed=embed)

@bot.command()
async def userinfo(ctx, member: discord.Member = None):
    """Infos über einen User"""
    member = member or ctx.author
    roles = [r.mention for r in member.roles if r != ctx.guild.default_role]
    embed = discord.Embed(title=f"👤 {member.name}", color=member.color)
    embed.set_thumbnail(url=member.display_avatar.url)
    embed.add_field(name="ID", value=member.id)
    embed.add_field(name="Beigetreten", value=member.joined_at.strftime("%d.%m.%Y") if member.joined_at else "–")
    embed.add_field(name="Account erstellt", value=member.created_at.strftime("%d.%m.%Y"))
    embed.add_field(name=f"Rollen ({len(roles)})", value=", ".join(roles) or "Keine", inline=False)
    await ctx.send(embed=embed)

@bot.command()
async def serverinfo(ctx):
    """Infos über den Server"""
    guild = ctx.guild
    embed = discord.Embed(title=f"🖥️ {guild.name}", color=0x5865F2)
    if guild.icon:
        embed.set_thumbnail(url=guild.icon.url)
    embed.add_field(name="ID", value=guild.id)
    embed.add_field(name="Owner", value=guild.owner.mention if guild.owner else "–")
    embed.add_field(name="Mitglieder", value=guild.member_count)
    embed.add_field(name="Channels", value=len(guild.channels))
    embed.add_field(name="Rollen", value=len(guild.roles))
    embed.add_field(name="Erstellt", value=guild.created_at.strftime("%d.%m.%Y"))
    await ctx.send(embed=embed)

@bot.command()
async def avatar(ctx, member: discord.Member = None):
    """Zeigt den Avatar eines Users"""
    member = member or ctx.author
    embed = discord.Embed(title=f"🖼️ Avatar von {member.name}", color=0x5865F2)
    embed.set_image(url=member.display_avatar.url)
    await ctx.send(embed=embed)

@bot.command()
async def botinfo(ctx):
    """Infos über den Bot"""
    embed = discord.Embed(title="⚡ BotForge Bot", color=0x5865F2)
    embed.add_field(name="Server", value=len(bot.guilds))
    embed.add_field(name="Latenz", value=f"{round(bot.latency*1000)}ms")
    embed.add_field(name="Bibliothek", value="discord.py 2.x")
    embed.add_field(name="Präfix", value=PREFIX)
    await ctx.send(embed=embed)

# ════════════════════════════════════════════════════════════════
#  FUN
# ════════════════════════════════════════════════════════════════

@bot.command()
async def coinflip(ctx):
    """Kopf oder Zahl"""
    result = random.choice(["🪙 **Kopf!**", "🪙 **Zahl!**"])
    await ctx.send(result)

@bot.command()
async def dice(ctx, sides: int = 6):
    """Würfeln"""
    if sides < 2 or sides > 100:
        return await ctx.send("❌ Zwischen 2 und 100 Seiten!")
    result = random.randint(1, sides)
    await ctx.send(f"🎲 Du hast eine **{result}** (W{sides}) gewürfelt!")

@bot.command(name="8ball")
async def eightball(ctx, *, question: str):
    """Magische 8-Ball Antwort"""
    answers = [
        "✅ Auf jeden Fall!", "✅ Ja, sicher!", "✅ Sieht gut aus!",
        "✅ Ja!", "✅ Sehr wahrscheinlich.",
        "🟡 Schwer zu sagen...", "🟡 Probier es nochmal.",
        "🟡 Im Moment nicht.", "🟡 Nicht sicher.",
        "❌ Nein.", "❌ Eher nicht.", "❌ Vergiss es!",
        "❌ Sieht nicht gut aus.", "❌ Auf keinen Fall!",
    ]
    embed = discord.Embed(title="🎱 Magic 8-Ball", color=0x5865F2)
    embed.add_field(name="Frage", value=question, inline=False)
    embed.add_field(name="Antwort", value=random.choice(answers), inline=False)
    await ctx.send(embed=embed)

@bot.command()
async def poll(ctx, *, question: str):
    """Erstellt eine Umfrage"""
    embed = discord.Embed(title="📊 Umfrage", description=question, color=0x5865F2)
    embed.set_footer(text=f"Erstellt von {ctx.author.name}")
    msg = await ctx.send(embed=embed)
    await msg.add_reaction("✅")
    await msg.add_reaction("❌")

@bot.command()
@commands.cooldown(1, 5, commands.BucketType.user)
async def meme(ctx):
    """Zufälliges Meme von Reddit"""
    async with aiohttp.ClientSession() as session:
        async with session.get("https://meme-api.com/gimme") as r:
            if r.status == 200:
                data = await r.json()
                embed = discord.Embed(title=data.get("title", "Meme"), color=0x5865F2)
                embed.set_image(url=data.get("url", ""))
                embed.set_footer(text=f"👍 {data.get('ups', 0)} | r/{data.get('subreddit', '')}")
                await ctx.send(embed=embed)
            else:
                await ctx.send("❌ Konnte kein Meme laden.")

@bot.command()
@commands.has_permissions(administrator=True)
async def giveaway(ctx, duration: int, *, prize: str):
    """Startet ein Giveaway (Dauer in Minuten)"""
    end_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=duration)
    embed = discord.Embed(title="🎉 GIVEAWAY!", color=0xFEE75C)
    embed.add_field(name="Preis", value=prize, inline=False)
    embed.add_field(name="Dauer", value=f"{duration} Minuten")
    embed.add_field(name="Endet um", value=end_time.strftime("%H:%M UTC"))
    embed.set_footer(text="Reagiere mit 🎉 um teilzunehmen!")
    msg = await ctx.send(embed=embed)
    await msg.add_reaction("🎉")
    
    await asyncio.sleep(duration * 60)
    
    msg = await ctx.channel.fetch_message(msg.id)
    reaction = discord.utils.get(msg.reactions, emoji="🎉")
    if reaction and reaction.count > 1:
        users = [u async for u in reaction.users() if not u.bot]
        if users:
            winner = random.choice(users)
            await ctx.send(f"🎊 **{winner.mention}** hat das Giveaway gewonnen!\n**Preis:** {prize}")
        else:
            await ctx.send("❌ Keine Teilnehmer!")

# ════════════════════════════════════════════════════════════════
#  ADMIN / SETUP
# ════════════════════════════════════════════════════════════════

@bot.command()
@commands.has_permissions(administrator=True)
async def setlog(ctx, channel: discord.TextChannel):
    """Setzt den Log-Kanal"""
    log_channels[ctx.guild.id] = channel.id
    await ctx.send(f"✅ Log-Kanal auf {channel.mention} gesetzt.")

@bot.command()
@commands.has_permissions(administrator=True)
async def setwelcome(ctx, channel: discord.TextChannel, *, message: str = None):
    """Konfiguriert den Willkommens-Kanal"""
    if ctx.guild.id not in welcome_config:
        welcome_config[ctx.guild.id] = {}
    welcome_config[ctx.guild.id]["channel_id"] = channel.id
    if message:
        welcome_config[ctx.guild.id]["message"] = message
    await ctx.send(f"✅ Willkommens-Kanal auf {channel.mention} gesetzt.\nVariablen: `{{user}}`, `{{name}}`, `{{count}}`, `{{server}}`")

@bot.command()
@commands.has_permissions(administrator=True)
async def setautorole(ctx, role: discord.Role):
    """Setzt die Auto-Rolle beim Beitreten"""
    if ctx.guild.id not in welcome_config:
        welcome_config[ctx.guild.id] = {}
    welcome_config[ctx.guild.id]["auto_role_id"] = role.id
    await ctx.send(f"✅ Auto-Rolle auf **{role.name}** gesetzt.")

@bot.command()
@commands.has_permissions(administrator=True)
async def addresponse(ctx, trigger: str, *, response: str):
    """Fügt einen Auto-Responder hinzu"""
    gid = ctx.guild.id
    if gid not in auto_responses:
        auto_responses[gid] = []
    auto_responses[gid].append({"trigger": trigger, "response": response, "type": "contains"})
    await ctx.send(f"✅ Auto-Responder hinzugefügt:\n**Trigger:** `{trigger}`\n**Antwort:** {response}")

@bot.command()
@commands.has_permissions(administrator=True)
async def listresponses(ctx):
    """Zeigt alle Auto-Responder"""
    responses = auto_responses.get(ctx.guild.id, [])
    if not responses:
        return await ctx.send("Keine Auto-Responder konfiguriert.")
    embed = discord.Embed(title="⚡ Auto-Responder", color=0x5865F2)
    for i, r in enumerate(responses):
        embed.add_field(name=f"#{i+1} `{r['trigger']}`", value=r["response"], inline=False)
    await ctx.send(embed=embed)

# ════════════════════════════════════════════════════════════════
#  START
# ════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    print("⚡ BotForge startet...")
    bot.run(TOKEN)
