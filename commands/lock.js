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
        if (client.db.lockedChannels.includes(channel.id)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🧙‍♂️・。Ce salon est déjà vérrouillé.')
        )
        client.db.lockedChannels.push(channel.id)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🧙‍♂️・。Ce salon a été verrouillé !')
        )
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[LOCK] ${channel.name}`)
            .addField('Salon', channel, true)
            .addField('Modérateur', message.author, true))
    },
    name: 'lock',
    guildOnly: true
}