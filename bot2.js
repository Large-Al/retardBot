const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./auth.json');

client.on('ready', ()=> {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	if(msg.channel.name === 'bot-commands') {
		if(!msg.author.bot) {
			msg.delete(3600000);
		}
	}

	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

  switch (command) {
  	case `ping` :
  		msg.channel.send('Pong!');
  	break;
  	case `clear` :
  		if (args[0] > 0) {
  			msg.channel.bulkDelete(1);
			msg.channel.bulkDelete(args[0]).then(messages => console.log(`Bulk deleted ${messages.size} messages`)).catch(console.error);
		}
  	break;
  	case `role` :
  		let member = msg.mentions.members.first();
  		let role = msg.mentions.roles.first();
  		member.addRole(role).catch(console.error);
  	break;
}

client.on('guildMemberAdd', member => {

	let myRole = msg.guild.roles.get("638811267326541834");
	const channel = member.guild.channels.find(ch => ch.name === 'member-log');
	
	if (!channel) return;

	channel.send(`Welcome to the server, ${member}`);
	member.addRole(myRole).catch(console.error);

});
});

client.login(token);