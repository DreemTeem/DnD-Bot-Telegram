import TelegramBot = require("node-telegram-bot-api");

export class GenerateCommands {
  private DnDBot: TelegramBot;
  private request = require("request");
  private cheerio = require("cheerio");

  constructor(botReference: TelegramBot) {
    this.DnDBot = botReference;
    this.setGenerateCommand();
  }

  private setGenerateCommand(): void {
    this.DnDBot.onText(/^\/(g )|(generate )/i, (msg: any, match: any): void => {
      this.runGenerateCommand(msg, match);
    });
  }

  private runGenerateCommand(msg: any, match: any): void {
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
        case "m":
        case "map":
          this.getMap(msg.chat.id);
          break;
        default:
          this.getMissingCommandResponse(msg.chat.id, commandArray.splice(1, commandArray.length).join(" "));
          break;
      }
    }
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

  private getMap(messageId: number): void {
    this.request.get("http://www.gozzys.com/dungeon-maps/makerr?seed=rbz1r1&mapsize=2&density=2&background=99&tileset=1&dl=1", (error: any, response: any, body: any) => {
      if (response) {
        const $: any = this.cheerio.load(response.body);
        const mainResults: any = $("body");
        console.log(mainResults.html());
        const message: string = "<b>Generating Map</b>\n==============================\n";
        this.DnDBot.sendMessage(messageId, message, { parse_mode: "HTML", disable_web_page_preview: true });
      } else if (error) {
        this.DnDBot.sendMessage(messageId, "Sorry, no results were returned.", { parse_mode: "HTML", disable_web_page_preview: true });
      } else {
        this.DnDBot.sendMessage(messageId, "Sorry, an unknown error has occured.", { parse_mode: "HTML", disable_web_page_preview: true });
      }
    });
  }

  private getMissingCommandResponse(messageId: number, badCommand: string): void {
    this.DnDBot.sendMessage(messageId, "I'm sorry, I don't currently have a generator for \"" + badCommand + "\". :(", { parse_mode: "HTML", disable_web_page_preview: true });
  }

  private getGenericResponse(messageId: number): void {
    this.DnDBot.sendMessage(messageId, "Hello! Try searching with parameters after this command. :)", { parse_mode: "HTML", disable_web_page_preview: true });
  }
}
