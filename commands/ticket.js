const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Sends message to staff team privately.')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('No one in this channel will see this.')
				.setRequired(true)),
	async execute(interaction) {

		const message = interaction.options.getString('message');
		const channel = interaction.guild.channels.cache.get('938082130200768562');
		const commandUser = await interaction.guild.members.cache.get(interaction.user.id) ;
		const commandUserNickname = commandUser.nickname ? commandUser.nickname : commandUser.user.username;
		await channel.send(`New report from "${commandUserNickname}": ${message}`)
		await interaction.reply({content: 'Your report has been sent to the staff team.', ephemeral: true});
	},
};