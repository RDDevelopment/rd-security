const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MUTE_MEMBERS'))
      return message.channel.send('** Você não tem permissão para executar este comando! **')

    let muterole = message.guild.roles.find((r) => r.name === "RD Mute");
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "RD Mute",
          color: "#9700ff",
          permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Por favor mencione um usuário!")

    var razao = args.slice(1).join(' ')
    if (!razao) razao = " sem motivos "
    var muteRole = message.guild.roles.find((r) => r.name === "RD Mute")
    try {
      member.addRole(muteRole)
      message.channel.send(member + " foi mutado por " + message.author + " Motivo : " + razao + "!");
      member.send(`Você foi mutado no nosso servidor pelo motivo: ${razao}`)
    } catch (err) {
      message.channel.send("Eu não tenho as permissões necessárias para mutar um membro!");
    }


  }