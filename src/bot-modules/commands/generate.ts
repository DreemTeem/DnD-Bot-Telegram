const Bot = require('node-telegram-bot-api');

export class GeneratorCommandList {
  public static COMMANDS: any = {
    character: {
      title: "Character",
      keys: ["c", "character"],
      description: "The character generator is used to generate the basic starting stats for a character: Strength, Inteligence, Charisma, Fortitude, Dexterity, and Wisdom."
    },
    map: {
      title: "Map",
      keys: ["m", "map"],
      description: "The map generator allows the random generation of a dungeon map floor."
    }
  };
}

export class GenerateCommands {
  private DnDBot;
  private request = require("request");
  private cheerio = require("cheerio");

  private MAP_SEED_LENGTH: number = 6;

  constructor(botReference) {
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
    if (commandArray[0] === "/g" || commandArray[0] === "/generate") {
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
  }

  private getDSix(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  private getStatResult(): any {
    let result: number = 0;
    const rolls = [];
    let minResult: number = Number.MAX_SAFE_INTEGER;
    for (let i: number = 0; i < 4; i++) {
      const roll = this.getDSix();
      if (roll < minResult) {
        minResult = roll;
      }
      rolls.push(roll);
      result += roll;
    }
    result -= minResult;
    return {
      result: result,
      rolls: rolls,
      dropped: minResult
    };
  }
  // TODO - Add verbose functionality like the roll command
  private getCharacterStats(messageId: number, verbose: boolean = false): void {
    const statArray: string[] = [];
    const verboseLogsArray: any[] = [];
      for (let i: number = 0; i < 6; i++) {
        const statResult: any = this.getStatResult();
        const result: string = statResult.result;
        if (verbose) {
          verboseLogsArray.push(statResult);
        }
        statArray.push("<i>Stat Roll " + (i+1) + "</i> : (" + result + ")");
      }
      let verboseLog: string = "";
      verboseLogsArray.forEach((logObj, index) => {
        verboseLog += "Rolling dice for stat #" + (index + 1) + "\n";
        const rolls: number[] = logObj.rolls;
        const dropped: number[] = logObj.dropped;
        rolls.forEach(roll => {
          verboseLog += "Rolled 1d6 for a " + roll + "\n";
        });
        verboseLog += "Dropped lowest value " + logObj.dropped + " for a final result of " + logObj.result + "\n\n";
      });
      const message:string = verboseLog + "<b>Character Rolls</b>\n" + statArray.join("\n");
      this.DnDBot.sendMessage(messageId, message, { parse_mode: "HTML", disable_web_page_preview: true });
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
