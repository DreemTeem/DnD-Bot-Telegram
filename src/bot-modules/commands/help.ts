import TelegramBot = require("node-telegram-bot-api");
import { GeneratorCommandList } from "./generate";

export class BaseCommandList {
  public static COMMANDS: any = {
    dnd: {
      keys: ["dnd"],
      description: "The \/dnd command is used to search for DND related wiki pages based on provided critera."
    },
    generate: {
      keys: ["g", "generate"],
      description: "The \/generate command is used to generate a variety of things from character stats to dungeon maps.",
      subcommands: GeneratorCommandList
    },
    roll: {
      keys: ["roll"],
      description: "The \/roll command is used to  roll a variety of user defined dice. It will default to a d6, but if you can also use the format XdY where X is the number of dice and Y is the sides for that die."
    }
  };
}

export class HelpCommands {
  private DnDBot: TelegramBot;
  private request = require("request");
  private cheerio = require("cheerio");

  constructor(botReference: TelegramBot) {
    this.DnDBot = botReference;
    this.setHelpCommand();
  }

  private setHelpCommand(): void {
    this.DnDBot.onText(/^\/(h)|(help)/i, (msg: any, match: any): void => {
      const commandArray: string[] = msg.text.split(" ");
      if (commandArray[0] === "/h" || commandArray[0] === "/help") {
        if (commandArray.length === 1) {
          this.listAllDnDCommands(msg.chat.id);
        } else {
          switch (commandArray[1]) {
            default:
              this.listSingleDnDCommand(msg.chat.id, commandArray.splice(1, commandArray.length).join(" "));
              break;
          }
        }
      }
    });
  }

  private getCommandListString(commandList: any): string {
    let commandListStr = "";
    for (const key in commandList) {
      if (key) {
        commandListStr += this.getCommandInfoString(commandList[key]);
      }
    }
    return commandListStr;
  }

  private getCommandInfoString(command: any): string {
    return command.keys.join() + "\n" + command.description + "\n";
  }
  // TODO - Flesh this out and use it when help is called with specific command in mind
  private getSubCommandInfoString(command: any): string {
    const subcommands = command.subcommands;
    if (!subcommands) {
      return "";
    }
    for (const key in subcommands) {
      // TODO: Add more fleshed out returns here.
    }
    return command.keys.join() + "\n" + command.description + "\n";
  }

  private listSingleDnDCommand(messageId: number, commandString?: string): void {
    if (BaseCommandList.COMMANDS[commandString]) {
      this.DnDBot.sendMessage(messageId, this.getCommandInfoString(BaseCommandList.COMMANDS[commandString]));
    } else {

      for (const key in BaseCommandList.COMMANDS) {
        if (BaseCommandList.COMMANDS[key].keys.indexOf(commandString) >= 0) {
          this.DnDBot.sendMessage(messageId, this.getCommandInfoString(BaseCommandList.COMMANDS[key]));
          return;
        }
      }
      this.listNoCommandFound(messageId, commandString);
    }
  }

  private listAllDnDCommands(messageId: number): void {
    let commandListStr: string = "Here is a list of the base commands that I can provide services for:\n\n";
    commandListStr += this.getCommandListString(BaseCommandList.COMMANDS);
    this.DnDBot.sendMessage(messageId, commandListStr);
  }

  private listNoCommandFound(messageId: number, commandString: string): void {
    this.DnDBot.sendMessage(messageId, "I'm sorry, but I have no records of a \"" + commandString + "\" command. Try running /help to see a full list of basic commands.");
  }
}
