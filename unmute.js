const Discord = require("discord.js");

exports.run = (client,message,args) => {

    if (!message.member.hasPermission('MUTE_MEMBERS'))
      return message.channel.send('** Você não tem permissão para executar este comando!**')
    let muteRole = message.guild.roles.find((r) => r.name === "RD Mute");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`Quem você quer desmutar?`);
    else {
      member.removeRole(muteRole);
      message.channel.send(`${member} foi desmutado(a) por ${message.author}`);
    }

  }