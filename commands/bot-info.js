const Discord = require('discord.js')
const Img = new Discord.MessageAttachment('./images/info.png');

module.exports = {
  run: message => {
    message.channel.send(new Discord.MessageEmbed()
      .setColor('#fff100')
      .setTitle('📑・Informations Bot')
      .addFields({
        name: '🌺・。Créateur :',
        value: 'MrShadow Senpai#9634'
      }, {
        name: '🥂・。Serveur :',
        value: 'mon serveur est en creations..'
      }, )
      .setImage('https://zupimages.net/up/21/34/00iu.png')
      .setTimestamp())
  },
  name: 'bot-info',
  help: {
      description: 'Permet de se renseigner sur le bot. ',
      syntax: ''
  }
}