import * as TelegramBot from "node-telegram-bot-api";
import { RoRChallenges } from "../data-assets/ror-challenges";

export class RoRCommands {
  private GBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.GBot = botReference;
    this.setRoRCommand();
  }

  private setRoRCommand(): void {
    this.GBot.onText(/^\/ror/i, (msg: TelegramBot.Message): void => {
      const commandArray: string[] = msg.text.split(" ");
      const challengeIndex = commandArray.indexOf("-c");

      const commandoFlag = commandArray.indexOf("-co");
      const huntressFlag = commandArray.indexOf("-hu");
      const banditFlag = commandArray.indexOf("-ba");
      const multFlag = commandArray.indexOf("-mu");
      const engineerFlag = commandArray.indexOf("-en");
      const artificerFlag = commandArray.indexOf("-ar");
      const mercenaryFlag = commandArray.indexOf("-me");
      const rexFlag = commandArray.indexOf("-re");
      const loaderFlag = commandArray.indexOf("-lo");
      const acridFlag = commandArray.indexOf("-ac");
      const captainFlag = commandArray.indexOf("-ca");
      const hereticFlag = commandArray.indexOf("-he");

      let character;

      // If no character flag was given
      if (
        commandoFlag === -1 &&
        huntressFlag === -1 &&
        banditFlag === -1 &&
        multFlag === -1 &&
        engineerFlag === -1 &&
        artificerFlag === -1 &&
        mercenaryFlag === -1 &&
        rexFlag === -1 &&
        loaderFlag === -1 &&
        acridFlag === -1 &&
        captainFlag === -1 &&
        hereticFlag === -1
      ) {
        character = RoRChallenges.characters.commando;
        const result = Math.floor(Math.random() * 12);
        switch (result) {
          case 1:
            character = RoRChallenges.characters.huntress;
            break;
          case 2:
            character = RoRChallenges.characters.bandit;
            break;
          case 3:
            character = RoRChallenges.characters.mult;
            break;
          case 4:
            character = RoRChallenges.characters.engineer;
            break;
          case 5:
            character = RoRChallenges.characters.artificer;
            break;
          case 6:
            character = RoRChallenges.characters.mercenary;
            break;
          case 7:
            character = RoRChallenges.characters.rex;
            break;
          case 8:
            character = RoRChallenges.characters.loader;
            break;
          case 9:
            character = RoRChallenges.characters.acrid;
            break;
          case 10:
            character = RoRChallenges.characters.captain;
            break;
          case 11:
            character = RoRChallenges.characters.heretic;
            break;
        }
      } else {
        const characterFlagArray = [
          commandoFlag,
          huntressFlag,
          banditFlag,
          multFlag,
          engineerFlag,
          artificerFlag,
          mercenaryFlag,
          rexFlag,
          loaderFlag,
          acridFlag,
          captainFlag,
          hereticFlag,
        ];
        const sortedIndexes = characterFlagArray.sort((a, b) => {
          if (a === b) {
            return 0;
          }
          return a < b ? -1 : 1;
        });
        let firstCharacterFlagIndex: number = -1;
        let sortedIndexesIndex: number = 0;
        while (firstCharacterFlagIndex === -1) {
          firstCharacterFlagIndex = sortedIndexes[sortedIndexesIndex];
          sortedIndexesIndex++;
        }

        switch (firstCharacterFlagIndex) {
          case commandoFlag:
            character = RoRChallenges.characters.commando;
            break;
          case huntressFlag:
            character = RoRChallenges.characters.huntress;
            break;
          case banditFlag:
            character = RoRChallenges.characters.bandit;
            break;
          case multFlag:
            character = RoRChallenges.characters.mult;
            break;
          case engineerFlag:
            character = RoRChallenges.characters.engineer;
            break;
          case artificerFlag:
            character = RoRChallenges.characters.artificer;
            break;
          case mercenaryFlag:
            character = RoRChallenges.characters.mercenary;
            break;
          case rexFlag:
            character = RoRChallenges.characters.rex;
            break;
          case loaderFlag:
            character = RoRChallenges.characters.loader;
            break;
          case acridFlag:
            character = RoRChallenges.characters.acrid;
            break;
          case captainFlag:
            character = RoRChallenges.characters.captain;
            break;
          case hereticFlag:
            character = RoRChallenges.characters.heretic;
            break;
        }
      }

      const promise = this.GBot.sendPhoto(
        msg.chat.id,
        __dirname + "/../../../assets/ror/" + character.imageName + '.png',
        { caption: character.intro }
      );

      promise.then(() => {

        if (challengeIndex > 0) {
        //   TODO: Setup challenges here.
        }
      });
    });
  }
}
