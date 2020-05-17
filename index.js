const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);






const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const PREFIX = process.env.PREFIX;
const config = require("./config");

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    bot.commands.set(command.name, command);
}

bot.on("ready", message => {
  bot.user.setActivity("TTB: Reborn!!!", { type: "PLAYING"})
  console.log("This bot is online!");
});

bot.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
	  if (bot.commands.get('help').aliases.includes(args[0])) bot.commands.get('help').execute(Discord, message, args, bot.commands);
	  else if (bot.commands.get('ping').aliases.includes(args[0])) bot.commands.get('ping').execute(Discord, message, args);
	  else if (bot.commands.get('suggest').aliases.includes(args[0])) bot.commands.get('suggest').execute(Discord, message, args);
	  else if (bot.commands.get('wiki').aliases.includes(args[0])) bot.commands.get('wiki').execute(Discord, message, args);
	  else if (bot.commands.get('clear').aliases.includes(args[0])) {
		  if (message.member.roles.cache.has(config.AdminRoleID)) {
			  bot.commands.get('clear').execute(Discord, message, args);
		  }
		  else {
			  message.channel.send("Looks like you don't have the premmision to do that! Sorry!").then(m => m.delete(5000));
			  message.delete();
		  }
	  }
	  else {
		  message.channel.send("I don't recognize this command. Try again (or type " + PREFIX + "help to get help)!").then(m => m.delete(5000));
	  }
  }
  else {
	  return;
  }
})

bot.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
  
  if (reaction.message.channel === reaction.message.guild.channels.cache.find(ch => ch.name === config.SuggestionsChannel)) {
    if (reaction.message.guild.member(user).roles.cache.has(config.AdminRoleID)) {
      const NewEmbed = new Discord.MessageEmbed()
        .setAuthor(reaction.message.embeds[0].author.name, reaction.message.embeds[0].author.iconURL)
        .setTitle(reaction.message.embeds[0].title)
        .addField(reaction.message.embeds[0].fields[0].name, reaction.message.embeds[0].fields[0].value)
        .setTimestamp()

      let EmojiList = [];
      for(let i = 0; i < config.SuggestionEmotes.length; i++) {
        EmojiList.push(config.SuggestionEmotes[i].Emoji);
      }
      
      if (EmojiList.includes(reaction.emoji.toString())) {
        const FoundEmoji = config.SuggestionEmotes.find(e => e.Emoji === reaction.emoji.toString());
        NewEmbed.setColor(FoundEmoji.Color);
        NewEmbed.setFooter('State: ' + FoundEmoji.StateText + '!');
        reaction.message.channel.send(NewEmbed);
        reaction.message.delete();
      }
    }
  }
});

bot.login(process.env.TOKEN);
