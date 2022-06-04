const fs = require('fs')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args, client) => {
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#fff100')
        .setDescription(message.guild.name, message.guild.memberCount)
        )
        .addField('General', [
            `**Name:** ${message.guild.name}`,
            `**ID:** ${message.guild.id}`,
            `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`
        ])
    },
    name: 'server',
    guildOnly: true,
    help: {
        description: '',
        syntax: ''
    }
}