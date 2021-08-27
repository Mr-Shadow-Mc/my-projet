const moment = require('moment'),
    Discord = require('discord.js')

moment.locale('fr')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setTitle('Erreur')
            .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.')
        )
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👥・。Veuillez mentionner le membre dont voir les warns.')
        )
        if (!client.db.warns[member.id]) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription("📑・。Ce membre n'a aucun warn."))
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription(`**📔・。Total de warns :** ${client.db.warns[member.id].length}\n\n__**🗓️・。10 derniers warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
    },
    name: 'infractions',
    guildOnly: true,
    help: {
        description: 'voir les infractions commis par un/des membre(s)',
        syntax: '<@membre>'
    }
}