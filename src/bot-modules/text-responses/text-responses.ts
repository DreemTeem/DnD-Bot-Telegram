const Bot = require('node-telegram-bot-api');
import { Image } from 'canvas';
import { GygaxResponses } from './gygax-responses';
import { LonkGenerator } from '../utility/lonk-generator';
import { GlobalHelpers } from '../utility/global-helpers';

export class TextResponses {
  private GBot;
  private lonkImg: Image;

  constructor(botReference) {
    this.GBot = botReference;
    this.setGaryGygaxResponses();
    this.setBasicYeetResponses();
    this.setSlippyResponses();
    this.setSneckoResponses();
    this.setStonksResponses();
    this.setBirdUpResponses();
    this.setMalfestioResponses();
    this.setBlueCircuiResponses();
    this.setNaniResponse();
    this.setKojimaResponses();
    this.setMyesResponses();
    this.setVeryCoolResponses();
    this.loadCanvasImage(__dirname + '/../../../assets/lonk_alpha.png').then((image: Image) => {
      this.setLonkResponses(image);
    }, () => {
      this.setLonkResponses();
    });
    this.setNekoparaDeanDidThisResponse();
    this.setRoarResponse();
    this.setShrugResponse();
    this.setPapaCResponse();
    this.setUnderstandableResponse();
    this.setSuaveResponses();
    this.setOuterWildsResponses();
  }

  private loadCanvasImage(url: string): Promise<Image> {
    const image = new Image();
    const imagePromise = new Promise<Image>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
    image.src = url;
    return imagePromise;
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
    this.GBot.onText(/\bm *o *t *h *s* *\b/i, (msg: any, match: any): void => {
      this.GBot.sendMessage(msg.chat.id, msg.from.first_name + ', did you mean "Owl"?');
      if (msg.from.id === 358426865) {
        this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/derek_bird.jpg', { caption: '"Malfestio is a Bird Wyvern"\n - Monster Hunter Wiki' });
      }
    });
  }

  private setBlueCircuiResponses(): void {
    this.GBot.onText(/\bp *u *r *p *l *e *\b/i, (msg: any, match: any): void => {
      if (msg.from.id === 358426865) {
        this.GBot.sendMessage(msg.chat.id, msg.from.first_name + ', did you mean "Blue"?');
        this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/derek_blue_circuits.jpg', { caption: '"The Processing Unit (or "blue circuit") is the third tier of circuit"\n - Factorio Wiki' });
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

  private setMyesResponses(): void {
    this.GBot.onText(/myes/i, (msg: any, match: any): void => {
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/myes.gif');
    });
  }

  private setVeryCoolResponses(): void {
    this.GBot.onText(/v+e+r+y+ coo+l+/i, (msg: any, match: any): void => {
      const cool: number = Math.floor(Math.random() * 3) + 1;
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/very_cool/very_cool' + cool + '.gif');
    });
  }

  private setLonkResponses(image?: Image): void {
    if (image) {
      this.GBot.onText(/lo+n+k/i, (msg: any, match: any): void => {
        const randomizedLonk: Buffer = LonkGenerator.randomizeLonkImage(image);
        this.GBot.sendPhoto(msg.chat.id, randomizedLonk);
      });
    } else {
      this.GBot.onText(/lo+n+k/i, (msg: any, match: any): void => {
        this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/lonk.jpg');
      });
    }
  }

  private setNekoparaDeanDidThisResponse(): void {
    this.GBot.onText(/heckachi|nekopara/i, (msg: any, match: any): void => {
      const neko: number = Math.floor(Math.random() * 9) + 1;
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/neko/neko' + neko + '.gif');
    });
  }

  private setRoarResponse(): void {
    this.GBot.onText(/^\/roar/i, (msg: any, match: any): void => {
      const roar: number = Math.floor(Math.random() * 10) + 1;
      if (roar >= 9) {
        this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/roar.mp4');
      } else {
        this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/do_roar.mp4');
      }

    });
  }

  private setShrugResponse(): void {
    this.GBot.onText(/^\/shrug/i, (msg: any, match: any): void => {
      // GlobalHelpers.deleteCommandMessage(this.GBot, msg);
      this.GBot.sendMessage(msg.chat.id, '¯\\_(ツ)_/¯');
    });
  }

  private setPapaCResponse(): void {
    this.GBot.onText(/^\/papac/i, (msg: any, match: any): void => {
      // GlobalHelpers.deleteCommandMessage(this.GBot, msg);
      this.GBot.sendMessage(msg.chat.id, 'yahahaaa Papa C. yahahaaa Papa C. yahahaaa Papa C. yahahaaa Papa C. yahahaaa Papa C. yahahaaa Papa C. yahahaaa Papa C. Zelda is dying Papa C.');
    });
  }

  private setUnderstandableResponse(): void {
    this.GBot.onText(/^\/understandable/i, (msg: any, match: any): void => {
      this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/understandable.png');
    });
  }

  private setSuaveResponses(): void {
    this.GBot.onText(/suave/i, (msg: any, match: any): void => {
      const suave: number = Math.floor(Math.random() * 4) + 1;
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/suave/suave' + suave + '.gif');
    });
  }

  private setOuterWildsResponses(): void {
    this.GBot.onText(/outer wilds/i, (msg: any, match: any): void => {
      const eotu: number = Math.floor(Math.random() * 16) + 1;
      this.GBot.sendDocument(msg.chat.id, __dirname + '/../../../assets/outer_wilds/outer_wilds' + eotu + '.gif');
    });
  }

}
