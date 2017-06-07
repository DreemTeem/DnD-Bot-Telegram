// Core Bot Creation
import TelegramBot = require("node-telegram-bot-api");
import { TextResponses } from "./bot-modules/text-responses/text-responses";
import { RollCommands } from "./bot-modules/commands/roll";
import { DnDCommands } from "./bot-modules/commands/dnd";

const token = "331467600:AAFUKz7Nl8ncw15jtYxWLBzv9CxV65q1Zyk";
const MyTelegramBot = new TelegramBot(token, { polling: true });

new TextResponses(MyTelegramBot);
new RollCommands(MyTelegramBot);
new DnDCommands(MyTelegramBot);

// Test Echo Commands
MyTelegramBot.onText(/\/echo (.+)/, (msg: any, match: any): void => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  MyTelegramBot.sendMessage(chatId, resp);
});
