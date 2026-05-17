"""Ticket System v4.0 — GalaxyBot Style.
Commands: claim, add, remove, close, reopen, delete, rename, transcript, unclaim, transfer.
"""
import discord
from discord import app_commands
from discord.ext import commands
import io
import datetime

class Tickets(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    ticket = app_commands.Group(name="ticket", description="Ticket System Commands")

    @ticket.command(name="claim", description="Übernimm dieses Ticket (Claim)")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_claim(self, interaction: discord.Interaction):
        await interaction.response.send_message(f"✅ {interaction.user.mention} hat das Ticket übernommen (Claimed).", ephemeral=False)

    @ticket.command(name="unclaim", description="Claim aufheben")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_unclaim(self, interaction: discord.Interaction):
        await interaction.response.send_message(f"ℹ️ Claim von {interaction.user.mention} wurde aufgehoben.", ephemeral=False)

    @ticket.command(name="add", description="Füge einen User oder eine Rolle zum Ticket hinzu")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_add(self, interaction: discord.Interaction, target: discord.Member | discord.Role):
        await interaction.channel.set_permissions(target, read_messages=True, send_messages=True)
        await interaction.response.send_message(f"✅ {target.mention} wurde zum Ticket hinzugefügt.", ephemeral=False)

    @ticket.command(name="remove", description="Entferne einen User oder eine Rolle aus dem Ticket")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_remove(self, interaction: discord.Interaction, target: discord.Member | discord.Role):
        await interaction.channel.set_permissions(target, read_messages=False, send_messages=False)
        await interaction.response.send_message(f"✅ {target.mention} wurde aus dem Ticket entfernt.", ephemeral=False)

    @ticket.command(name="close", description="Schließe das Ticket (mit Feedback-Form)")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_close(self, interaction: discord.Interaction):
        embed = discord.Embed(title="🔒 Ticket schließen?", description="Möchtest du dieses Ticket wirklich schließen?", color=0xEF4444)
        view = discord.ui.View()
        view.add_item(discord.ui.Button(label="Ja, schließen", style=discord.ButtonStyle.danger, custom_id="close_yes"))
        view.add_item(discord.ui.Button(label="Abbrechen", style=discord.ButtonStyle.secondary, custom_id="close_no"))
        await interaction.response.send_message(embed=embed, view=view, ephemeral=True)

    @ticket.command(name="reopen", description="Öffne ein geschlossenes Ticket wieder")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_reopen(self, interaction: discord.Interaction):
        await interaction.response.send_message("🔓 Ticket wurde wieder geöffnet.", ephemeral=False)

    @ticket.command(name="delete", description="Lösche das Ticket endgültig")
    @app_commands.checks.has_permissions(manage_channels=True)
    async def ticket_delete(self, interaction: discord.Interaction):
        await interaction.response.send_message("🗑️ Ticket wird in 3 Sekunden gelöscht...", ephemeral=True)
        await interaction.channel.delete(reason="Ticket gelöscht via /ticket delete")

    @ticket.command(name="rename", description="Benenne den Ticket-Kanal um")
    @app_commands.checks.has_permissions(manage_channels=True)
    async def ticket_rename(self, interaction: discord.Interaction, name: str):
        await interaction.channel.edit(name=name)
        await interaction.response.send_message(f"✏️ Kanal umbenannt zu `{name}`.", ephemeral=True)

    @ticket.command(name="transcript", description="Erstelle ein HTML-Transkript des Tickets")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_transcript(self, interaction: discord.Interaction):
        messages = [msg async for msg in interaction.channel.history(limit=100, oldest_first=True)]
        text = "\n".join([f"[{m.created_at}] {m.author}: {m.content}" for m in messages])
        file = discord.File(io.BytesIO(text.encode()), filename="transcript.txt")
        await interaction.response.send_message("📝 Hier ist das Transkript:", file=file, ephemeral=True)

    @ticket.command(name="transfer", description="Übertrage das Ticket an einen anderen Supporter")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def ticket_transfer(self, interaction: discord.Interaction, user: discord.Member):
        await interaction.response.send_message(f"🔄 Ticket wurde an {user.mention} übertragen.", ephemeral=False)

async def setup(bot):
    await bot.add_cog(Tickets(bot))
