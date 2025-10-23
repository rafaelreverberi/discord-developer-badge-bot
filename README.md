# 🛰️ Discord Dev Badge Bot

This simple Node.js Discord bot comes online once a week to keep the **Active Developer Badge** active — all fully automated via **GitHub Actions**.

## ✨ Features
- Runs automatically once per week (cron-based)
- Connects to Discord, posts a message or runs a slash command
- No server required — hosted entirely through GitHub Actions

## ⚙️ Tech Stack
- Node.js 20+
- discord.js v14
- GitHub Actions (cron schedule)

## 🚀 Setup
1. Create a Discord application and bot token at [Discord Developer Portal](https://discord.com/developers/applications).
2. Add the bot to your server with proper permissions.
3. Fork or clone this repo.
4. Add your secrets in GitHub (`DISCORD_TOKEN`, `TARGET_CHANNEL`).
5. GitHub Actions will automatically run once a week to keep your badge alive.

---
Made with ❤️ for developers who love Discord.
