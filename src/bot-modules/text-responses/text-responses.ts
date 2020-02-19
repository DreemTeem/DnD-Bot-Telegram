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
    this.setMalfestioResponses();
    this.setNaniResponse();
    this.setKojimaResponses();
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

  private setMalfestioResponses(): void {
    this.GBot.onText(/\bm *o *t *h *\b/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, msg.from.first_name + ', did you mean "Owl"?');
      if (msg.from.id === 358426865) {
        this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/derek_bird.jpg', { caption: '"Malfestio is a Bird Wyvern"\n - Monster Hunter Wiki' });
      }
    });
  }

  private setNaniResponse(): void {
    const nani: string = 'Nani the fuck did you just fucking iimasu about watashi, you chiisai bitch desuka? Watashi\'ll have anata know that watashi graduated top of my class in Nihongo 3, and watashi\'ve been involved in iroirona Nihongo tutoring sessions, and watashi have over sanbyaku perfect test scores. Watashi am trained in kanji, and watashi is the top letter writer in all of southern California. Anata are nothing to watashi but just another weeaboo. Watashi will korosu anata the fuck out with vocabulary the likes of which has neber meen mimasu\'d before on this continent, mark watashino fucking words. Anata thinks that anata can get away with hanashimasing that kuso to watashi over the intaaneto? Omou again, fucker. As we hanashimasu, watashi am contacting watashino secret netto of otakus accross the USA, and anatano IP is being traced right now so you better junbishimasu for the ame, ujimushi. The ame that korosu\'s the pathetic chiisai thing anata calls anatano life. You\'re fucking shinimashita\'d, akachan.';
    this.GBot.onText(/\bn *a *n *i *\b/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, nani);
    });
  }

  private setKojimaResponses(): void {
   this.GBot.onText(/^\/koj/i, (msg: any, match: any): void => {
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/kojima.gif');
    });
  }

}
