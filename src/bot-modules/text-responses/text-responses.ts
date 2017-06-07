import TelegramBot = require("node-telegram-bot-api");
import { GygaxResponses } from "./gygax-responses";

export class TextResponses {
  private HBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.HBot = botReference;
    this.setBasicHypeResponses();
  }

  private setBasicHypeResponses(): void {
    this.HBot.onText(/gary.+say/i, (msg: any, match: any): void => {
      this.HBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });

    this.HBot.onText(/gary.+tell/i, (msg: any, match: any): void => {
      this.HBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });

    this.HBot.onText(/gary.+please/i, (msg: any, match: any): void => {
      this.HBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });
  }
}
