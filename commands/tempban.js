const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.')
        )
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👥・。Veuillez mentionner le membre à bannir.')
        )
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👮・。Vous ne pouvez pas bannir le propriétaire du serveur.')
        )
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous ne pouvez pas Bannir ce membre.')
        )
        if (!member.bannable) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🤖・。Le bot ne peut pas bannir ce membre.')
        )
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('⏰・。Veuillez indiquer une durée valide.')
        )
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({
            reason
        })
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription(`🦾・。${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        )
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', humanizeDuration(duration, {
                language: 'fr'
            }), true))
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(new Discord.MessageEmbed()
                .setColor('#fff100')
                .setTitle('⏰・。DéBan')
                .setDescription(`🦾・。${member.user.tag} a été débanni.`)
            )
        }, duration)
    },
    name: 'tempban',
    guildOnly: true,
    help: {
        description: 'ban temporairement un membre du serveur.',
        syntax: '<@membre> (durée) [raison = non obligatoire]'
    }
}