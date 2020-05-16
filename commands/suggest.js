module.exports = {
	name: 'suggest',
	aliases: [ "suggest" ],
	description: "Suggest a suggestion to a dedicated channel.",
  usage: process.env.PREFIX + "suggest <your suggestion>",
	execute(discord, message, args) {
		const channel = message.guild.channels.cache.find(ch => ch.name === 'suggestions');
		const suggestion = args.filter(e => e !== 'suggest').join(" ");
		if (!channel) return;
		const embed = new discord.MessageEmbed()
		  .setAuthor(message.author.username, message.author.avatarURL())
		  .setTitle("New Suggestion By: " + message.author.username)
		  .addField("Suggestion: ", suggestion)
		  .setTimestamp()
		  .setFooter('State: Unknown');
		channel.send(embed).then(embedMessage => {
		  embedMessage.react("👍");
		  embedMessage.react("👎");
		});
		message.delete();
	},
	isAdmin: false
}