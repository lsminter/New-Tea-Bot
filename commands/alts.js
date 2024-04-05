const { SlashCommandBuilder } = require('discord.js');
const { MongoClient } = require("mongodb");

const uri =  'mongodb+srv://Cluster59433:KFYNZ82Wqp6RRths@cluster59433.jchouix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster59433'

const mongoClient = new MongoClient(uri);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alt')
		.setDescription('Adds alts to your discord.')
		.addStringOption(option =>
			option.setName('alt')
				.setDescription('Name of your alt.')
				.setRequired(true)),
	async execute(interaction) {
		const alt = interaction.options.getString('alt');
		const commandUser = await interaction.guild.members.cache.get(interaction.user.id) ;
		const commandUserNickname = commandUser.nickname ? commandUser.nickname : commandUser.user.username;

    async function run(){
      try {
        await mongoClient.connect();

        const db = mongoClient.db("eggers");
        const col = db.collection("users");

        let filter = ''
        filter = {"username": commandUserNickname};
        const document = await col.findOne(filter);
        console.log(document)
        // check if the commandUserNickname is a username
          // add the alt to the array of alts
        // if the commandUserNickname doesn't match a username
          // create a new document for them
        if (document){
          await col.updateOne(
            { username: commandUserNickname},
            {
              $push: {alts: alt},
              $currentDate: { lastModified: true }
            }
          )
        } else {
          // Create new documents
          const userDocuments = [
            {
              "username": commandUserNickname,
              "count": 0,
              "alts": [alt]
            }
          ]
          // Insert the documents into the specified collection
          const p = await col.insertMany(userDocuments);
        }
        await interaction.reply(`"${alt}" has been added to "${commandUserNickname}"`)
        const document2 = await col.findOne(filter);
        console.log(document2.alts)

      } catch (err) {
        console.log(err.stack);
        await interaction.reply(`Error adding "${alt}" to "${commandUserNickname}"`)
      }
      finally {
        await mongoClient.close();
      }
    }

    run().catch(console.dir);
	},
};