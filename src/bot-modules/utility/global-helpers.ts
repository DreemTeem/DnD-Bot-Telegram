export class GlobalHelpers {
    public static isMax(msg: any) {
        return msg?.from?.id === 1043962241;
    }

    public static deleteCommandMessage(bot: any, msg: any) {
        // If bot isn't an Admin in the chat, the deleteMessage will error out.
        bot.deleteMessage(msg.chat.id, msg.message_id);
    }
}