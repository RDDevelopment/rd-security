const Discord = require("discord.js");

exports.run = (client,message,args) => {
    if(!message.member.hasPermission("BAN_MEMBERS"))
    return message.reply("você não tem permissão para usar esse comando!");

    if(args.length === 0) 
    return message.reply("utilize !ban <@usuário> <motivo>!");

    let banMember = message.mentions.users.first() || message.guild.users.get(args[0]);
    if(!banMember) return message.reply("não foi possível encontrar este usuário!");
    
    let motivo = args.join(" ").slice(22) || args.slice(1).join(" ");
    if(!motivo){
        motivo = "A razão não foi informada!"
    }

    try {
        message.guild.member(banMember).ban(motivo);
        message.channel.send(`O usuário ${banMember} foi **banido** com sucesso pelo **motivo**: ${motivo}`);
        banMember.send(`Você foi banido do nosso servidor pelo motivo ${motivo}`)
    } catch (error) {
        message.reply(`${error}`);
    }
}

exports.help = {
    name: "ban"
}