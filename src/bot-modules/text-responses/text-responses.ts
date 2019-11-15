const Bot = require('node-telegram-bot-api');
import { GygaxResponses } from './gygax-responses';

export class TextResponses {
  private GBot;

  constructor(botReference) {
    this.GBot = botReference;
    this.setGaryGygaxResponses();
    this.setBasicYeetResponses();
    this.setSlippyResponses();
  }

  private setGaryGygaxResponses(): void {
    this.GBot.onText(/gary.+say/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });

    this.GBot.onText(/gary.+tell/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });

    this.GBot.onText(/gary.+please/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, GygaxResponses[Math.floor(Math.random() * GygaxResponses.length)]);
    });
  }

  private setBasicYeetResponses(): void {
    this.GBot.onText(/yee+t/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, 'The Yeet King Grows...');
    });
  }

  private setSlippyResponses(): void {
    this.GBot.onText(/slippy ?i?'? ?s ?dead/i, (msg: any, match: any): void => {
      // TODO switch back to old message if image is too intrusive for chat
      // this.GBot.sendMessage(msg.chat.id, '<i>N I C E</i>', { parse_mode: 'HTML', disable_web_page_preview: true });
      this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/nice.png');
    });
  }
}
