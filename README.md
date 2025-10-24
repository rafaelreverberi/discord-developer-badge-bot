# Discord Dev Badge Bot

This simple Node.js Discord bot comes online once a week to keep the **Active Developer Badge** active — all fully automated via **GitHub Actions**.

---

## ✨ Features
- Runs automatically once per week (cron-based)
- Connects to Discord, runs a slash command, and logs the result
- No server required — hosted entirely through GitHub Actions

---

## ⚙️ Tech Stack
- Node.js 20+
- discord.js v14
- GitHub Actions (cron schedule)

---

## 🚀 Setup

1. Create a Discord application and bot token at [Discord Developer Portal](https://discord.com/developers/applications).
2. Add the bot to your server with proper permissions.
3. **Fork or clone this repository:**
   ```bash
   git clone https://github.com/rafaelreverberi/discord-developer-badge-bot.git
   cd discord-developer-badge-bot
   npm install
   ```
4. **Create a `.env` file** in the root folder:
   ```bash
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_client_id
   GUILD_ID=your_guild_id
   ```
5. **Add your secrets** in GitHub:
   - Go to **Settings → Secrets → Actions**
   - Add:
     - `DISCORD_TOKEN`
     - `CLIENT_ID`
     - `GUILD_ID`
6. **GitHub Actions** will automatically run once a week to keep your badge alive.

---

## 🧩 Slash Commands
- `/ping` → Tests if the bot is online.
- `/reset-dev-badge` → Executes an action to maintain the Active Developer Badge.

---

## 🧠 How to Claim the Active Developer Badge
1. Visit the [Active Developer Portal](https://discord.com/developers/active-developer).
2. Log in with your Discord account.
3. Ensure your bot has executed a slash command in the past 30 days.
4. Click **Claim Active Developer Badge** to receive your badge!

> 💡 This bot ensures your badge stays active automatically.

---

## ❤️ Credits & License

Created by **Rafael Reverberi** 🇨🇭  
Made with ❤️ for developers who love Discord.  
Completely **open-source** — you may fork, clone, remix, or deconstruct this project freely.
