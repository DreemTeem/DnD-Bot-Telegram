const Bot = require('node-telegram-bot-api');

export class YeetResponses {
  private GBot;

  constructor(botReference) {
    this.GBot = botReference;
    this.setBasicYeetResponses();
  }

  private setBasicYeetResponses(): void {
    this.GBot.onText(/yee+t/i, (msg: any, match: any): void => {
      console.log(msg);
      this.GBot.sendMessage(msg.chat.id, 'The Yeet King Grows...');
    });
  }
}
