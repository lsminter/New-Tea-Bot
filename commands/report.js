const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Sends a message to the staff team')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to send to the staff team')
				.setRequired(true)),
	async execute(interaction) {

		const message = interaction.options.getString('message');
		const channel = interaction.guild.channels.cache.get('748571128687100002');
		await channel.send(`New report from ${interaction.user.tag}: ${message}`)
		await interaction.reply({content: 'Your report has been sent to the staff team.', ephemeral: true});
	},
};