module.exports = {
	name: 'wiki',
	aliases: [ "wiki"],
	description: "Enter your desired Minecraft object, and it will give you the Minecraft Wiki page of it.",
	usage: process.env.PREFIX + "wiki <the object you want to search>",
	execute(discord, message, args) {
		const page = args.filter(e => e !== 'wiki').join("_").toLowerCase();
    message.channel.send("Here you go!: https://minecraft.gamepedia.com/" + page);
	},
	isAdmin: false
}