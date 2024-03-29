import * as TelegramBot from 'node-telegram-bot-api';
import { SpireChallenges } from "../data-assets/spire-challenges";
import { CustomChallenges } from "../data-assets/spire-challenges/custom";

export class SpireCommands {
  private GBot: TelegramBot;

  constructor(botReference: TelegramBot) {
    this.GBot = botReference;
    this.setSpireCommand();
  }

  private setSpireCommand(): void {
    this.GBot.onText(/^\/spire/i, (msg: TelegramBot.Message): void => {
      const commandArray: string[] = msg.text.split(' ');
      const challengeIndex = commandArray.indexOf('-c');
      const genericChallengeIndex = commandArray.indexOf('-gc');
      const ascensionIndex = commandArray.indexOf('-a');
      const customRunIndex = commandArray.indexOf('-cu');

      const ironcladFlag = commandArray.indexOf('-ir');
      const silentFlag = commandArray.indexOf('-si');
      const defectFlag = commandArray.indexOf('-de');
      const watcherFlag = commandArray.indexOf('-wa');

      let character;

      // If no character flag was given
      if (
        ironcladFlag === -1 &&
        silentFlag === -1 &&
        defectFlag === -1 &&
        watcherFlag === -1
      ) {
        character = SpireChallenges.characters.ironclad;
        const result = Math.floor(Math.random() * 4);
        switch (result) {
          case 1:
            character = SpireChallenges.characters.silent;
            break;
          case 2:
            character = SpireChallenges.characters.defect;
            break;
          case 3:
            character = SpireChallenges.characters.watcher;
            break;
        }
      } else {
        const characterFlagArray = [
          ironcladFlag,
          silentFlag,
          defectFlag,
          watcherFlag
        ];
        const sortedIndexes = characterFlagArray.sort((a, b) => {
          if (a === b) {
            return 0;
          }
          return (a < b ? -1 : 1)
        });
        let firstCharacterFlagIndex: number = -1;
        let sortedIndexesIndex: number = 0;
        while (firstCharacterFlagIndex === -1) {
          firstCharacterFlagIndex = sortedIndexes[sortedIndexesIndex];
          sortedIndexesIndex++;
        }

        switch (firstCharacterFlagIndex) {
          case ironcladFlag:
            character = SpireChallenges.characters.ironclad;
            break;
          case silentFlag:
            character = SpireChallenges.characters.silent;
            break;
          case defectFlag:
            character = SpireChallenges.characters.defect;
            break;
          case watcherFlag:
            character = SpireChallenges.characters.watcher;
            break;
        }
      }

      const promise = this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/spire/' + character.imageName, { caption: character.intro });

      promise.then(() => {
        if (ascensionIndex > 0) {
          const randomAscension: number = Math.floor(Math.random() * 21);
          if (randomAscension > 0) {
            this.GBot.sendMessage(msg.chat.id, 'BE ASCENDED TO LEVEL ' + randomAscension);
          } else {
            this.GBot.sendMessage(msg.chat.id, 'DO NOT BE ASCENDED');
          }
        }

        if (customRunIndex > 0) {
          this.GBot.sendMessage(msg.chat.id, 'IN THE MOOD FOR MORE CHAOS?');
          let numChallenges = 1;
          if (customRunIndex < commandArray.length - 1) {
            const nextIndexNumber = parseInt(commandArray[customRunIndex + 1], 10);
            if (!isNaN(nextIndexNumber)) {
              numChallenges = nextIndexNumber;
            }
          }

          const addedChallengeIndexes = [];
          let addedChallenges = [];
          let availableChallenges = [].concat(SpireChallenges.customChallenges.challenges);

          SpireChallenges.customChallenges.uniqueChallenges.forEach((challengeObj) => {
            if (challengeObj.challenges) {
              const uniqueChallengeIndex = Math.floor(Math.random() * challengeObj.challenges.length);
              availableChallenges.push(challengeObj.challenges[uniqueChallengeIndex]);
            }
          });

          if (numChallenges > availableChallenges.length) {
            numChallenges = availableChallenges.length;
          }

          for (let i = 0; i < numChallenges; i++) {
            let newChallengeIndex = Math.floor(Math.random() * availableChallenges.length);

            while (addedChallengeIndexes.indexOf(newChallengeIndex) >= 0) {
              newChallengeIndex = Math.floor(Math.random() * availableChallenges.length);
            }
            addedChallengeIndexes.push(newChallengeIndex);
          }

          addedChallengeIndexes.sort((a,b) => a - b).forEach(index => {
            addedChallenges.push(availableChallenges[index]);
          });

          // Daily mods overrides everything else so if it's selected it's all you'll see
          if (addedChallengeIndexes.indexOf(CustomChallenges.dailyModsIndex) >= 0) {
            addedChallenges = [availableChallenges[CustomChallenges.dailyModsIndex]];
          }

          let message = '';
          addedChallenges.forEach(challegeString => {
            message += '- ' + challegeString + '\n';
          });
          this.GBot.sendMessage(msg.chat.id, message);
        }

        if (challengeIndex > 0 || genericChallengeIndex > 0) {
          this.GBot.sendMessage(msg.chat.id, 'TIME FOR A \nCHALLENGE...');
          let numChallenges = 1;
          if (challengeIndex < commandArray.length - 1) {
            const nextIndexNumber = parseInt(commandArray[challengeIndex + 1], 10);
            if (!isNaN(nextIndexNumber)) {
              numChallenges = nextIndexNumber;
            }
          }

          if (numChallenges === 1 && genericChallengeIndex < commandArray.length - 1) {
            if (genericChallengeIndex < commandArray.length - 1) {
              const nextIndexNumber = parseInt(commandArray[genericChallengeIndex + 1], 10);
              if (!isNaN(nextIndexNumber)) {
                numChallenges = nextIndexNumber;
              }
            }
          }

          const addedChallengeIndexes = [];
          const addedChallenges = [];
          let availableChallenges = [].concat(character.challenges);

          if (character.uniqueChallenges && character.uniqueChallenges.length) {
            character.uniqueChallenges.forEach((challengeObj) => {
              if (challengeObj.challenges) {
                const uniqueChallengeIndex = Math.floor(Math.random() * challengeObj.challenges.length);
                availableChallenges.push(challengeObj.challenges[uniqueChallengeIndex]);
              }
            });
          }

          if (genericChallengeIndex > 0) {
            availableChallenges = availableChallenges.concat(SpireChallenges.genericChallenges);

            SpireChallenges.genericChallenges.uniqueChallenges.forEach((challengeObj) => {
              if (challengeObj.challenges) {
                const uniqueChallengeIndex = Math.floor(Math.random() * challengeObj.challenges.length);
                availableChallenges.push(challengeObj.challenges[uniqueChallengeIndex]);
              }
            });
          }

          if (numChallenges > availableChallenges.length) {
            numChallenges = availableChallenges.length;
          }

          for (let i = 0; i < numChallenges; i++) {
            let newChallengeIndex = Math.floor(Math.random() * availableChallenges.length);
            while (addedChallengeIndexes.indexOf(newChallengeIndex) >= 0) {
              newChallengeIndex = Math.floor(Math.random() * availableChallenges.length);
            }
            addedChallengeIndexes.push(newChallengeIndex);
            addedChallenges.push(availableChallenges[newChallengeIndex]);
          }
          let message = '';
          addedChallenges.forEach(challegeString => {
            message += '- ' + challegeString + '\n';
          });
          this.GBot.sendMessage(msg.chat.id, message);
        }
      });
    });
  }
}
