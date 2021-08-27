const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.')
        )
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👥・。Veuillez mentionner le membre à mute.')
        )
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👮・。Vous ne pouvez mute le propriétaire du serveur.')
        )
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous ne pouvez pas mute ce membre.')
        )
        if (!member.manageable) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🤖・。Le bot ne peut pas mute ce membre.')
        )
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('⏰・。Veuillez indiquer une durée valide.')
        )
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setTitle('🔇・。TempMute')
            .setDescription(`🦾・。${member} a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        )
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', humanizeDuration(duration, {
                language: 'fr'
            }), true))
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(new Discord.MessageEmbed()
                .setColor('#fff100')
                .setTitle('⏰・。UnMute')
                .setDescription(`🦾・。${member} a été unmute.`)
            )
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true,
    help: {
        description: 'mute temporairement un membre du serveur.',
        syntax: '<@membre> (durée) [raison = non obligatoire]'
    }
}