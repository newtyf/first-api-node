const { Webhook, MessageBuilder } = require('discord-webhook-node');

const hook = new Webhook(process.env.WEBHOOK_URL_DISCORD);
const embed = (message) => {
  const returnEmbed = new MessageBuilder()
  .setTitle('Error')
  .setAuthor('Kages', 'https://i.pinimg.com/564x/b7/30/0a/b7300ab6be8a386df78b2ce155a832b7.jpg')
  .setColor('#E4230E')
  .setDescription(message)
  .setTimestamp();

  return returnEmbed;
}

let logsObject = []
const loggerStream = {
  write: (message) => {
    //hook.send(embed(message))
    logsObject.push(message)
    if (logsObject.length === 3) {
      hook.send(embed(logsObject.join("\n\n")))
      logsObject = []
    }
  },
};

module.exports = {loggerStream}