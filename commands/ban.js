const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor("fff100")
            .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.'))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setColor("fff100")
            .setDescription('👥・。Veuillez mentionner le membre à bannir.'))
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor("fff100")
            .setDescription('👮・。Vous ne pouvez pas bannir le propriétaire du serveur.'))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor("fff100")
            .setDescription('🙅‍♂️・。Vous ne pouvez pas Bannir ce membre.'))
        if (!member.bannable) return message.channel.send(new Discord.MessageEmbed()
            .setColor("fff100")
            .setDescription('🤖・。Le bot ne peut pas bannir ce membre.'))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.ban({
            reason
        })
        message.channel.send(new Discord.MessageEmbed()
            .setColor("fff100")
            .setDescription(`🦾・。${member.user.tag} a été banni !`))
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', '∞', true))
    },
    name: 'ban',
    guildOnly: true,
    help: {
        description: 'ban un membre du serveur.',
        syntax: '<@membre> [raison = non obligatoire]'
    }
}
