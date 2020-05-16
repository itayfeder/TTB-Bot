module.exports = {
	name: 'clear',
	aliases: [ "clear", "c" ],
	description: "Clears messages from channel.",
  usage: process.env.PREFIX + "clear <number of messages>",
	execute(discord, message, args) {
		message.channel.bulkDelete(args[1], true);
	},
	isAdmin: true
}