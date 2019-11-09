const token = process.env.TOKEN;

import { TextResponses } from "./bot-modules/text-responses/text-responses";
import { RollCommands } from "./bot-modules/commands/roll";
import { DnDCommands } from "./bot-modules/commands/dnd";
import { GenerateCommands } from "./bot-modules/commands/generate";
import { HelpCommands } from "./bot-modules/commands/help";

const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', (msg) => {
  const name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
    // reply sent!
  });
});

new TextResponses(bot);
new RollCommands(bot);
new DnDCommands(bot);
new GenerateCommands(bot);
new HelpCommands(bot);

module.exports = bot;
