const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");

// Trage hier deine Daten ein:
const TOKEN = "MTQzMDIzMzkzOTM4OTE5MDM2OA.G8q5Io.f1GxzHqspQvPxAmNYgQKaD9gAHt_L3hdenFcoI";
const CLIENT_ID = "1430233939389190368";
const GUILD_ID = "1430234992243642509"; // dein Server, auf dem du den Bot hast

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

client.once("ready", () => {
  console.log(`🤖 ${client.user.tag} ist online!`);
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