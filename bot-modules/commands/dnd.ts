import TelegramBot = require("node-telegram-bot-api");

export class DnDCommands {
  private DnDBot: TelegramBot;
  private request = require("request");
  private cheerio = require("cheerio");

  constructor(botReference: TelegramBot) {
    this.DnDBot = botReference;
    this.setDnDCommand();
    this.setSpellCommand();
  }

  // TODO: Add integration for the following sites:
  // http://dnd.arkalseif.info/lookup/search.php - General DnD stuff (better than current SRD)
  // http://monsterfinder.dndrunde.de/ - Monster finder

  /**
   * Basic setup function to wrap the dnd search command.
   * If no search parameters are offered after the command
   * the user is presented with a generic error.
   */
  private setDnDCommand(): void {
    this.DnDBot.onText(/^\/dnd/i, (msg: any, match: any): void => {
      const commandArray: string[] = msg.text.split(" ");
      if (commandArray.length === 1) {
        this.getGenericResponse(msg.chat.id);
      } else {
        switch (commandArray[1]) {
          default:
            this.getGenericSearch(msg.chat.id, commandArray.splice(1, commandArray.length).join(" "));
            break;
        }
      }
    });
  }

  /**
   * Basic setup function to wrap the spells search command.
   * If no search parameters are offered after the command
   * the user is presented with a generic error.
   */
  private setSpellCommand(): void {
    this.DnDBot.onText(/^\/spells/i, (msg: any, match: any): void => {
      const commandArray: string[] = msg.text.split(" ");
      if (commandArray.length === 1) {
        this.getGenericResponse(msg.chat.id);
      } else {
        switch (commandArray[1]) {
          default:
            this.getSpellSearch35(msg.chat.id, commandArray.splice(1, commandArray.length).join(" "));
            break;
        }
      }
    });
  }

  /**
   * Function to crawl through a search results page from
   * the DND Wiki using search parameters supplied by the user.
   * @param {number} messageId - ID of the Telegram chat where we send our resonse message.
   * @param {string} searchQuery - String containing search params that the user wants to look up.
   */
  private getGenericSearch(messageId: number, searchQuery: string): void {
    const uriRoot: string = "http://www.dandwiki.com";
    const uriSearch: string = encodeURIComponent(searchQuery);
    this.request.get(uriRoot + "/wiki/Special:Search?search=" + uriSearch + "&ns100=1&fulltext=Search+the+SRD", (error: any, response: any, body: any) => {
      if (response) {
        const $: any = this.cheerio.load(response.body);
        const mainResults: any = $(".mw-search-results").eq(0).find("li a");
        const messages: string[] = ["<b>Basic DnD Search Results</b>\n==============================\n"];
        // TODO: Add cases to provide better message when no results match searchQuery.
        mainResults.each((index: number, element: any) => {
          messages.push("  <a href=\"" + uriRoot + element.attribs.href + "\">" + element.attribs.title + "</a>\n");
        });
        // No search results found.
        if (messages.length === 1) {
          this.getNoResultsResponse(messageId, searchQuery);
        } else {
          this.DnDBot.sendMessage(messageId, messages.join(""), { parse_mode: "HTML", disable_web_page_preview: true });
        }
      } else if (error) {
        this.DnDBot.sendMessage(messageId, "Sorry, no results were returned.", { parse_mode: "HTML", disable_web_page_preview: true });
      } else {
        this.DnDBot.sendMessage(messageId, "Sorry, an unknown error has occured.", { parse_mode: "HTML", disable_web_page_preview: true });
      }
    });
  }

  /**
   * Function to crawl through a search results page from
   * the grimoire using search parameters supplied by the user.
   * This is for spells under the 5e ruleset.
   * TODO: Figure out a method to search between 3.5 and 5 rulesets. For now 3.5 is used.
   * @param {number} messageId - ID of the Telegram chat where we send our resonse message.
   * @param {string} searchQuery - String containing search params that the user wants to look up.
   */
  private getSpellSearch5(messageId: number, searchQuery: string): void {
    const uriRoot: string = "https://thebombzen.com/";
    const uriSearch: string = encodeURIComponent(searchQuery);
    this.request.get(uriRoot + "grimoire/", (error: any, response: any, body: any) => {
      if (response) {
        const $: any = this.cheerio.load(response.body);
        const mainResults: any = $("ul.post-list.jetsContent li a");
        const messages: string[] = ["<b>DnD 5e Spell Search Results</b>\n==============================\n"];
        // TODO: Add cases to provide better message when no results match searchQuery.
        mainResults.each((index: number, element: any) => {
          const spellName: string = $(element).text();
          if (spellName.toLowerCase().includes(searchQuery.toLowerCase())) {
            messages.push("  <a href=\"" + uriRoot + element.attribs.href + "\">" + spellName + "</a>\n");
          }
        });
        // No search results found.
        if (messages.length === 1) {
          this.getNoResultsResponse(messageId, searchQuery);
        } else {
          this.DnDBot.sendMessage(messageId, messages.join(""), { parse_mode: "HTML", disable_web_page_preview: true });
        }
      } else if (error) {
        this.DnDBot.sendMessage(messageId, "Sorry, no results were returned.", { parse_mode: "HTML", disable_web_page_preview: true });
      } else {
        this.DnDBot.sendMessage(messageId, "Sorry, an unknown error has occured.", { parse_mode: "HTML", disable_web_page_preview: true });
      }
    });
  }

  /**
   * Function to crawl through a search results page from
   * the grimoire using search parameters supplied by the user.
   * This is for spells under the 3.5e ruleset.
   * @param {number} messageId - ID of the Telegram chat where we send our resonse message.
   * @param {string} searchQuery - String containing search params that the user wants to look up.
   */
  private getSpellSearch35(messageId: number, searchQuery: string): void {
    // TODO: Integrate the ability to utilize the full search query params below
    // name=tentacles&range=&spell_resistance=&area=&duration=&saving_throw=&casting_time=&school__slug=&sub_school__slug=&descriptors__slug=&verbal_component=1&somatic_component=1&material_component=1&arcane_focus_component=1&divine_focus_component=1&xp_component=1&rulebook__slug=&description=&class_levels__slug=&domain_levels__slug=&_filter=Filter
    const uriRoot: string = "https://dndtools.net";
    const uriSearch: string = encodeURIComponent(searchQuery);
    this.request.get(uriRoot + "/spells/?name=" + searchQuery, (error: any, response: any, body: any) => {
      if (response) {
        const $: any = this.cheerio.load(response.body);
        const mainResults: any = $("table.common tr");
        const messages: string[] = ["<b>DnD 3.5 Spell Search Results</b>\n==============================\n"];
        // TODO: Add cases to provide better message when no results match searchQuery.
        mainResults.each((index: number, element: any) => {
          const firstCell = $(element).find("td").eq(0).find("a");
          const spellName: string = $(firstCell).text();
          if (firstCell && spellName.toLowerCase().includes(searchQuery.toLowerCase())) {
            messages.push("  <a href=\"" + uriRoot + firstCell[0].attribs.href + "\">" + spellName + "</a>\n");
          }
        });
        // No search results found.
        if (messages.length === 1) {
          this.getNoResultsResponse(messageId, searchQuery);
        } else {
          this.DnDBot.sendMessage(messageId, messages.join(""), { parse_mode: "HTML", disable_web_page_preview: true });
        }
      } else if (error) {
        this.DnDBot.sendMessage(messageId, "Sorry, no results were returned.", { parse_mode: "HTML", disable_web_page_preview: true });
      } else {
        this.DnDBot.sendMessage(messageId, "Sorry, an unknown error has occured.", { parse_mode: "HTML", disable_web_page_preview: true });
      }
    });
  }

  /**
   * Helper function to send the user a message letting them
   * know they need to use parameters with the command they used.
   * @param {number} messageId - ID of the Telegram chat where we send our resonse message.
   */
  private getGenericResponse(messageId: number): void {
    this.DnDBot.sendMessage(messageId, "Hello! Try searching with parameters after this command. :)", { parse_mode: "HTML", disable_web_page_preview: true });
  }

  /**
   * Helper function to send the user a message letting them
   * know their search query returned no results.
   * @param {number} messageId - ID of the Telegram chat where we send our resonse message.
   * @param {string} messageId - The failed search query.
   */
  private getNoResultsResponse(messageId: number, searchQuery: string): void {
    this.DnDBot.sendMessage(messageId, "No search results found with the query \"" + searchQuery + "\". Please try to refine or change your search.", { parse_mode: "HTML", disable_web_page_preview: true });
  }
}
