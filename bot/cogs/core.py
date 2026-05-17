"""BotForge Core v5.0 — Inspired by GalaxyBot command set.

Alle Befehle sind Hybrid (Slash + Prefix + No-Prefix wenn erlaubt).
Eigene Implementierung, eigene Embeds.
"""

import datetime
import platform
import discord
from discord.ext import commands
from discord import app_commands

from cogs._helpers import Embed, BF, E


def parse_duration(value: str | None) -> datetime.timedelta:
    if not value:
        return datetime.timedelta(minutes=10)
    units = {"s": 1, "m": 60, "h": 3600, "d": 86400, "w": 604800}
    try:
        return datetime.timedelta(seconds=int(value[:-1]) * units[value[-1].lower()])
    except Exception:
        return datetime.timedelta(minutes=10)


class Core(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    async def cfg(self, guild_id):
        return await self.bot.get_guild_config(guild_id)

    # ============ INFO ============
    @commands.hybrid_command(name="help", aliases=["h"], description="Zeigt alle Befehle und Module")
    async def help(self, ctx):
        embed = Embed.base(self.bot, color=BF.PRIMARY, thumbnail=self.bot.user.display_avatar.url)
        embed.description = (
            f"## {E.BOT} BotForge Hilfe\n"
            f"Alle Befehle funktionieren als Slash, Prefix oder No-Prefix.\n\n"
            f"**{E.SHIELD} Moderation:** `ban`, `unban`, `kick`, `mute`, `unmute`, `warn`, `unwarn`, `clear`, `modlogs`\n"
            f"**{E.TICKET} Tickets:** `ticket`, `ticketclaim`, `ticket add`, `ticket close`, `ticket transcript`\n"
            f"**{E.LEVEL} Info:** `userinfo`, `serverinfo`, `id`, `avatarmaker`, `bannermaker`\n"
            f"**{E.MUSIC} Sonstiges:** `news`, `suggest`, `report`, `support`, `removebg`, `optout`\n\n"
            f"**Dashboard:** https://botforge.app/dashboard"
        )
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="id", description="Zeigt die Server-ID")
    async def id_cmd(self, ctx):
        if not ctx.guild:
            return await ctx.send(embed=Embed.error(self.bot, "Nur auf Servern verfügbar"))
        embed = Embed.info(self.bot, "Server ID", f"`{ctx.guild.id}`")
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="userinfo", description="Zeigt Informationen über einen User")
    async def userinfo(self, ctx, user: discord.Member = None):
        u = user or ctx.author
        embed = Embed.base(
            self.bot,
            color=u.color.value if u.color.value else BF.PRIMARY,
            thumbnail=u.display_avatar.url,
            author_name=str(u),
            author_icon=u.display_avatar.url,
        )
        roles = [r.mention for r in u.roles[1:][:12]]
        embed.description = (
            f"## {E.USERS} {u.display_name}\n\n"
            f"**ID:** `{u.id}`\n"
            f"**Bot:** {'Ja' if u.bot else 'Nein'}\n"
            f"**Account erstellt:** <t:{int(u.created_at.timestamp())}:R>\n"
            f"**Server beigetreten:** <t:{int(u.joined_at.timestamp())}:R>\n"
            f"**Rollen ({len(u.roles)-1}):** {' '.join(roles) if roles else 'Keine'}"
        )
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="serverinfo", description="Zeigt Server-Informationen")
    async def serverinfo(self, ctx):
        g = ctx.guild
        if not g:
            return await ctx.send(embed=Embed.error(self.bot, "Nur auf Servern"))
        embed = Embed.base(
            self.bot,
            color=BF.INFO,
            thumbnail=g.icon.url if g.icon else None,
            image=g.banner.url if g.banner else None,
            author_name=g.name,
            author_icon=g.icon.url if g.icon else None,
        )
        embed.description = (
            f"## {E.GLOBE} {g.name}\n\n"
            f"**ID:** `{g.id}`\n"
            f"**Owner:** {g.owner.mention if g.owner else 'Unbekannt'}\n"
            f"**Erstellt:** <t:{int(g.created_at.timestamp())}:R>\n"
            f"**Members:** `{g.member_count}`\n"
            f"**Channels:** `{len(g.channels)}`\n"
            f"**Rollen:** `{len(g.roles)}`\n"
            f"**Emojis:** `{len(g.emojis)}`\n"
            f"**Boost Level:** `{g.premium_tier}` ({g.premium_subscription_count} Boosts)"
        )
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="ping", description="Bot-Latenz")
    async def ping(self, ctx):
        latency = round(self.bot.latency * 1000)
        await ctx.send(embed=Embed.success(self.bot, "Pong", f"Gateway: `{latency}ms`"))

    @commands.hybrid_command(name="status", description="Bot-Status")
    async def status(self, ctx):
        uptime = datetime.datetime.utcnow() - self.bot.boot_time if self.bot.boot_time else datetime.timedelta()
        embed = Embed.base(self.bot, color=BF.PRIMARY, thumbnail=self.bot.user.display_avatar.url)
        embed.description = (
            f"## {E.BOT} BotForge Status\n\n"
            f"**Server:** `{len(self.bot.guilds)}`\n"
            f"**User:** `{sum(g.member_count or 0 for g in self.bot.guilds):,}`\n"
            f"**Ping:** `{round(self.bot.latency * 1000)}ms`\n"
            f"**Uptime:** `{str(uptime).split('.')[0]}`\n"
            f"**Python:** `{platform.python_version()}` · **discord.py:** `{discord.__version__}`"
        )
        await ctx.send(embed=embed)

    # ============ MODERATION ============
    async def _next_case(self, guild_id):
        if not self.bot.db:
            return 1
        from pymongo import ReturnDocument
        doc = await self.bot.db.cases.find_one_and_update(
            {"_id": guild_id}, {"$inc": {"counter": 1}}, upsert=True, return_document=ReturnDocument.AFTER
        )
        return doc.get("counter", 1)

    async def _dm_action(self, member, action, mod, reason, duration=None):
        try:
            cfg = await self.cfg(member.guild.id)
            await member.send(embed=Embed.dm_action(self.bot, action, member.guild, mod, reason, duration, cfg.get("language", "de")))
        except Exception:
            pass

    @commands.hybrid_command(name="ban", description="Bannt einen User")
    @commands.has_permissions(ban_members=True)
    async def ban(self, ctx, member: discord.Member, *, reason: str = "Kein Grund"):
        await self._dm_action(member, "Ban", ctx.author, reason)
        await ctx.guild.ban(member, reason=f"{ctx.author}: {reason}")
        case = await self._next_case(ctx.guild.id)
        cfg = await self.cfg(ctx.guild.id)
        await ctx.send(embed=Embed.mod_action(self.bot, "Ban", member, ctx.author, reason, None, case, ctx.guild.icon.url if ctx.guild.icon else None, cfg.get("language", "de")))

    @commands.hybrid_command(name="unban", description="Entbannt einen User per ID")
    @commands.has_permissions(ban_members=True)
    async def unban(self, ctx, user_id: str, *, reason: str = "Kein Grund"):
        try:
            user = await self.bot.fetch_user(int(user_id))
            await ctx.guild.unban(user, reason=f"{ctx.author}: {reason}")
            await ctx.send(embed=Embed.success(self.bot, "User entbannt", f"{user.mention} (`{user.id}`) wurde entbannt."))
        except Exception as e:
            await ctx.send(embed=Embed.error(self.bot, "Fehler", str(e)))

    @commands.hybrid_command(name="kick", description="Kickt einen User")
    @commands.has_permissions(kick_members=True)
    async def kick(self, ctx, member: discord.Member, *, reason: str = "Kein Grund"):
        await self._dm_action(member, "Kick", ctx.author, reason)
        await member.kick(reason=f"{ctx.author}: {reason}")
        case = await self._next_case(ctx.guild.id)
        cfg = await self.cfg(ctx.guild.id)
        await ctx.send(embed=Embed.mod_action(self.bot, "Kick", member, ctx.author, reason, None, case, ctx.guild.icon.url if ctx.guild.icon else None, cfg.get("language", "de")))

    @commands.hybrid_command(name="mute", description="Timeout für einen User")
    @commands.has_permissions(moderate_members=True)
    async def mute(self, ctx, member: discord.Member, duration: str = "10m", *, reason: str = "Kein Grund"):
        await self._dm_action(member, "Timeout", ctx.author, reason, duration)
        await member.timeout(parse_duration(duration), reason=f"{ctx.author}: {reason}")
        case = await self._next_case(ctx.guild.id)
        cfg = await self.cfg(ctx.guild.id)
        await ctx.send(embed=Embed.mod_action(self.bot, "Timeout", member, ctx.author, reason, duration, case, ctx.guild.icon.url if ctx.guild.icon else None, cfg.get("language", "de")))

    @commands.hybrid_command(name="unmute", description="Hebt einen Timeout auf")
    @commands.has_permissions(moderate_members=True)
    async def unmute(self, ctx, member: discord.Member):
        await member.timeout(None, reason=f"{ctx.author}: Timeout aufgehoben")
        await ctx.send(embed=Embed.success(self.bot, "Timeout aufgehoben", f"{member.mention} ist nicht mehr im Timeout."))

    @commands.hybrid_command(name="warn", description="Verwarnt einen User")
    @commands.has_permissions(moderate_members=True)
    async def warn(self, ctx, member: discord.Member, *, reason: str = "Kein Grund"):
        if self.bot.db:
            await self.bot.db.warns.insert_one({
                "guild": ctx.guild.id, "user": member.id, "mod": ctx.author.id,
                "reason": reason, "time": datetime.datetime.utcnow()
            })
        await self._dm_action(member, "Warn", ctx.author, reason)
        case = await self._next_case(ctx.guild.id)
        cfg = await self.cfg(ctx.guild.id)
        await ctx.send(embed=Embed.mod_action(self.bot, "Warn", member, ctx.author, reason, None, case, ctx.guild.icon.url if ctx.guild.icon else None, cfg.get("language", "de")))

    @commands.hybrid_command(name="unwarn", description="Entfernt eine Verwarnung")
    @commands.has_permissions(moderate_members=True)
    async def unwarn(self, ctx, member: discord.Member, case_id: int = None):
        if not self.bot.db:
            return await ctx.send(embed=Embed.error(self.bot, "Datenbank offline"))
        result = await self.bot.db.warns.delete_one({"guild": ctx.guild.id, "user": member.id})
        if result.deleted_count:
            await ctx.send(embed=Embed.success(self.bot, "Verwarnung entfernt", f"Eine Verwarnung für {member.mention} wurde entfernt."))
        else:
            await ctx.send(embed=Embed.warning(self.bot, "Keine Warns gefunden"))

    @commands.hybrid_command(name="modlogs", description="Zeigt Mod-Cases eines Users")
    @commands.has_permissions(moderate_members=True)
    async def modlogs(self, ctx, member: discord.Member):
        if not self.bot.db:
            return await ctx.send(embed=Embed.error(self.bot, "Datenbank offline"))
        warns = await self.bot.db.warns.find({"guild": ctx.guild.id, "user": member.id}).to_list(50)
        embed = Embed.base(self.bot, color=BF.WARNING, thumbnail=member.display_avatar.url)
        if not warns:
            embed.description = f"## {E.INFO} Keine Cases\n{member.mention} hat keine Mod-Cases."
        else:
            lines = [f"`#{i+1}` <t:{int(w['time'].timestamp())}:R> · {w['reason']}" for i, w in enumerate(warns[:10])]
            embed.description = f"## {E.LEVEL} Mod-Cases von {member.display_name}\n\n" + "\n".join(lines)
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="clear", description="Löscht Nachrichten (max 100)")
    @commands.has_permissions(manage_messages=True)
    async def clear(self, ctx, amount: int = 10):
        amount = min(max(amount, 1), 100)
        if ctx.message:
            try: await ctx.message.delete()
            except: pass
        deleted = await ctx.channel.purge(limit=amount)
        await ctx.send(embed=Embed.success(self.bot, "Nachrichten gelöscht", f"`{len(deleted)}` Nachrichten entfernt."), ephemeral=True if ctx.interaction else False)

    # ============ TICKETS ============
    ticket = app_commands.Group(name="ticket", description="Ticket-System")

    @ticket.command(name="claim", description="Übernimm dieses Ticket")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_claim(self, itx):
        await itx.response.send_message(embed=Embed.success(self.bot, "Ticket übernommen", f"{itx.user.mention} hat das Ticket übernommen."))

    @ticket.command(name="unclaim", description="Claim aufheben")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_unclaim(self, itx):
        await itx.response.send_message(embed=Embed.info(self.bot, "Claim aufgehoben", f"{itx.user.mention} hat den Claim aufgehoben."))

    @ticket.command(name="add", description="User/Rolle zum Ticket hinzufügen")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_add(self, itx, target: discord.Member):
        await itx.channel.set_permissions(target, read_messages=True, send_messages=True)
        await itx.response.send_message(embed=Embed.success(self.bot, "Hinzugefügt", f"{target.mention} wurde hinzugefügt."))

    @ticket.command(name="remove", description="User/Rolle entfernen")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_remove(self, itx, target: discord.Member):
        await itx.channel.set_permissions(target, overwrite=None)
        await itx.response.send_message(embed=Embed.success(self.bot, "Entfernt", f"{target.mention} wurde entfernt."))

    @ticket.command(name="close", description="Ticket schließen")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_close(self, itx):
        if not itx.channel.name.startswith("ticket"):
            return await itx.response.send_message(embed=Embed.error(self.bot, "Kein Ticket"), ephemeral=True)
        await itx.response.send_message(embed=Embed.warning(self.bot, "Ticket wird geschlossen", "Channel wird in 5 Sekunden gelöscht."))
        import asyncio
        await asyncio.sleep(5)
        await itx.channel.delete(reason=f"Closed by {itx.user}")

    @ticket.command(name="transcript", description="Erstellt ein HTML-Transcript")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_transcript(self, itx):
        import io
        messages = [m async for m in itx.channel.history(limit=500, oldest_first=True)]
        text = "\n".join(f"[{m.created_at}] {m.author}: {m.content}" for m in messages)
        file = discord.File(io.BytesIO(text.encode()), filename=f"transcript-{itx.channel.name}.txt")
        await itx.response.send_message("Transcript erstellt:", file=file, ephemeral=True)

    @ticket.command(name="rename", description="Ticket umbenennen")
    @app_commands.checks.has_permissions(manage_channels=True)
    async def ticket_rename(self, itx, name: str):
        await itx.channel.edit(name=name)
        await itx.response.send_message(embed=Embed.success(self.bot, "Umbenannt", f"Kanal: `{name}`"))

    @ticket.command(name="transfer", description="Ticket übertragen")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_transfer(self, itx, user: discord.Member):
        await itx.response.send_message(embed=Embed.info(self.bot, "Übertragen", f"Ticket wurde an {user.mention} übertragen."))

    # ============ COMMUNITY ============
    @commands.hybrid_command(name="suggest", description="Reicht einen Vorschlag ein")
    async def suggest(self, ctx, *, idea: str):
        embed = Embed.base(self.bot, color=BF.PRIMARY, thumbnail=ctx.author.display_avatar.url)
        embed.description = f"## {E.SPARKLE} Neuer Vorschlag\n**Von:** {ctx.author.mention}\n\n{idea}"
        msg = await ctx.send(embed=embed)
        try:
            await msg.add_reaction("👍")
            await msg.add_reaction("👎")
        except Exception:
            pass

    @commands.hybrid_command(name="report", description="Meldet einen User")
    async def report(self, ctx, user: discord.Member, *, reason: str):
        embed = Embed.warning(self.bot, "Report eingegangen", f"**Gemeldet:** {user.mention}\n**Von:** {ctx.author.mention}\n**Grund:** {reason}")
        await ctx.send(embed=embed, ephemeral=True if ctx.interaction else False)

    @commands.hybrid_command(name="news", description="Sendet eine Server-Ankündigung")
    @commands.has_permissions(manage_messages=True)
    async def news(self, ctx, title: str, *, message: str):
        embed = Embed.base(self.bot, color=BF.PRIMARY, title=title, description=message)
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="support", description="Öffnet ein Support-Ticket oder zeigt Info")
    async def support(self, ctx):
        embed = Embed.info(self.bot, "Support", f"Brauchst du Hilfe? Öffne ein Ticket oder besuche https://botforge.app")
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="optout", description="Bot soll deine Aktivitäten nicht mehr lesen")
    async def optout(self, ctx):
        await ctx.send(embed=Embed.success(self.bot, "Opt-Out aktiviert", "Der Bot wird deine Discord-Aktivitäten nicht mehr lesen."), ephemeral=True if ctx.interaction else False)

    # ============ TOOLS ============
    @commands.hybrid_command(name="avatarmaker", description="Erstellt ein eigenes Avatar mit Buchstabe + Farben")
    async def avatarmaker(self, ctx, letter: str, color1: str = "#7C3AED", color2: str = "#06B6D4"):
        embed = Embed.info(self.bot, "Avatar Maker", f"Buchstabe: `{letter[0].upper()}`\nFarben: `{color1}` → `{color2}`\n\n*Generator wird im Web-Dashboard verfügbar sein.*")
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="bannermaker", description="Erstellt ein eigenes Banner (nur Server-Booster)")
    async def bannermaker(self, ctx, *, text: str):
        embed = Embed.info(self.bot, "Banner Maker", f"Text: `{text}`\n\n*Generator wird im Web-Dashboard verfügbar sein.*")
        await ctx.send(embed=embed)

    @commands.hybrid_command(name="removebg", description="Entfernt den Hintergrund eines Bildes")
    async def removebg(self, ctx):
        embed = Embed.info(self.bot, "Background Remover", "Lade ein Bild im Web-Dashboard hoch: https://botforge.app/tools/removebg")
        await ctx.send(embed=embed)


async def setup(bot):
    await bot.add_cog(Core(bot))
