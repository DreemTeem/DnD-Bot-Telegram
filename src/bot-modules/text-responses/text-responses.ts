import TelegramBot = require("node-telegram-bot-api");
import { hypeResponses } from "./hype-responses";

export class TextResponses {
  private HBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.HBot = botReference;
    this.setBasicHypeResponses();
  }

  private setBasicHypeResponses(): void {
    this.HBot.onText(/h+y+p+e+/i, (msg: any, match: any): void => {
      this.HBot.sendMessage(msg.chat.id, hypeResponses[Math.floor(Math.random() * hypeResponses.length)]);
    });
  }
}
