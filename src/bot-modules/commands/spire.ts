const Bot = require('node-telegram-bot-api');

export class SpireCommands {
  private GBot;

  private static characters = {
    ironclad: {
      intro: "IT'S TIME FOR THE YEET KING HIMSELF. \n LET'S GET REDY TO FLEX OUR WAY TO FREEDOM. \n I R O N C L A D",
      imageName: "ironclad.jpg",
      challenges: [
        "GRIT YOUR TEETH - IT'S TIME TO TAKE ALL EXHAUST CARDS.",
        "IS THAT HELL YOU SMELL? - YOU HAVE TO TAKE BRIMSTONE! SAY HI TO THE BIRDS FOR ME.",
        "MUSCLE MILK \"GET SWOLE\" - YOU NOW HAVE TO TAKE ALL FLEX CARDS.",
        "THROW YOUR WEIGHT AROUND - YOU MUST BUILD A BODY SLAM DECK.",
        "WHILE YOU WERE PLAYING OTHER CHARACTERS I WAS STUDYING THE BLADE - TIME FOR A PERFECTED STRIKE RUN.",
        "I'M MORE INTO CARDIO - YOU ARE NOT ALLOWED TO TAKE ANY CARDS OR POTIONS THAT INCREASE STRENGTH."
      ],
      uniqueChallenges: [
        {
          challengeName: "BOSS_RELICS",
          challenges: [
            "NO PAIN NO GAIN - IF MARK OF PAIN IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
            "CUUUUBE - IF RUNIC CUBE IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
            "BLOOD TRANSFUSION - IF BLACK BLOOD IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)"
          ]
        }
      ]
    },
    silent: {
      intro: "HUSH YOUR MOUTH IT'S TIME TO POISON SOME FOOLS. \n LEAVE THE SHIVS BEHIND AND BECOME A SPOOKY GHOST. \n S I L E N T",
      imageName: "silent.jpg",
      challenges: [
        "NOTHING PERSONAL, KID - IT'S TIME FOR A SHIV DECK. TAKE ALL SHIVS AND SHIV POWERS.",
        "YOU ARE A SPOOKY GHOST - YOU MUST TAKE ALL AVAILABLE APPARITION.",
        "LET THEM COME TO YOU - CALTROPS MUST NOW BE TAKEN.",
        "REMOVING TOXICITY FROM MY LIFE - YOU AREN'T ALLOWED TO PICK UP CARDS OR POTIONS THAT CAUSE POISON.",
        "EXTREMELY SHOWY - IF GRAND FINALE IS AVAILABLE, YOU MUST TAKE IT."
      ],
      uniqueChallenges: [
        {
          challengeName: "BOSS_RELICS",
          challenges: [
            "IT'S BASICALLY A SHIV RUN - IF WRIST BLADE IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
            "LET'S GO FLY A KITE - IF HOVERING KITE IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
            "DANGER NOODLE -  IF RING OF THE SERPENT IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)"
          ]
        }
      ]
    },
    defect: {
      intro: "WE'RE GONNA CLAW OUR WAY TO VICTORY WITH THIS ONE, BOYS. \n DEFRAG YOUR BRAINS AND WISH UPON A STAR FOR CALIPERS. \n D E F E C T",
      imageName: "defect.jpg",
      challenges: [
        "EVER SEEN \"TOY STORY\"? - YOU MUST TAKE ALL CLAWS.",
        "STACK OVERFLOW - IF RECURSION IS AVAILABLE YOU MUST TAKE IT.",
        "ONE SHOT ONE KILL - YOU MUST TAKE ALL BULLSEYES.",
        "ONE FOR ALL! - YOUR DECK MUST BE THEMED AROUND 0-COST CARDS.",
        "I'MA FIREN MAH LAZAR - IF YOU SEE A HYPERBEAM, YOU HAVE TO TAKE IT.",
        "WHO LET SEPHEROTH PLAY? - TIME TO TAKE ALL METEOR STRIKES."
      ],
      uniqueChallenges: [
        {
          challengeName: "ORBS",
          challenges: [
            "ZIP ZAP MOTHERFUCKER - IT'S TIME TO \"FOCUS\" ON LIGHTNING ORBS.",
            "BABY IT'S COLD INSIDE MY HEART - IT'S TIME TO \"FOCUS\" ON FROST ORBS.",
            "DARKNESS CONSUMES ME - IT'S TIME TO \"FOCUS\" ON DARK ORBS."
          ]
        },
        {
          challengeName: "ORB_GEN",
          challenges: [
            "PASSIVE AGRESSIVE - YOU CAN'T GENERATE ORBS FROM ATTACK CARDS.",
            "AGRESSIVE MODE - YOU CAN'T GENERATE ORBS FROM SKILL CARDS (NOT COUNTING YOUR FIRST ZAP)."
          ]
        },
        {
          challengeName: "BOSS_RELICS",
          challenges: [
            "SURROUNDED BY ORBS - IF INSERTER ARM IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
            "CAN YOU PRONOUNCE IT? - IF NUCLEAR BATTERY IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
            "CHILL OUT - IF FROZEN CORE IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)"
          ]
        }
      ]
    },
    watcher: {
      intro: "HOW THE FUCK DOES THIS CHARACTER WORK AGAIN? \n WHO CARES, JUST PROSTRATE YOUR WAY TO VICTORY. \n W A T C H E R",
      imageName: "watcher.jpg",
      challenges: [
        "BOW DOWN - YOU HAVE TO TAKE ALL PROSTRATES.",
        "THE END IS NIGH - IF BLASPHEMOUS POPS UP, YOU GOTTA TAKE IT.",
        "IS THE PRESSURE TOO MUCH FOR YOU TO HANDLE? - TIME TO BUILD A PRESSURE POINTS DECK.",
        "ALPHA FEMALE - TAKE ALL OFFERED ALPHAS.",
        "PALADIN MODE - TAKE ANY CARD THAT ALLOWS YOU TO GENERATE SMITE CARDS.",
        "MARK IT ZERO - YOU ARE NOW REQUIRED TO TAKE ALL BOWLING BASHES.",
        "I CAN SEE THE FUTURE - TAKE ALL CARDS THAT GRANT YOU 'SCRY'.",
        "EMPTY YOURSELF - TAKE ALL EMPTY BODY, EMPTY FIST, AND EMPTY MIND CARDS.",
        "HUNGRY? - YOU MUST TAKE AT LEAST 2 FASTING CARDS IF THEY SHOW UP.",
        "THEY TOOK URRR JERBS - TAKE ALL FOREIGN INFLUENCE CARDS.",
        "BIGGER HAND IS BETTERER - IF THE CARD HAS 'RETAIN' ... TAKE IT.",
        "I AM... THE LAW - YOU MUST TAKE JUDGEMENT CARDS."
      ],
      uniqueChallenges: [
        {
          challengeName: "BOSS_RELICS",
          challenges: [
            "FLOWER POWER - IF VIOLET LOTUS IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
            "SLURP IT UP - IF HOLY WATER IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)"
          ]
        }
      ]
    }
  }

  public static genericChallenges = [
    "SO ... COLORFUL - YOU MUST TAKE PRISMATIC SHARD IF IT APPEARS",
    "FOLLOW DEREK'S ADVICE - IF THERE IS A CHANCE OR OPPORTUNITY FOR A CURSE, YOU MUST TAKE IT.",
    "YOU ARE THE BOMB! - NOT REALLY, BUT IF YOU SEE THE BOMB YOU MUST TAKE IT. MAKE MR TORGUE PROUD!",
    "DRINK UP! - TAKE ALL POTION RELATED RELICS AND CARDS.",
    "HEALTHY BOI! - TAKE ALL CHANCES TO INCREASE YOUR MAX HP (AS LONG AS IT DOESN'T KILL YOU).",
    "YOU GOT SOME BLOAT THERE - YOU CAN'T SKIP CARDS AT THE ENDS OF FIGHTS ANYMORE.",
    "NO MORE TOKING - YOU CAN NO LONGER REMOVE CARDS (IF YOU HAVE A CHOICE IN THE MATTER).",
    "MR POPULAR - YOU CAN NO LONGER JUST LEAVE AN EVENT WITHOUT DOING SOMETHING.",
    "THE MOST RIGHT WAY - YOU CAN'T SCROLL UP ON THE MAP. PRAY FOR WING BOOTS.",
    "MAXIMUM GREED - ALL CARDS AND RELICS THAT INCREASE YOUR GOLD MUST BE TAKEN.",
    "EMBRACE THE INSANITY - YOU MUST TAKE ALL MADNESS CARDS.",
    "CONTROLLED CHAOS - YOU MUST PICK UP AT LEAST ONE MAYHEM CARD IF AVAILABLE.",
    "HEARTBREAK - YOU REALLY WANT TO FACE THE HEART. YOU MUST TAKE HEART KEYS WHEN PRESENTED AND FACE THE SHINY IN ACT I."
  ];

  public static uniqueGenericChallenges = [
    {
      challengeName: "SNECKO",
      challenges: [
        "PRAISE SNECKO - YOU MUST TAKE SNECKO EYE NO MATTER WHAT IF IT SHOWS.",
        "HERECY - YOU ARE FORBIDDEN FROM TAKING SNECKO EYE OR USING SNECKO OIL."
      ]
    },
    {
      challengeName: "BOSS_RELIC",
      challenges: [
        "DON'T CHOKE - IF THE CHOKER IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)",
        "VOW OF POVERTY - IF ECTOPLASM IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)",
        "NO SLEEP TIL ACT IV - IF COFFEE DRIPPER IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)",
        "I WANT TO DIE TO BIRDS - IF PHILOSOPHER'S STONE IF OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)",
        "PROHIBITION ERA RUN - IF SOZU IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)",
        "DEREK SEES NO DOWNSIDE - IF CURSED KEY IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)",
        "WILL WILL SMITH SMITH? NO - IF FUSION HAMMER IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)",
        "SLAVES ARE SLAVES - IF SLAVER'S COLLAR IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" OR CHARACTER SPECIFIC RULE)"
      ]
    },
    {
      challengeName: "FIRE_RELICS",
      challenges: [
        "MASTER OF NONE - TAKE RELICS THAT GIVE YOU SOMETHING EXTRA TO DO AT FIRES WHENEVER POSSIBLE.",
        "DIG! - IF YOU SEE THE SHOVEL, YOU MUST TAKE IT. IF YOU HAVE THE SHOVEL, YOU MUST DIG.",
      ]
    }
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
      const ascensionIndex = commandArray.indexOf('-a');

      let result = Math.floor(Math.random() * 4);
      let character = SpireCommands.characters.ironclad;
      result = 1;
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
        if (ascensionIndex > 0) {
          const randomAscension: number = Math.floor(Math.random() * 21);
          if (randomAscension > 0) {
            this.GBot.sendMessage(msg.chat.id, 'BE ASCENDED TO LEVEL ' + randomAscension);
          } else {
            this.GBot.sendMessage(msg.chat.id, 'DO NOT BE ASCENDED');
          }
        }

        if (challengeIndex > 0 || genericChallengeIndex > 0) {
          this.GBot.sendMessage(msg.chat.id, 'Time for a\nCHALLENGE...');
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
            availableChallenges = availableChallenges.concat(SpireCommands.genericChallenges);

            SpireCommands.uniqueGenericChallenges.forEach((challengeObj) => {
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
