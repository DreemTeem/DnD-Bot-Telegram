import { Canvas } from "canvas";
import * as TelegramBot from 'node-telegram-bot-api';
import { DiceImageGenerator } from "../utility/dice-image-generator";

const Bot = require('node-telegram-bot-api');

export interface RollResult {
  diceSides: number;
  numberOfDice: number;
  rolls: number[];
  result: number;
}

export class RollCommands {
  private GBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.GBot = botReference;
    this.setRollCommand();
  }

  private setRollCommand(): void {
    this.GBot.onText(/^\/roll/i, (msg: TelegramBot.Message): void => {

      const commandArray: string[] = msg.text.split(" ");
      const verbose: boolean = msg.text.includes(" -v");

      let diceMatches = commandArray.map(arg => { return arg.match(/([1-9][0-9]*){0,1}d([1-9][0-9]*)/); });

      // Remove nulls to avoid accidentally triggering the if rather than else case when there aren't actual matches
      diceMatches = diceMatches.filter(regExMatch => {
        return regExMatch !== null;
      });

      if (!diceMatches || !diceMatches.length) {
        this.sendRollMessage(msg.chat.id, 20, 1, verbose);
      } else {
        // If there's no leading number, we accept that as a single dice roll
        diceMatches.forEach(regExMatch => {
          const potentialNumberOfDice: number = parseInt(regExMatch[1], 10);
          if (isNaN(potentialNumberOfDice)) {
            regExMatch[1] = '1';
          }
        });

        diceMatches.forEach(diceMatch => {
          const numberOfDice: number = parseInt(diceMatch[1], 10);
          const diceSize: number = parseInt(diceMatch[2], 10);
          this.sendRollMessage(msg.chat.id, diceSize, numberOfDice, verbose);
        });
      }
    });

    this.GBot.onText(/^\/flip/i, (msg: TelegramBot.Message): void => {
      const result = Math.floor(Math.random() * 2) + 1;
      if (result === 1) {
        this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/heads.png', { caption: 'Heads' });
      } else {
        this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/tails.png', { caption: 'Tails' });
      }
    });
  }

  private async sendRollMessage(msgId: any, diceSize: number, numberOfDice: number, verbose: boolean = false) {
    const rollResult: RollResult = {
      diceSides: diceSize,
      numberOfDice: numberOfDice,
      rolls: [],
      result: 0
    };

    for (let i: number = 0; i < numberOfDice; i++) {
      const currentRoll: number = Math.floor(Math.random() * diceSize) + 1;
      rollResult.rolls.push(currentRoll);
      rollResult.result += currentRoll;
    }

    const image = DiceImageGenerator.getDiceImage(rollResult);
    const caption: string = "Rolled " + numberOfDice + "d" + diceSize + " for a total of " + rollResult.result;
    let verboseCaption = "";
    if (verbose) {
      verboseCaption = "Rolling " + numberOfDice + "d" + diceSize + "s\n";
      for (let i: number = 0; i < numberOfDice; i++) {
        verboseCaption += "Rolled 1d" + diceSize + " for " + rollResult.rolls[i] + "\n";
      }
      verboseCaption += "Final result is " + rollResult.result + "\n";
    }
    image.then(
      (canvas: Canvas) => {
        if (verbose) {
          this.GBot.sendPhoto(msgId, canvas.toBuffer(), { caption: verboseCaption });
        } else {
          this.GBot.sendPhoto(msgId, canvas.toBuffer(), { caption: caption });
        }
        
      }, () => {
        if (verbose) {
          this.GBot.sendMessage(msgId, verboseCaption);
        } else {
          this.GBot.sendMessage(msgId, caption);
        }
      });
  }
}
