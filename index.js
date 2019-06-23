const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json"); 




client.on("ready", () =>{
    console.log(`iniciado nessa porra com ${client.users.size} filhos da puta, em ${client.channels.size} anais, e com essas caralhada de servidor ${client.guilds.size}.`);

});

Array.prototype.shuffleGetOne = function () {
  return this.sort(() => Math.random() > 0.5 ? -1 : 1)[0]
  }

client.on('guildMemberAdd', member => {

  let emoji = [ '👮', '🔧', '🎮'].shuffleGetOne()

  var embed = new Discord.RichEmbed()
  .setAuthor(`${member.user.tag}`, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setColor("RANDOM")
  .addField('**REGISTRO**', ` ${member} você deve se registrar para garantir que não é um bot. Clique no emoji ${emoji}`)

  client.channels.get('591841208611897367').send(`${member}`).then(msg => msg.delete(60000));



   client.channels.get('591841208611897367').send(embed).then(async msg => {
   await msg.react(emoji)
   await msg.react("💰")
   await msg.react("⚙")


     let filtro = (reaction, user) => reaction.emoji.name === emoji  && user.id == member.id;
     const coletor = msg.createReactionCollector(filtro, {time: 120000});
    

    let filtro1 = (reaction, user) => reaction.emoji.name === "💰" && user.id === member.id;
    const coletor1 = msg.createReactionCollector(filtro1, { time: 120000}); 

    let filtro2 = (reaction, user) => reaction.emoji.name === "⚙" && user.id === member.id;
    const coletor2 = msg.createReactionCollector(filtro2, { time: 120000});

     let server = client.guilds.get("329070983602372618")
     let role1 = server.roles.get('591838828721864707')

  coletor.on("collect", () => {

    if(member.roles.has(role1)) return
    member.addRole(role1)

    client.channels.get('591841208611897367').send("Sucesso, você foi registrado no servidor").then(msg => msg.delete(5000));

  });

  coletor1.on("collect", () => {
    client.channels.get('591841208611897367').send("Errado, você é um bot").then(msg => msg.delete(5000));

  });

  coletor2.on("collect", () => {
    client.channels.get('591841208611897367').send("Errado, você é um bot").then(msg => msg.delete(5000));

});
});  
});    

              
        
              


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  try {
    var comandinhos = require(`./comandos/${comando}.js`)
    comandinhos.run(client, message, args);
} catch (erro){
  console.log(erro);
}

  




  
});

client.login(config.token);