// Core Bot Creation
import TelegramBot = require("node-telegram-bot-api");
import { TextResponses } from "./bot-modules/text-responses/text-responses";
import { TextCommands } from "./bot-modules/text-commands/text-commands";
import { DotaMatches } from "./bot-modules/dota-matches/dota-matches";

const token = "331467600:AAFUKz7Nl8ncw15jtYxWLBzv9CxV65q1Zyk";
const MyTelegramBot = new TelegramBot(token, { polling: true });

new TextResponses(MyTelegramBot);
new TextCommands(MyTelegramBot);
new DotaMatches(MyTelegramBot);

// Test Echo Commands
MyTelegramBot.onText(/\/echo (.+)/, (msg: any, match: any): void => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  MyTelegramBot.sendMessage(chatId, resp);
});
