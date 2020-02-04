const Bot = require('node-telegram-bot-api');

export class SpireCommands {
  private GBot;

  private static characters = {
    ironclad: {
      intro: "IT'S TIME FOR THE YEET KING HIMSELF. \n LET'S GET REDY TO FLEX OUR WAY TO FREEDOM. \n I R O N C L A D",
      challenges: {}
    },
    silent: {
      intro: "HUSH YOUR MOUTH IT'S TIME TO POISON SOME FOOLS. \n LEAVE THE SHIVS BEHIND AND BECOME A SPOOKY GHOST. \n S I L E N T",
      challenges: {}
    },
    defect: {
      intro: "WE'RE GONNA CLAW OUR WAY TO VICTORY WITH THIS ONE, BOYS. \n DEFRAG YOUR BRAINS AND WISH UPON A STAR FOR CALIPERS. \n D E F E C T",
      challenges: {}
    },
    watcher: {
      intro: "HOW THE FUCK DOES THIS CHARACTER WORK AGAIN? \n WHO CARES, JUST PROSTRATE YOUR WAY TO VICTORY. \n W A T C H E R",
      challenges: {}
    }
  }

  constructor(botReference) {
    this.GBot = botReference;
    this.setSpireCommand();
  }

  private setSpireCommand(): void {
    console.log('\n\nSETTING SPIRE\n\n');
    this.GBot.onText(/^\/spire/i, (msg: any, match: any): void => {
      console.log('\n\nSPIRE COMMAND THROWN\n\n')
      const result = Math.floor(Math.random() * 4);
      this.GBot.sendMessage(msg.chat.id, "RESULT " + result);
      // switch (result) {
      //   case 0:
      //     this.GBot.sendMessage(msg.chat.id, "RESULT " + result);
      //     // this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/spire/ironclad.jpg', { caption: SpireCommands.characters.ironclad.intro });
      //     break;
      //   case 1:
      //     this.GBot.sendMessage(msg.chat.id, "RESULT " + result);
      //     // this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/spire/silent.jpg', { caption: SpireCommands.characters.silent.intro });
      //     break;
      //   case 2:
      //     this.GBot.sendMessage(msg.chat.id, "RESULT " + result);
      //     // this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/spire/defect.jpg', { caption: SpireCommands.characters.defect.intro });
      //     break;
      //   case 3:
      //     this.GBot.sendMessage(msg.chat.id, "RESULT " + result);
      //     // this.GBot.sendPhoto(msg.chat.id, __dirname + '/../../../assets/spire/watcher.jpg', { caption: SpireCommands.characters.watcher.intro });
      //     break;
      // }
    });
  }
}
