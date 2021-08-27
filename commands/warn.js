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
            .setDescription('👥・。Veuillez mentionner le membre à warn.')
        )
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('👮・。Vous ne pouvez pas warn le propriétaire du serveur.')
        )
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('🙅‍♂️・。Vous ne pouvez pas warn ce membre.')
        )
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription('📔・。Veuillez indiquer une raison.')
        )
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#fff100')
            .setDescription(`🦾・。${member} a été warn pour ${reason} !`)
        )
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true))
    },
    name: 'warn',
    guildOnly: true,
    help: {
        description: 'avertir un membre du serveur.',
        syntax: '<@membre> [raison = obligatoire]'
    }
}