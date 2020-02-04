const Bot = require('node-telegram-bot-api');
import { GygaxResponses } from './gygax-responses';

export class TextResponses {
  private GBot;

  constructor(botReference) {
    this.GBot = botReference;
    this.setGaryGygaxResponses();
    this.setBasicYeetResponses();
    this.setSlippyResponses();
    this.setSneckoResponses();
    this.setStonksResponses();
    this.setBirdUpResponses();
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
      const numMatches = msg.text.match(/(yee+t)/ig).length;
      let growthString: string = "Grows...";
      for (let i = 0; i < numMatches - 1; i++) {
        growthString = "Grows and " + growthString;
      }
      this.GBot.sendMessage(msg.chat.id, 'The Yeet King ' + growthString);
    });
  }

  private setSlippyResponses(): void {
    this.GBot.onText(/slippy ?i?'? ?s ?dead/i, (msg: any, match: any): void => {
      // TODO switch back to old message if image is too intrusive for chat
      // this.GBot.sendMessage(msg.chat.id, '<i>N I C E</i>', { parse_mode: 'HTML', disable_web_page_preview: true });
      this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/nice.png');
    });
  }

  private setSneckoResponses(): void {
    this.GBot.onText(/praise snecko/i, (msg: any, match: any): void => {
      this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/snecko.jpg', { caption: 'PRAISE SNECKO' });
    });

    this.GBot.onText(/^\/snecko/i, (msg: any, match: any): void => {
      this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/spire/ironclad.jpg', { caption: "SpireCommands.characters.ironclad.intro" });
      this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/snecko.jpg', { caption: 'PRAISE SNECKO' });
    });
  }

  private setStonksResponses(): void {
    this.GBot.onText(/stonk/i, (msg: any, match: any): void => {
      const stonk: number = Math.floor(Math.random() * 4) + 1;
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/stonk' + stonk + '.mp4');
    });
  }

  private setBirdUpResponses(): void {
    this.GBot.onText(/bird up/i, (msg: any, match: any): void => {
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/bird.gif');
    });
  }
}
