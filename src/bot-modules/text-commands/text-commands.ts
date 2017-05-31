import TelegramBot = require("node-telegram-bot-api");

export class TextCommands {
  private HBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.HBot = botReference;
    this.setBasicTextCommands();
  }

  private setBasicTextCommands(): void {
    this.HBot.onText(/^\/shrug/i, (msg: any, match: any): void => {
      this.HBot.sendMessage(msg.chat.id, "¯\\_(ツ)_/¯");
    });
  }
}
