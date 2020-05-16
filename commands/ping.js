module.exports = {
	name: 'ping',
	aliases: [ "ping" ],
	description: "Says 'Ping!'.",
	usage: process.env.PREFIX + "ping",
	execute(discord, message, args) {
		message.channel.send('Pong!');
	},
	isAdmin: false
}