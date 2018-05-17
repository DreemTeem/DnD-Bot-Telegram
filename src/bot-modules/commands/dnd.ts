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

  private setSpellCommand(): void {
    this.DnDBot.onText(/^\/spells/i, (msg: any, match: any): void => {
      const commandArray: string[] = msg.text.split(" ");
      if (commandArray.length === 1) {
        this.getGenericResponse(msg.chat.id);
      } else {
        switch (commandArray[1]) {
          default:
            this.getSpellSearch(msg.chat.id, commandArray.splice(1, commandArray.length).join(" "));
            break;
        }
      }
    });
  }

  private getGenericSearch(messageId: number, searchQuery: string): void {
    const uriRoot: string = "http://www.dandwiki.com";
    const uriSearch: string = encodeURIComponent(searchQuery);
    this.request.get(uriRoot + "/wiki/Special:Search?search=" + uriSearch + "&ns100=1&fulltext=Search+the+SRD", (error: any, response: any, body: any) => {
      if (response) {
        const $: any = this.cheerio.load(response.body);
        const mainResults: any = $(".mw-search-results").eq(0).find("li a");
        let message: string = "<b>Basic DnD Search Results</b>\n==============================\n";
        // TODO: Add cases to provide better message when no results match searchQuery.
        mainResults.each((index: number, element: any) => {
          message += "  <a href=\"" + uriRoot + element.attribs.href + "\">" + element.attribs.title + "</a>\n";
        });
        this.DnDBot.sendMessage(messageId, message, { parse_mode: "HTML", disable_web_page_preview: true });
      } else if (error) {
        this.DnDBot.sendMessage(messageId, "Sorry, no results were returned.", { parse_mode: "HTML", disable_web_page_preview: true });
      } else {
        this.DnDBot.sendMessage(messageId, "Sorry, an unknown error has occured.", { parse_mode: "HTML", disable_web_page_preview: true });
      }
    });
  }

  private getSpellSearch(messageId: number, searchQuery: string): void {
    const uriRoot: string = "https://thebombzen.com/";
    const uriSearch: string = encodeURIComponent(searchQuery);
    this.request.get(uriRoot + "grimoire/", (error: any, response: any, body: any) => {
      if (response) {
        const $: any = this.cheerio.load(response.body);
        const mainResults: any = $("ul.post-list.jetsContent li a");
        let message: string = "<b>Basic DnD Search Results</b>\n==============================\n";
        // TODO: Add cases to provide better message when no results match searchQuery.
        mainResults.each((index: number, element: any) => {
          const spellName: string = $(element).text();
          if (spellName.toLowerCase().includes(searchQuery.toLowerCase())) {
            message += "  <a href=\"" + uriRoot + element.attribs.href + "\">" + spellName + "</a>\n";
          }
        });
        this.DnDBot.sendMessage(messageId, message, { parse_mode: "HTML", disable_web_page_preview: true });
      } else if (error) {
        this.DnDBot.sendMessage(messageId, "Sorry, no results were returned.", { parse_mode: "HTML", disable_web_page_preview: true });
      } else {
        this.DnDBot.sendMessage(messageId, "Sorry, an unknown error has occured.", { parse_mode: "HTML", disable_web_page_preview: true });
      }
    });
  }

  private getGenericResponse(messageId: number): void {
    this.DnDBot.sendMessage(messageId, "Hello! Try searching with parameters after this command. :)", { parse_mode: "HTML", disable_web_page_preview: true });
  }
}
