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
            `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
            `**Region:** ${regions[message.guild.region]}`,
            `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
            `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
            `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
            `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`,
            '\u200b'
        ])
    },
    name: 'server',
    guildOnly: true,
    help: {
        description: '',
        syntax: ''
    }
}