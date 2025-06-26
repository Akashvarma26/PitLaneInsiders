# Importing required Libraries
import os
from dotenv import load_dotenv
load_dotenv()
import random
import discord
from discord.ext import commands
from keep_alive import keep_alive

# Discord Token from Developer Portal
token=os.getenv("DISCORD_TOKEN")
keep_alive()

banned_words = os.getenv("BANNED_WORDS", "").lower().split(",")

# Log handler and setting Intents
#handler=logging.FileHandler(filename="logs/discord.log",encoding='utf-8',mode='w')
intents=discord.Intents.default()
intents.message_content=True
intents.members=True

# Initializing Bot with pre-set intents
bot=commands.Bot(command_prefix=["!"],intents=intents, help_command=None)

# Teams for roles
valid_teams = ["Alpine", "Aston Martin","Audi","Cadillac", "Ferrari", "Haas","McLaren","Mercedes","Racing Bulls","Red Bull","Williams"]

# Quotes of popular drivers in Formula One History
quotes = [
    "If you no longer go for a gap that exists, you're no longer a racing driver. - Ayrton Senna",
    "Winning is everything. The only ones who remember you when you come second are your wife and your dog. - Damon Hill",
    "The car is such a big difference. - Max Verstappen",
    "To achieve anything, you must be prepared to dabble on the boundary of disaster. - Stirling Moss",
    "I'm not designed to come second or third. I am designed to win. - Ayrton Senna",
    "You don't expect to be at the top of the game when you're in your mid-thirties. But I love what I do. - Lewis Hamilton",
    "Leave me alone, I know what I'm doing. - Kimi Räikkönen",
    "If everything seems under control, you're not going fast enough. - Mario Andretti"
]

# When bot is ready
@bot.event
async def on_ready():
    print(f"{bot.user.name} is ready to race!!!")

# Members join Event
@bot.event
async def on_member_join(member):
    await member.send(f"Welcome to {member.guild.name}, @{member.name}!")

# On message Event
@bot.event
async def on_message(message):
    if message.author == bot.user:
        return 
    
    if "forza ferrari" in message.content.lower():
        await message.channel.send("🔴🔴🔴 Forza Ferrari 🔴🔴🔴")

    content = message.content.lower()
    if any(word in content for word in banned_words):
        await message.delete()
        await message.channel.send(f"{message.author.mention}, please avoid using offensive language.")
        return
    
    await bot.process_commands(message)

# Command error Event
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send("❓ That command doesn't exist. Try `!help`.")

# Help command
@bot.command()
async def help(ctx):
    help_text = """
**🤖 Commands List**
Here are all things I can do:

📢 **General**
`!hello` - Greet the bot and get a friendly F1 welcome.  
`!bot_info` - Learn what this bot does.  
`!f1quote` - Get a random F1 quote.
`!f1teams` - Get current Formula One team names.

🎭 **Roles**
`!join [team]` - Join a team role (e.g., Ferrari, Mercedes, McLaren, etc).  
`!leave [team]` - Leave a team role.

📬 **Messaging**
`!dm [message]` - I'll DM you the message you provide.

📊 **Polls**
`!poll [question]` - Create a simple poll with 👍 / 👎 reactions.

ℹ️ **Help**
`!help` - Show this help message.

---
*PitLane Insiders is here to keep the server fun, fair, and fast 🏁*
"""
    await ctx.send(help_text)

# Bot info command
@bot.command()
async def bot_info(ctx):
    await ctx.send("🏎️ **PitLane Insiders Bot**\nI'm a Formula One-themed bot made to assist fans with stats, quotes, roles, and moderation.")

# Hello command
@bot.command()
async def hello(ctx):
    await ctx.send(f"👋 Hello {ctx.author.mention}! I am ready to Race. 🏎️")

# Quote command
@bot.command()
async def f1quote(ctx):
    await ctx.send(f"📢 **F1 Quote:**\n> {random.choice(quotes)}")

# Assign role command
@bot.command()
async def join(ctx, *, team: str):
    team_input = team.strip().lower()
    team_mapping = {t.lower(): t for t in valid_teams}
    if team_input not in team_mapping:
        await ctx.send(f"🚫 Invalid team. Choose from: {', '.join(valid_teams)}")
        return

    matched_team = team_mapping[team_input]
    role = next((r for r in ctx.guild.roles if r.name.lower() == matched_team.lower()), None)
    if not role:
        await ctx.send(f"❗ Role '{matched_team}' not found in this server. Please ask an admin to create it.")
        return
    if role in ctx.author.roles:
        await ctx.send(f"ℹ️ You already have the **{matched_team}** role.")
        return

    await ctx.author.add_roles(role)
    await ctx.send(f"✅ You've joined **{matched_team}** role! Wooohooo")

# Remove role command
@bot.command()
async def leave(ctx, *, team: str):
    team_input = team.strip().lower()
    team_mapping = {t.lower(): t for t in valid_teams}
    if team_input not in team_mapping:
        await ctx.send(f"🚫 Invalid team. Choose from: {', '.join(valid_teams)}")
        return

    matched_team = team_mapping[team_input]
    role = discord.utils.get(ctx.guild.roles, name=matched_team)
    if role and role in ctx.author.roles:
        await ctx.author.remove_roles(role)
        await ctx.send(f"❌ You've left **{matched_team}** role. 😞")
    else:
        await ctx.send(f"🚫 You don't have the role **{matched_team}**.")

# DM message command
@bot.command()
async def dm(ctx,*,msg):
    await ctx.author.send(msg)

# Poll command
@bot.command()
async def poll(ctx,*,question):
    embed=discord.Embed(title="New Poll",description=question)
    poll_message=await ctx.send(embed=embed)
    await poll_message.add_reaction("👍")
    await poll_message.add_reaction("👎")

# Team names command
@bot.command()
async def f1teams(ctx):
    await ctx.send("🏁 Current F1 Teams:\n" + "\n".join(f"- {team}" for team in valid_teams))

# Running the bot using discord token
bot.run(token=token)