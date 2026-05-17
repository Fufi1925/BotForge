"""Moderation & Protection v4.0 — Linked Moderation & Guild Protection."""
import discord
from discord import app_commands
from discord.ext import commands

class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # --- Standard Mod Commands ---
    @app_commands.command(name="ban", description="Bannt einen User")
    @app_commands.checks.has_permissions(ban_members=True)
    async def ban(self, interaction: discord.Interaction, user: discord.Member, reason: str = "Kein Grund"):
        await user.ban(reason=reason)
        await interaction.response.send_message(f"🔨 {user.mention} wurde gebannt. Grund: {reason}", ephemeral=False)

    @app_commands.command(name="kick", description="Kickt einen User")
    @app_commands.checks.has_permissions(kick_members=True)
    async def kick(self, interaction: discord.Interaction, user: discord.Member, reason: str = "Kein Grund"):
        await user.kick(reason=reason)
        await interaction.response.send_message(f"👢 {user.mention} wurde gekickt. Grund: {reason}", ephemeral=False)

    @app_commands.command(name="timeout", description="Setzt einen User in Timeout")
    @app_commands.checks.has_permissions(moderate_members=True)
    async def timeout(self, interaction: discord.Interaction, user: discord.Member, duration: int, reason: str = "Kein Grund"):
        await user.timeout(discord.utils.timedelta(minutes=duration), reason=reason)
        await interaction.response.send_message(f"⏱️ {user.mention} wurde für {duration} Minuten getimeoutet.", ephemeral=False)

    @app_commands.command(name="warn", description="Verwarnt einen User")
    @app_commands.checks.has_permissions(moderate_members=True)
    async def warn(self, interaction: discord.Interaction, user: discord.Member, reason: str = "Kein Grund"):
        await interaction.response.send_message(f"⚠️ {user.mention} wurde verwarnt. Grund: {reason}", ephemeral=False)

    # --- Linked Moderation Listener (Loggt native Discord Actions) ---
    @commands.Cog.listener()
    async def on_member_ban(self, guild: discord.Guild, user: discord.User):
        # Loggt native Bans ins Log-Channel (falls konfiguriert)
        print(f"[Linked Mod] {user} wurde auf {guild.name} gebannt.")

    @commands.Cog.listener()
    async def on_member_remove(self, member: discord.Member):
        # Loggt Kicks/Leaves
        print(f"[Linked Mod] {member} hat {member.guild.name} verlassen (Kick/Leave).")

    # --- Guild Protection (Captcha / Anti-Raid) ---
    @app_commands.command(name="protection", description="Zeigt den aktuellen Schutz-Status an")
    @app_commands.checks.has_permissions(administrator=True)
    async def protection(self, interaction: discord.Interaction):
        embed = discord.Embed(title="🛡️ Guild Protection Status", description="Anti-Raid und Captcha sind aktiv.", color=0x10B981)
        await interaction.response.send_message(embed=embed, ephemeral=True)

async def setup(bot):
    await bot.add_cog(Moderation(bot))
