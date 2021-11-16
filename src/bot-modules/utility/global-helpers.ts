import * as TelegramBot from 'node-telegram-bot-api';

export class GlobalHelpers {
    public static isMax(msg: TelegramBot.Message) {
        return msg?.from?.id === 1043962241;
    }

    public static isDerek(msg: TelegramBot.Message) {
        return msg?.from?.id === 358426865;
    }

    public static deleteCommandMessage(bot: TelegramBot, msg: TelegramBot.Message) {
        // If bot isn't an Admin in the chat, the deleteMessage will error out.
        bot.deleteMessage(msg.chat.id, msg.message_id.toString());
    }
}