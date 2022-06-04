const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs'),
    humanizeDuration = require('humanize-duration'),
    cooldown = new Set()
const welcome = new Discord.MessageAttachment('./images/WELCOME.png');
const goodbye = new Discord.MessageAttachment('./images/GOOD BYE.png');


client.login(process.env.TOKEN)
client.commands = new Discord.Collection()
client.db = require('./db.json')

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
    if (message.guild) {
        if (!message.member.hasPermission('MANAGE_CHANNELS') && client.db.lockedChannels.includes(message.channel.id)) return message.delete()
    }

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        const duration = config.cooldown[message.channel.id]
        if (duration) {
            const id = `${message.channel.id}_${message.author.id}`
            if (cooldown.has(id)) {
                message.delete()
                return message.channel.send(`Ce salon est soumis a un cooldown de ${humanizeDuration(duration, {language: 'fr'})}.`).then(sent => sent.delete({
                    timeout: 5e3
                }))
            }
            cooldown.add(id)
            setTimeout(() => cooldown.delete(id), duration)
        }
    }

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send(new Discord.MessageEmbed()
    .setColor
    .setDescription('Cette commande ne peut être utilisée que dans un serveur.'))
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setTitle('```-► +1```')
        .setDescription(`${member} Bienvenue sur \`\`⚘・Night Star #drama\`\` 🌹 | \n on est ${member.guild.memberCount} grace a vous ! \`\`N'hesitez pas a inviter vous amis\`\` ^^`)
        .setColor('#fff100"')
        .setImage('https://zupimages.net/up/21/34/290n.png'))
    member.roles.add(config.greeting.role)
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setTitle('``-► -1``')
        .setDescription(`${member} Aurevoir cher compagnons 🌹 | \n on est ${member.guild.memberCount} | \`\`nous esperons te revoir un jour\`\` ^^`)
        .setColor('#fff100')
        .setImage('https://zupimages.net/up/21/34/kmg1.png'))
})

client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})

client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

client.on('ready', () => {
    const statuses = [
        () => `${client.guilds.cache.size} serveurs`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
    ]
    let i = 0
    setInterval(() => {
      client.user.setActivity("with depression", {
        type: "STREAMING",
        url: "https://www.twitch.tv/mrshadowsenpai"
      });
        i = ++i % statuses.length
    }, 1e4)
    setInterval(() => {
        const [bots, humans] = client.guilds.cache.members.cache.partition(member => member.user.bot)
        client.channels.cache.get(config.serverStats.humans).setName(`Humains : ${humans.size}`)
        client.channels.cache.get(config.serverStats.bots).setName(`🤖 Bots : ${bots.size}`)
        client.channels.cache.get(config.serverStats.total).setName(`Total sur le server : ${client.guilds.Member.length}`)
    }, 3e4)
})

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})

// salutaions minisucule 
client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "bonjour"){
      message.channel.send('Bonjour a toi !')
    }
  })

  client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "hey"){
      message.channel.send('Hey !')
    }
  })

  client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "salut"){
      message.channel.send('Salut !')
    }
  })

  client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "slt"){
      message.channel.send('Salut !')
    }
  })

  client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "ohayo"){
      message.channel.send('Ohayo !')
    }
  })

  client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "salam"){
      message.channel.send('Salam !')
    }
  })

  client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "hi"){
      message.channel.send('Hi !')
    }
  })

  client.on('message', message =>{
    if(!message.guild || message.author.bot == true) return;
    if(message.content.toLowerCase() == "konnichiwa"){
      message.channel.send('Konnichiwa !')
    }
  })
