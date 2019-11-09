const token = process.env.TOKEN;

const TextResponses = require("./output/text-responses/text-responses");
// const RollCommands = require("./bot-modules/commands/roll");
// const DnDCommands = require("./bot-modules/commands/dnd");
// const GenerateCommands = require("./bot-modules/commands/generate");
// const HelpCommands = require("./bot-modules/commands/help");

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

new TextResponses.TextResponses(bot);
// new RollCommands(bot);
// new DnDCommands(bot);
// new GenerateCommands(bot);
// new HelpCommands(bot);

module.exports = bot;
