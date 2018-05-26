// Core Bot Creation
import TelegramBot = require("node-telegram-bot-api");
import { TextResponses } from "./bot-modules/text-responses/text-responses";
import { RollCommands } from "./bot-modules/commands/roll";
import { DnDCommands } from "./bot-modules/commands/dnd";
import { GenerateCommands } from "./bot-modules/commands/generate";
import { HelpCommands } from "./bot-modules/commands/help";

const token = "331467600:AAFUKz7Nl8ncw15jtYxWLBzv9CxV65q1Zyk";
const MyTelegramBot = new TelegramBot(token, { polling: true });

new TextResponses(MyTelegramBot);
new RollCommands(MyTelegramBot);
new DnDCommands(MyTelegramBot);
new GenerateCommands(MyTelegramBot);
new HelpCommands(MyTelegramBot);
