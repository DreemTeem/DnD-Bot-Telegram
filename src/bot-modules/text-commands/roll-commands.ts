import TelegramBot = require("node-telegram-bot-api");

export class RollCommands {
  private HBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.HBot = botReference;
    this.setRollCommand();
  }

  private setRollCommand(): void {
    this.HBot.onText(/^\/roll/i, (msg: any, match: any): void => {

      const commandArray: string[] = msg.text.split(" ");
      const verbose: boolean = msg.text.indexOf(" -v") > 0;
      const diceMatch: string[] = msg.text.match(/([1-9][0-9]*)d([1-9][0-9]*)/);

      console.log(msg);
      console.log(msg.text.match(/([1-9][0-9]*)d([1-9][0-9]*)/));

      if (!diceMatch) {
        this.HBot.sendMessage(msg.chat.id, this.getRollMessage(6, 1, verbose));
      } else {
        const numberOfDice: number = parseInt(diceMatch[1], 10);
        const diceSize: number = parseInt(diceMatch[2], 10);
        this.HBot.sendMessage(msg.chat.id, this.getRollMessage(diceSize, numberOfDice, verbose));
      }
    });
  }

  private getRollMessage(diceSize: number, numberOfDice: number, verbose: boolean = false): string {
    if (verbose) {
      let resultString: string = "Rolling " + numberOfDice + "d" + diceSize + "s\n";
      let totalRoll: number = 0;
      for (let i: number = 0; i < numberOfDice; i++) {
        const currentRoll: number = Math.floor(Math.random() * diceSize) + 1;
        totalRoll += currentRoll;
        resultString += "Rolled 1d" + diceSize + " for " + currentRoll + "\n";
      }
      resultString += "Final result is " + totalRoll + "\n";
      return resultString;
    } else {
      const limitedResult: number = (diceSize * numberOfDice) - numberOfDice;
      return "Rolled " + numberOfDice + "d" + diceSize + " for a total of " + (Math.floor(Math.random() * limitedResult) + numberOfDice + 1);
    }
  }
}
