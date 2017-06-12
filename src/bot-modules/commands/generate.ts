import TelegramBot = require("node-telegram-bot-api");

export class GenerateCommands {
  private DnDBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.DnDBot = botReference;
    this.setGenerateCommand();
  }

  private setGenerateCommand(): void {
    this.DnDBot.onText(/^\/generate/i, (msg: any, match: any): void => {
      const commandArray: string[] = msg.text.split(" ");
      const verbose: boolean = msg.text.indexOf(" -v") > 0;
      if (commandArray.length === 1) {
        this.getGenericResponse(msg.chat.id);
      } else {
        switch (commandArray[1]) {
          case "c":
          case "character":
            this.getCharacterStats(msg.chat.id, verbose);
            break;
          default:
            this.getMissingCommandResponse(msg.chat.id, commandArray.splice(1, commandArray.length).join(" "));
            break;
        }
      }
    });
  }

  private getDSix(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  private getStatResult(): number {
    let result: number = 0;
    for (let i: number = 0; i < 4; i++) {
      result += this.getDSix();
    }
    return result;
  }

  private getCharacterStats(messageId: number, verbose: boolean = false): void {
    this.DnDBot.sendMessage(messageId, "Verbose /generate under development. :D", { parse_mode: "HTML", disable_web_page_preview: true });
    if (verbose) {
      for (let i: number = 0; i < 7; i++) {
        for (let j: number = 0; j < 5; j++) {
          const diceRoll = this.getDSix();
          console.log(diceRoll);    
        }
      }
    } else {
      const statArray: number[] = [];
      for (let i: number = 0; i < 6; i++) {
        statArray.push(this.getStatResult());
      }
      this.DnDBot.sendMessage(messageId, statArray.join("\n"), { parse_mode: "HTML", disable_web_page_preview: true });
    }
  }

  private getMissingCommandResponse(messageId: number, badCommand: string): void {
    this.DnDBot.sendMessage(messageId, "I'm sorry, I don't currently have a generator for \"" + badCommand + "\". :(", { parse_mode: "HTML", disable_web_page_preview: true });
  }

  private getGenericResponse(messageId: number): void {
    this.DnDBot.sendMessage(messageId, "Hello! Try searching with parameters after this command. :)", { parse_mode: "HTML", disable_web_page_preview: true });
  }
}
