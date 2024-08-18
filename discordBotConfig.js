import "dotenv/config";
import {
  Client,
  Embed,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
} from "discord.js";
import { scrap } from "./scrapGaming.js";

const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, async () => {
  console.log("bot on");
  const serverID = process.env.SERVER_ID; // meu servidor
  const channel = client.channels.cache.get(serverID);

  try {
    const response = await scrap();

    const results = response.map((result) => {
      return {
        title: result.text,
        image: result.image,
      };
    });

    var imageTest =
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7f466c0e-76f6-4744-bc97-bcd1d7db271d/dcsdo13-e26c6a9c-3341-45f0-840b-f873918b25d4.jpg/v1/fit/w_500,h_715,q_70,strp/yugioh_basic_insect__027_ep002__by_yugioh1733_dcsdo13-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzE1IiwicGF0aCI6IlwvZlwvN2Y0NjZjMGUtNzZmNi00NzQ0LWJjOTctYmNkMWQ3ZGIyNzFkXC9kY3NkbzEzLWUyNmM2YTljLTMzNDEtNDVmMC04NDBiLWY4NzM5MThiMjVkNC5qcGciLCJ3aWR0aCI6Ijw9NTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.kKT8rusVTOlS3Ldi_hjieGcsiZvNmbbnc8bgbqfdgEs";

    results.forEach((game) => {
      const embedImage = game.image.startsWith("data:")
        ? imageTest
        : game.image;
      const EmbedGames = new EmbedBuilder()
        .setTitle(game.title)
        .setImage(embedImage);
      channel.send({ embeds: [EmbedGames] });
    });
  } catch (error) {
    console.log("scrap error", error);
  }
});

client.login(token);
