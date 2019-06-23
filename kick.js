const Discord = require('discord.js');

module.exports.run = async (client, message , args) => {


    if (!message.guild.member(message.author.id).hasPermissions("KICK_MEMBERS"))
      return message.reply("você não tem permissão de usar esse comando")

      let member = message.mentions.members.first() || message.guild.members.get(args[0]);

      if (!member)
        return message.reply("Por favor mencione um membro válido deste servidor");

      if (!member.kickable)
        return message.reply("Eu não posso expulsar este usuário! O meu cargo deve estar acima do dele.");
    
      let reason = args.slice(1).join(' ');
      if (!reason) reason = "Nenhuma razão fornecida";

            await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
      message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);
      member.send(`Você foi kickado do nosso servidor pelo motivo ${reason}`)


}