const Bot = require('node-telegram-bot-api');

export class SpireCommands {
  private GBot;

  private static characters = {
    ironclad: {
      intro: "IT'S TIME FOR THE YEET KING HIMSELF. \n LET'S GET REDY TO FLEX OUR WAY TO FREEDOM. \n I R O N C L A D",
      imageName: "ironclad.jpg",
      challenges: [
        "GRIT YOUR TOUGH - IT'S TIME TO TAKE ALL EXHAUST CARDS",
        "MUSCLE MILK \"GET SWOLE\" - YOU NOW HAVE TO TAKE ALL FLEX CARDS"
      ]
    },
    silent: {
      intro: "HUSH YOUR MOUTH IT'S TIME TO POISON SOME FOOLS. \n LEAVE THE SHIVS BEHIND AND BECOME A SPOOKY GHOST. \n S I L E N T",
      imageName: "silent.jpg",
      challenges: [
        "NOTHING PERSONAL, KID - IT'S TIME FOR A SHIV DECK. TAKE ALL SHIVS AND SHIV POWERS.",
        "YOU ARE A SPOOKY GHOST - YOU MUST TAKE ALL AVAILABLE APPARITION"
      ]
    },
    defect: {
      intro: "WE'RE GONNA CLAW OUR WAY TO VICTORY WITH THIS ONE, BOYS. \n DEFRAG YOUR BRAINS AND WISH UPON A STAR FOR CALIPERS. \n D E F E C T",
      imageName: "defect.jpg",
      challenges: [
        "ZIP ZAP MOTHERFUCKER - IT'S TIME TO \"FOCUS\" ON LIGHTNING ORBS",
        "BABY IT'S COLD INSIDE MY HEART - IT'S TIME TO \"FOCUS\" ON FROST ORBS",
        "DARKNESS CONSUMES ME - IT'S TIME TO \"FOCUS\" ON DARK ORBS",
        "EVER SEEN \"TOY STORY\"? - YOU MUST TAKE ALL CLAWS"
      ]
    },
    watcher: {
      intro: "HOW THE FUCK DOES THIS CHARACTER WORK AGAIN? \n WHO CARES, JUST PROSTRATE YOUR WAY TO VICTORY. \n W A T C H E R",
      imageName: "watcher.jpg",
      challenges: [
        "BOW DOWN - YOU HAVE TO TAKE ALL PROSTRATES",
        "THE END IS NIGH - IF BLASPHEMOUS POPS UP, YOU GOTTA TAKE IT",
        "IS THE PRESSURE TOO MUCH FOR YOU TO HANDLE? - TIME TO BUILD A PRESSURE POINTS DECK"
      ]
    }
  }

  public static genericChallenges = [
    "PRAISE SNECKO - YOU MUST TAKE SNECKO EYE NO MATTER WHAT IF IT SHOWS",
    "HERECY - YOU ARE FORBIDDEN FROM TAKING SNECKO EYE OR USING SNECKO OIL",
    "SO ... COLORFUL - YOU MUST TAKE PRISMATIC SHARD IF IT APPEARS",
    "FOLLOW DEREK'S ADVICE - IF THERE IS A CHANCE OR OPPORTUNITY FOR A CURSE, YOU MUST TAKE IT",
    "DIG! - IF YOU SEE THE SHOVEL, YOU MUST TAKE IT. IF YOU HAVE THE SHOVEL, YOU MUST DIG."
  ];

  constructor(botReference) {
    this.GBot = botReference;
    this.setSpireCommand();
  }

  private setSpireCommand(): void {
    this.GBot.onText(/^\/spire/i, (msg: any, match: any): void => {
      const commandArray: string[] = msg.text.split(' ');
      const challengeIndex = commandArray.indexOf('-c');
      const genericChallengeIndex = commandArray.indexOf('-gc');

      const result = Math.floor(Math.random() * 4);
      let character = SpireCommands.characters.ironclad;
      switch (result) {
        case 1:
          character = SpireCommands.characters.silent;
          break;
        case 2:
          character = SpireCommands.characters.defect;
          break;
        case 3:
          character = SpireCommands.characters.watcher;
          break;
      }

      const promise = this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/spire/' + character.imageName, { caption: character.intro });

      promise.then(() => {
        if (challengeIndex > 0) {
          this.GBot.sendMessage(msg.chat.id, 'Time for a\nCHALLENGE...');
          let numChallenges = 1;
          if (challengeIndex < commandArray.length - 1) {
            const nextIndexNumber = parseInt(commandArray[challengeIndex + 1], 10);
            if (!isNaN(nextIndexNumber)) {
              numChallenges = nextIndexNumber;
            }
          }
          const addedChallengeIndexes = [];
          const addedChallenges = [];
          let availableChallenges = character.challenges;

          if (genericChallengeIndex > 0) {
            availableChallenges = availableChallenges.concat(SpireCommands.genericChallenges);
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
