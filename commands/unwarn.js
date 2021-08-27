const fs = require('fs')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.')
        )
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👥・。Veuillez mentionner le membre à unwarn.')
        )
        if (!client.db.warns[member.id]) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('📑・。Ce membre n\'a aucun warn.')
        )
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Ce warn n\'existe pas.')
        )
        const {
            reason
        } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription(`🦾・。${member} a été unwarn pour ${reason} !`)
        )
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNWARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Warn supprimé', reason, true))
    },
    name: 'unwarn',
    guildOnly: true
}