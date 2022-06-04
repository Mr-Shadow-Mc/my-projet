const fs = require('fs')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args, client) => {
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#fff100')
        .setDescription(`**🌐・。Took ${Date.now() - message.createdTimestamp}ms**`)
    )
    },
    name: 'ping',
    guildOnly: true,
    help: {
        description: 'connaitre le ping du bot.',
        syntax: ''
    }
}