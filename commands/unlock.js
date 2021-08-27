const fs = require('fs')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.')
        )
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.lockedChannels.includes(channel.id)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🧙‍♂️・。Ce salon n\'est pas vérrouillé.')
        )
        client.db.lockedChannels.splice(client.db.lockedChannels.indexOf(channel.id), 1)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🧙‍♂️・。Ce salon a été déverrouillé !')
        )
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNLOCK] ${channel.name}`)
            .addField('Salon', channel, true)
            .addField('Modérateur', message.author, true))
    },
    name: 'unlock',
    guildOnly: true
}