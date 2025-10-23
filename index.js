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

client.once("ready", async () => {
  console.log(`🤖 ${client.user.tag} ist online!`);

  setTimeout(async () => {
    try {
      const commands = await client.application.commands.fetch();
      const resetCommand = commands.find(cmd => cmd.name === "reset-dev-badge");
      if (resetCommand) {
        // Simuliere die Logik von "reset-dev-badge"
        console.log("🧩 Badge-Reset-Command ausgeführt!");
      } else {
        console.log("🧩 Reset-Dev-Badge Command nicht gefunden.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      await client.destroy();
      process.exit(0);
    }
  }, 5000);
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