const config = require("./../config");

module.exports = {
	name: 'help',
	aliases: [ "help", "h" ],
	description: "Sends description of commands in the bot.",
  usage: process.env.PREFIX + "help <the command you need help with>",
	execute(discord, message, args, commands) {
    const channel = message.channel

    const embed = new discord.MessageEmbed()
      .setTitle("Feder Bot's Commands:")
      .setTimestamp();
    
    if (args[1] == null) {
      for (let i = 0; i < commands.array().length; i++) {
        if (commands.array()[i].isAdmin == true) {
          if (message.member.roles.cache.has(config.AdminRoleID)) {
            embed.addField(commands.array()[i].name + " (Aliases: " + commands.array()[i].aliases.join(", ") + "):", commands.array()[i].description, true);
            embed.addField("Usage:", commands.array()[i].usage, true);
            embed.addField('\u200B', '\u200B');
          }
          else {
            continue;
          }
        }
        else {
          embed.addField(commands.array()[i].name + " (Aliases: " + commands.array()[i].aliases.join(", ") + "):", commands.array()[i].description, true);
          embed.addField("Usage:", commands.array()[i].usage, true);
          embed.addField('\u200B', '\u200B');
        }
      }
    }
    else {
      
      let WasFound = false;
      for (let i = 0; i < commands.array().length; i++) {
        if (args[1] == commands.array()[i].name) {
          WasFound = true;
          i = commands.array().length;
        }
      }
      console.log(WasFound.toString());
      
      if (WasFound == true) {
        embed.addField(commands.get(args[1]).name + " (Aliases: " + commands.get(args[1]).aliases.join(", ") + "):", commands.get(args[1]).description, true);
        embed.addField("Usage:", commands.get(args[1]).usage, true);
      }
      else {
        embed.addField('\u200B', "Sorry! No command with the name " + args[1] + " was found!", true);
      }
    }
    
    channel.send(embed).then(m => m.delete(5000));
    message.delete();
	},
	isAdmin: false
}