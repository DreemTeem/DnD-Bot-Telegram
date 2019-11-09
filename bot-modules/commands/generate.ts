import TelegramBot = require("node-telegram-bot-api");

export class GeneratorCommandList {
  public static COMMANDS: any = {
    character: {
      keys: ["c", "character"],
      description: "The character generator is used to generate the basic starting stats for a character: Strength, Inteligence, Charisma, Fortitude, Dexterity, and Wisdom."
    },
    map: {
      keys: ["m", "map"],
      description: "The map generator allows the random generation of a dungeon map floor."
    }
  };
}

export class GenerateCommands {
  private DnDBot: TelegramBot;
  private request = require("request");
  private cheerio = require("cheerio");

  private MAP_SEED_LENGTH: number = 6;

  constructor(botReference: TelegramBot) {
    this.DnDBot = botReference;
    this.setGenerateCommand();
  }

  private setGenerateCommand(): void {
    this.DnDBot.onText(/^\/(g)|^\/(generate)/i, (msg: any, match: any): void => {
      this.runGenerateCommand(msg, match);
    });
  }

  private runGenerateCommand(msg: any, match: any): void {
    const commandArray: string[] = msg.text.split(" ");
    const verbose: boolean = msg.text.indexOf(" -v") > 0;
    if (commandArray.length === 1) {
      this.getGenericResponse(msg.chat.id);
    } else {
      if (GeneratorCommandList.COMMANDS.character.keys.indexOf(commandArray[1]) >= 0) {
        this.getCharacterStats(msg.chat.id, verbose);
      } else if (GeneratorCommandList.COMMANDS.map.keys.indexOf(commandArray[1]) >= 0) {
        this.getMap(msg.chat.id);
      } else {
        this.getMissingCommandResponse(msg.chat.id, commandArray.splice(1, commandArray.length).join(" "));
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
  // TODO - Add verbose functionality like the roll command
  private getCharacterStats(messageId: number, verbose: boolean = false): void {
    if (verbose) {
      for (let i: number = 0; i < 7; i++) {
        for (let j: number = 0; j < 5; j++) {
          const diceRoll = this.getDSix();
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
    const mapSeed = this.getMapSeed();
    this.DnDBot.sendPhoto(messageId, "http://www.gozzys.com/dungeon-maps/makerr?seed=" + mapSeed + "&mapsize=2&density=2&background=99&tileset=1&dl=1");
  }

  private getMapSeed(): string {

    const alpha: string[] = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
      "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
      "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    const num: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const alphaNum = alpha.concat(num);

    const seed: string[] = [];
    for (let i: number = 0; i < this.MAP_SEED_LENGTH; i++) {
      seed.push(alphaNum[Math.floor(Math.random() * alphaNum.length)]);
    }

    return seed.join("");
  }

  private getMissingCommandResponse(messageId: number, badCommand: string): void {
    this.DnDBot.sendMessage(messageId, "I'm sorry, I don't currently have a generator for \"" + badCommand + "\". :(", { parse_mode: "HTML", disable_web_page_preview: true });
  }

  private getGenericResponse(messageId: number): void {
    this.DnDBot.sendMessage(messageId, "Hello! Try using a sub-command with \"generate\". Use \"\/generate help to see a full list of sub generator commands. :)", { parse_mode: "HTML", disable_web_page_preview: true });
  }
}
