const token = process.env.TOKEN;

import { TextResponses } from './bot-modules/text-responses/text-responses';
import { RollCommands } from './bot-modules/commands/roll';
import { DnDCommands } from './bot-modules/commands/dnd';
import { GenerateCommands } from './bot-modules/commands/generate';
import { HelpCommands } from './bot-modules/commands/help';
import { MTGSearch } from './bot-modules/commands/mtg-search';
import { SpireCommands } from './bot-modules/commands/spire';
import TelegramBot = require('node-telegram-bot-api');

let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

// TODO: Switch to static functionality to avoid having to create unused references here.
new TextResponses(bot);
new RollCommands(bot);
new DnDCommands(bot);
new GenerateCommands(bot);
new HelpCommands(bot);
new MTGSearch(bot);
new SpireCommands(bot);

bot.on("polling_error", (err) => {
  // Muting double error when running locally
});

module.exports = bot;
