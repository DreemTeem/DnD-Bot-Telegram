const Bot = require('node-telegram-bot-api');
import { GygaxResponses } from './gygax-responses';

export class TextResponses {
  private GBot;

  constructor(botReference) {
    this.GBot = botReference;
    this.setBasicHypeResponses();
  }

  private setBasicHypeResponses(): void {
    this.GBot.onText(/gary.+say/i, (msg: any, match: any): void => {
      console.log(msg);
      this.GBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });

    this.GBot.onText(/gary.+tell/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });

    this.GBot.onText(/gary.+please/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });
  }
}
