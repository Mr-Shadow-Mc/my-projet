const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.')
        )
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👥・。Veuillez mentionner le membre à exclure.')
        )
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👮・。Vous ne pouvez pas exclure le propriétaire du serveur.')
        )
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous ne pouvez pas exclure ce membre.')
        )
        if (!member.kickable) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🤖・。Le bot ne peut pas exclure ce membre.')
        )
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.kick(reason)
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription(`🦾・。${member.user.tag} a été exclu !`)
        )
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[KICK] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true))
    },
    name: 'kick',
    guildOnly: true,
    help: {
        description: 'Exclue un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}