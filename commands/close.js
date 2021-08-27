const fs = require('fs')
const Discord = require('discord.js')
 
module.exports = {
    run: async (message, args, client) => {
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.tickets[channel.id]) return message.channel.send(new Discord.MessageEmbed()
        .setColor("fff100")
        .setDescription('🙅‍♂️・。Ce salon n\'est pas un ticket.'))
        if (!message.member.hasPermission('MANAGE_MESSAGES') && client.db.tickets[channel.id].author !== message.author.id) return message.channel.send(new Discord.MessageEmbed()
        .setColor("fff100")
        .setDescription('🙅‍♂️・。Vous n\'avez pas la permission de fermer ce ticket.'))
        delete client.db.tickets[channel.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        await message.channel.send(new Discord.MessageEmbed()
        .setColor("fff100")
        .setDescription(`🦾・。Le ticket ${channel.name} a été fermé !`))
        channel.delete()
    },
    name: 'close',
    guildOnly: true
}