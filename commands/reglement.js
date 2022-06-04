const Discord = require('discord.js')
const Img = new Discord.MessageAttachment('./images/modcertifie-banner.png');

module.exports = {
  run: message => {
    message.channel.send(new Discord.MessageEmbed()
      .setColor('#110D9B')
      .setTitle('RÈGLEMENT Gavay Online')
      .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n**Les règles du serveur étant indiquées lors de votre arrivée sur le serveur, elles sont considérées comme lues et approuvées.**\n\n**Tout manquement pourra entraîner un mute, kick ou ban précédé ou non d'avertissement(s) selon la gravité de la faute.**\n\n**Les règles sont simples mais à lire et respecter !**\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**1 - COMPORTEMENT ENVERS LES AUTRES UTILISATEURS**\n**Gardez toujours à l'esprit la manière dont vos déclarations peuvent être perçues par les autres. Même si vous avez l'intention de faire une blague, il peut y avoir des personnes qui ne la voient pas comme telle. Les blagues discriminatoires et les discours de haine (attaques contre un individu ou un groupe sur la base de sa race, son ethnie, son origine nationale, son sexe, son genre, son orientation sexuelle, son appartenance religieuse ou son handicap) sont donc proscrits.**\n\nCes règles valent également pour les pseudonymes et les photos de profil.\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**2 - PROPAGANDE POLITIQUE OU RELIGIEUSE**\nLes contenus à but promotionnels politiques ou religieux n’ont pas leur place sur le serveur. Parler de politique ou de religion n’est pas passible d’un ban. C’est bien la promotion d’une idéologie qui l’est.\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**3 - UTILISATION CORRECTE DU SERVEUR**\nUtilisez les salons de manière logique. Les demandes d’aides et de conseil ne doivent pas troubler les salons de flood. Il est en revanche possible d’utiliser le salon “général” . Vos demandes de team doivent être formulées dans le salon correspondant.\n\n**4 - EFFORTS SUR L'ORTHOGRAPHE**\nOn ne parle pas ici de parler de manière irréprochable mais bien de faire attention un minimum.\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**5 - CONTENU POUR ADULTES**\nLes contenus pornographiques explicites n'ont pas leur place sur ce serveur. Cela comprend les vidéos, les gifs ou les images fixes mais également les photos de profil et les pseudonymes représentant des actes sexuels explicites, qu'ils soient")
      .setImage('https://zupimages.net/up/21/34/v20v.png')
      .setTimestamp('Gavay Online | 🌹')
      .setFooter('Gavay Online | 🌹'))
      message.delete()
  },
  name: 'reglement',
  help: {
      description: 'Permet de voir le reglement du serveur. ',
      syntax: ''
  }
}
