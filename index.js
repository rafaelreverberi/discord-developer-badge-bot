require("dotenv").config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");

// Trage hier deine Daten ein:
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(TOKEN);

// Zwei Slash-Commands: /ping und /reset-dev-badge
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Prüft, ob der Bot online ist."),
  new SlashCommandBuilder()
    .setName("reset-dev-badge")
    .setDescription("Führt eine Developer Badge Aktivität aus."),
];

(async () => {
  try {
    console.log("🔧 Registriere Slash-Commands...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands.map(cmd => cmd.toJSON()),
    });
    console.log("✅ Slash-Commands registriert!");
  } catch (error) {
    console.error(error);
  }
})();

client.once("clientReady", async () => {
  console.log(`🤖 ${client.user.tag} ist online!`);

  // Führe den /reset-dev-badge Command kurz nach dem Start aus und gehe danach offline
  setTimeout(async () => {
    try {
      console.log("⏳ Warte 30 Sekunden, bis Slash-Commands auf Discord verfügbar sind...");
      const guild = await client.guilds.fetch(GUILD_ID);
      const logChannel = guild.channels.cache.find(ch => ch.name === "general" || ch.name === "bot-log" || ch.name === "dev-bot-log");
      const commands = await guild.commands.fetch();
      const resetCommand = commands.find(cmd => cmd.name === "reset-dev-badge");
      if (resetCommand) {
        console.log("🧩 Developer Badge automatisch aufgefrischt!");
        if (logChannel) {
          await logChannel.send("✅ **Developer Badge wurde automatisch erfolgreich erneuert!**");
        } else {
          console.warn("⚠️ Kein passender Log-Channel gefunden, Nachricht konnte nicht gesendet werden.");
        }
        console.log("🛑 Erfolg! Bot wird nun beendet, damit der Prozess beim nächsten Start wiederholt werden kann.");
        await client.destroy();
        process.exit(0);
      } else {
        console.log("⚠️ Reset-Dev-Badge Command nicht gefunden, versuche später erneut.");
        if (logChannel) {
          await logChannel.send("❌ **Fehler:** Der `/reset-dev-badge` Command wurde nicht gefunden. Bitte später erneut prüfen.");
        } else {
          console.warn("⚠️ Kein passender Log-Channel gefunden, Fehlernachricht konnte nicht gesendet werden.");
        }
      }
    } catch (error) {
      console.error("Fehler beim automatischen Badge-Reset:", error);
    }
  }, 30000); // 30 Sekunden nach Start, um sicherzustellen, dass Slash-Commands verfügbar sind
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🤖 Bot is online!");
  }

  if (interaction.commandName === "reset-dev-badge") {
    await interaction.reply("🧩 Developer badge refreshed successfully!");
    console.log("🧩 Badge-Reset-Command ausgeführt!");
  }
});

client.login(TOKEN);


//Github Repo Workflow Activation