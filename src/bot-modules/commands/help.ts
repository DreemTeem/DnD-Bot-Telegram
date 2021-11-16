import TelegramBot = require('node-telegram-bot-api');
import { GeneratorCommandList } from './generate';

export class BaseCommandList {
  public static COMMANDS: any = {
    dnd: {
      title: "DnD",
      keys: ["dnd"],
      description: "The \/dnd command is used to search for DND related wiki pages based on provided critera."
    },
    generate: {
      title: "Generate",
      keys: ["g", "generate"],
      description: "The \/generate command is used to generate a variety of things from character stats to dungeon maps.",
      subcommands: GeneratorCommandList.COMMANDS
    },
    roll: {
      title: "Roll",
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
    this.DnDBot.onText(/^\/(h)|^\/(help)/i, (msg: TelegramBot.Message): void => {
      const commandArray: string[] = msg.text.split(" ");
      // TODO: Is this necessary anymore? Run tests to see if the updated REGEX covered the if statement
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
    let linesOfText: string[] = [
      "<b>Command: " + command.title + "</b>",
      "Aliase(s): " + command.keys.join(", "),
      "<i>" + command.description + "</i>\n"
    ];
    if (command.subcommands) {
      for (const key in command.subcommands) {
        if (key) {
          linesOfText = [...linesOfText, ...  this.getSubCommandInfoString(command.subcommands[key])];
        }
      }
    }

    return linesOfText.join("\n");
  }

  private getSubCommandInfoString(command: any): string[] {
    const linesOfText: string[] =  [
      "\t\t\t\t\t\t<b>Sub-Command: " + command.title +"</b>",
      "\t\t\t\t\t\tAliase(s): " + command.keys.join(", "),
      "\t\t\t\t\t\t<i>" + command.description + "</i>\n"
    ];

    return linesOfText;
  }

  private listSingleDnDCommand(messageId: number, commandString?: string): void {
    if (BaseCommandList.COMMANDS[commandString]) {
      this.DnDBot.sendMessage(messageId, this.getCommandInfoString(BaseCommandList.COMMANDS[commandString]), { parse_mode: 'HTML', disable_web_page_preview: true });
    } else {

      for (const key in BaseCommandList.COMMANDS) {
        if (BaseCommandList.COMMANDS[key].keys.indexOf(commandString) >= 0) {
          this.DnDBot.sendMessage(messageId, this.getCommandInfoString(BaseCommandList.COMMANDS[key]), { parse_mode: 'HTML', disable_web_page_preview: true });
          return;
        }
      }
      this.listNoCommandFound(messageId, commandString);
    }
  }

  private listAllDnDCommands(messageId: number): void {
    let commandListStr: string = "Here is a list of the base commands that I can provide services for:\n\n";
    commandListStr += this.getCommandListString(BaseCommandList.COMMANDS);
    this.DnDBot.sendMessage(messageId, commandListStr, { parse_mode: 'HTML', disable_web_page_preview: true });
  }

  private listNoCommandFound(messageId: number, commandString: string): void {
    this.DnDBot.sendMessage(messageId, "I'm sorry, but I have no records of a \"" + commandString + "\" command. Try running /help to see a full list of basic commands.", { parse_mode: 'HTML', disable_web_page_preview: true });
  }
}
