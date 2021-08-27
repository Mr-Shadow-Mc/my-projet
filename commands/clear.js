const Discord = require('discord.js')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
        .setColor("fff100")
        .setDescription('🙅‍♂️・。Vous n\'avez pas la permission d\'utiliser cette commande.'))
        const count = args[0]
        if (!/\d+/.test(count)) return message.channel.send(new Discord.MessageEmbed()
        .setColor("fff100")
        .setDescription('📝・。Veuillez indiquer un nombre de messages à supprimer.'))
        if (count < 1 || count > 99) return message.channel.send(new Discord.MessageEmbed()
        .setColor("fff100")
        .setDescription('📝・。Le nombre de message doit être compris entre ``1 et 99.``'))
        const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(new Discord.MessageEmbed()
        .setColor("fff100")
        .setDescription(`🤖・。${size - 1} messages ont été supprimés !`)).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'clear',
    guildOnly: true,
    help: {
        description: 'Permet de supprimé des messages.',
        syntax: '[Nombre de message]'
    }
}