import * as TelegramBot from 'node-telegram-bot-api';
import { Card, Cards } from 'scryfall-sdk';

export class MTGSearch {
  private HBot: TelegramBot;
  private cardResultsByUserId: any = {};

  constructor(botReference: TelegramBot) {
    this.HBot = botReference;
    this.setMTGCommandParser();
  }

  /**
   * Basic setup function to enable our parser to call the search function
   */
  private setMTGCommandParser(): void {
    // Listener for messages beginning with '/mtg'
    this.HBot.onText(/^\/mtg/i, (msg: TelegramBot.Message, match: any): void => {
      const commandArray: string[] = msg.text.split(' ');
      if (commandArray.length === 1) {
        // TODO - Possibly integrate with native help commands?
        this.showMissingQuery(msg);
      } else {
        const fullQueryString: string = commandArray.splice(1, commandArray.length).join(' ');
        const queryObject: any = this.parseQueryString(fullQueryString);
        if (queryObject.flags && queryObject.flags.random) {
          this.getRandomMTGCard(msg);
        } else {
          this.searchMTGCards(msg, queryObject.queryString, queryObject.flags);
        }
      }
    });

    // Listener for the 'text' event from Telegram. Used to listen for possible user selections of keyboard options.
    this.HBot.on('text', (msg: TelegramBot.Message) => {
      if (this.cardResultsByUserId[msg.from.id]) {
        this.respondToMTGKeyboardReply(msg);
      }
    });
  }

  /**
   * Wrapper function to tell the user that they didn't provide a search query.
   * @param msg - The initial message sent to the bot. It allows us to send a message back.
   */
  private showMissingQuery(msg: TelegramBot.Message): void {
    this.HBot.sendMessage(msg.chat.id, `Please provide something for me to search for. Try your favorite card name!`);
  }

  /**
   * Function designed to take in the full query from a user and parse out
   * any and all applicable flags to use to trigger other searches or refine
   * the generic card search.
   * @param fullQueryString - Full query string including search params and flags.
   */
  private parseQueryString(fullQueryString: string): any {
    const indexOfFirstFlag: number = fullQueryString.indexOf(' -');
    // TODO: During flag integration- If other flags can be executed without a query before them, find a more robust solution to add them here.
    if (indexOfFirstFlag === -1 && fullQueryString.trim() !== '-r') {
      return {
        queryString: fullQueryString,
      };
    }
    // TODO: Fill out the following flags section with other appropriate flags.
    return {
      flags: {
        random: fullQueryString.indexOf(' -r') >= 0 || fullQueryString.trim() === '-r',
      },
      queryString: fullQueryString.slice(0, indexOfFirstFlag),
    };
  }

  /**
   * Helper function to send the user a random mtg card. This card will be any combination
   * of available API parameters meaning it likely won't be in English.
   * @param msg - The initial message sent to the bot. It allows us to send a message back.
   */
  private getRandomMTGCard(msg: TelegramBot.Message): void {
    Cards.random().then(
      (card: Card) => {
        const priceCaption: string = card.prices.usd ? `USD Price: $${card.prices.usd}` : null;
        this.HBot.sendPhoto(msg.chat.id, `${card.image_uris.normal}`, { caption: priceCaption });
      },
      (error: any) => {
        // This is for any unhandled errors that we're not expecting.
        this.HBot.sendMessage(msg.chat.id, `${error.response.body.details}`);
      },
    );
  }

  /**
   * Function to fetch MTG card data based on user inputs. If too many or no cards are found,
   * it will let the user know or provide steps for refining their search query.
   * @param msg - The initial message sent to the bot. It allows us to send a message back.
   * @param queryString - The custom query that was provided by the user.
   * @param params - Optional parameter that contains flags to refine the card search.
   */
  private searchMTGCards(msg: TelegramBot.Message, queryString: string, params?: any): void {
    this.HBot.sendMessage(msg.chat.id, `<b>Fetching MTG card results for "${queryString}"</b>\n`, { parse_mode: 'HTML', disable_web_page_preview: true });
    const cardResults: Card[] = [];
    // TODO: Work on flushing out the params provided by the parseQueryString function. Start with sets.
    Cards.search(queryString + ' order:released')
      // Called each time the API finds a card
      .on('data', (card: Card) => {
        cardResults.push(card);
      })
      // Called if the API encounters an error.
      .on('error', (error: any) => {
        // The 'error' object has the following keys: ['name', 'statusCode', 'message', 'error', 'options', 'response']
        // Default API error message from Scryfall can be used at error.response.body.details
        if (error.statusCode === 404) {
          // We use a custom message here because the help link in the orignal message refers to dead link
          this.HBot.sendMessage(msg.chat.id, `Sorry, your search query didn't match any cards. Please try refining your query or removing excess words.`);
        } else {
          // This is for any unhandled errors that we're not expecting.
          this.HBot.sendMessage(msg.chat.id, `${error.response.body.details}`);
        }
      })
      // Called once the API says there are no more cards left for us to get.
      .on('end', () => {
        if (cardResults.length === 1) {
          // If there's only one card, we send the info/image directly.
          this.sendSingleCardResult(msg, cardResults[0]);
        } else {
          const cardMatchFromName: Card = cardResults.find((card) => card.name.toLowerCase() === queryString.toLowerCase());
          if (cardMatchFromName) {
            this.sendSingleCardResult(msg, cardMatchFromName);
          } else {
            // If there are multiple cards, we provide up to the top 5 results and ask the user to refine.
            this.sendMultipleCardResults(msg, cardResults);
          }
        }
      });
  }

  /**
   * Function to search the ScryFall API using an existing cardId. If
   * a card is found, we will send it to the user.
   * @param msg - The initial message sent to the bot. It allows us to send a message back.
   * @param cardId - The Id of the card we want to send to the user.
   */
  private getMtgCardById(msg: TelegramBot.Message, cardId: string): void {
    Cards.byId(cardId).then(
      (result: Card) => {
        this.sendSingleCardResult(msg, result);
      },
      (error) => {
        this.HBot.sendMessage(msg.chat.id, `${error.response.body.details}`);
      },
    );
  }

  /**
   * Function to send user a single MTG card. Data is sent as a
   * picture with the caption of the USD price, if applicable.
   * @param msg - The initial message sent to the bot. It allows us to send a message back.
   * @param card - The Card data fetched from ScryFall.
   */
  private sendSingleCardResult(msg: TelegramBot.Message, card: Card): void {
    const priceCaption: string = card.prices.usd ? `USD Price: $${card.prices.usd}` : null;
    if (card.card_faces) {
      // Multi faced card case
      card.card_faces.forEach((cardFace: any, index: number) => {
        this.HBot.sendPhoto(msg.chat.id, `${cardFace.image_uris.normal}`,
        {
          caption: index === card.card_faces.length - 1 ? priceCaption : undefined,
          reply_markup: {
            remove_keyboard: true,
            selective: true,
          },
          reply_to_message_id: msg.message_id,
        });
      });
    } else {
      this.HBot.sendPhoto(msg.chat.id, `${card.image_uris.normal}`,
        {
          caption: priceCaption,
          reply_markup: {
            remove_keyboard: true,
            selective: true,
          },
          reply_to_message_id: msg.message_id,
        });
    }
  }

  /**
   * Function to let the user know their search result found more than one
   * result when using their query. We can display up to 120 results to the
   * user for them to select from along with a message asking for a refined
   * query.
   * @param msg - The initial message sent to the bot. It allows us to send a message back.
   * @param userCards - List of MTG cards that were returned from the user's search query.
   */
  private sendMultipleCardResults(msg: TelegramBot.Message, userCards: Card[]): void {
    let message: string = `Multiple cards found (${userCards.length}). Did you mean one of the following? If not, try refining or changing your query.\n`;
    if (userCards.length > 120) {
      message += `Results limited to 120\n`;
    }
    const keyboardCards: TelegramBot.InlineKeyboardButton[][] = [];

    userCards.forEach((card: Card, index: number) => {
      if (index < 120) {
        if (card.card_faces) {
          keyboardCards.push([{ text: card.name + ' - ' + card.card_faces[0].type_line }]);
        } else {
          keyboardCards.push([{ text: card.name + ' - ' + card.type_line }]);
        }
      }
    });

    // Associate the full results list to the message ID to use while interacting with our dialogues.
    this.cardResultsByUserId[msg.from.id] = userCards;

    this.HBot.sendMessage(msg.chat.id, message, {
      reply_markup: {
        keyboard: keyboardCards,
        one_time_keyboard: true,
        selective: true,
      },
      reply_to_message_id: msg.message_id,
    });
  }

  /**
   * Function to handle responses from keyboards sent to users. It processes
   * direct strings since that's all that regular keyboards can provide us,
   * and will look for either a preset command string such as 'Cancel', or it
   * will look for the requested card in the cached list of cards associated
   * with the user's original query.
   * @param msg - The message replying to/from the keyboard initially sent
   */
  private respondToMTGKeyboardReply(msg: TelegramBot.Message): void {
    const messageText: string = msg.text;
    const userId: number = msg.from.id;
    const cards: Card[] = this.cardResultsByUserId[userId];
    const targetCard: Card = cards.find((card: Card) => {
      if (card.card_faces) {
        // Multi faced card case
        return messageText === card.name + ' - ' + card.card_faces[0].type_line;
      } else {
        return messageText === card.name + ' - ' + card.type_line;
      }
    });

    if (targetCard) {
      this.sendSingleCardResult(msg, targetCard);
    }
    // TODO - consider failure case?
    delete this.cardResultsByUserId[userId];
  }

}
