const fs = require('fs')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args, client) => {
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#fff100')
        .setDescription("Server Name :", message.guild.name,
        "Memer Count : ", message.guild.memberCount)
        )
    },
    name: 'server',
    guildOnly: true,
    help: {
        description: '',
        syntax: ''
    }
}