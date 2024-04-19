const { Events } = require('discord.js');
const { MongoClient } = require("mongodb");
 
const uri =  'mongodb+srv://Cluster59433:KFYNZ82Wqp6RRths@cluster59433.jchouix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster59433'

const mongoClient = new MongoClient(uri);

module.exports = {
	name: Events.MessageCreate,
  once: false,
  cooldown: 5,
	async execute(message) {
    const userIsBot = message.author.bot
  //   tea channel
  if (message.channelId == '1225503184340910090'){
  //     tea bot
    if (message.author.id == '1225503647232954398'){ 
  //     my channel
    // if (message.channelId == '931644184580993157'){
      // my id
      // if (message.author.id == '245048578945449984'){ 
        let [egger, eggee] = ''

        if (message.content.includes('just handegged')){
          [egger, eggee] = message.content.split(' just handegged ')
        } 
        else if (message.content.includes('just got handegged by')){
          [egger, eggee] = message.content.split(' just got handegged by ')
        } else {
          return
        }
        egger = egger.trim()
        eggee = eggee.slice(0, -1).trim()

        async function run() {
          try {
              // Connect to the Atlas cluster
                await mongoClient.connect();
                // Get the database and collection on which to run the operation
                const db = mongoClient.db("eggers");
                const col = db.collection("users");
                let filter = ''
                let filter2 = ''
                if (message.content.includes('just handegged')){
                  filter = {"username": egger};
                  const document = await col.findOne(filter);
                  if (document){
                    await col.updateOne(
                      { username: egger},
                      {
                        $set: {count: document.count + 1},
                        $currentDate: { lastModified: true }
                      }
                    )
                  } else {
                    filter = {'alts': `${egger}`};
                    const altDocument = await col.findOne(filter);
                    if (altDocument) {
                      await col.updateOne(
                        { username: altDocument.username},
                        {
                          $set: {count: altDocument.count + 1},
                          $currentDate: { lastModified: true }
                        }
                      )
                    } else {
                      const userDocuments = [
                        {
                          "username": egger,
                          "count": 1,
                          "alts": [egger]
                        }
                      ]
                      const p = await col.insertMany(userDocuments);
                    }
                  }
                  filter2 = {"username": eggee}
                  const document2 = await col.findOne(filter2);
                  if (document2){
                    await col.updateOne(
                      { username: eggee},
                      {
                        $set: {count: document2.count - 1},
                        $currentDate: { lastModified: true }
                      }
                    )
                    const document2Update = await col.findOne(filter2);
                  } else {
                    filter = {'alts': `${eggee}`};
                    const altDocument = await col.findOne(filter);
                    if (altDocument) {
                      await col.updateOne(
                        { username: altDocument.username},
                        {
                          $set: {count: altDocument.count - 1},
                          $currentDate: { lastModified: true }
                        }
                      )
                    } else {
                      const userDocuments = [
                        {
                          "username": eggee,
                          "count": -1,
                          "alts": [eggee]
                        }
                      ]
                      const p = await col.insertMany(userDocuments);
                    }
                  }
                  const documentUpdate = await col.findOne(filter);
                  const document2Update = await col.findOne(filter2);
                  await message.reply(`${egger} score: ${documentUpdate.count}. ${eggee} score: ${document2Update.count}.`)
                } else {
                  filter = {"username": eggee};
                  const document = await col.findOne(filter);
                  if (document){
                    await col.updateOne(
                      { username: eggee},
                      {
                        $set: {count: document.count + 1},
                        $currentDate: { lastModified: true }
                      }
                    )
                  } else {
                    filter = {'alts': `${eggee}`};
                    const altDocument = await col.findOne(filter);
                    if (altDocument) {
                      await col.updateOne(
                        { username: altDocument.username},
                        {
                          $set: {count: altDocument.count + 1},
                          $currentDate: { lastModified: true }
                        }
                      )
                    } else {
                      const userDocuments = [
                        {
                          "username": eggee,
                          "count": 1,
                          "alts": [eggee]
                        }
                      ]
                      const p = await col.insertMany(userDocuments);
                    }
                  }
                  filter2 = {"username": egger}
                  const document2 = await col.findOne(filter2);
                  if (document2){
                    await col.updateOne(
                      { username: egger},
                      {
                        $set: {count: document2.count - 1},
                        $currentDate: { lastModified: true }
                      }
                    )
                    const document2Update = await col.findOne(filter2);
                  } else {
                    filter = {'alts': `${egger}`};
                    const altDocument = await col.findOne(filter);
                    if (altDocument) {
                      await col.updateOne(
                        { username: altDocument.username},
                        {
                          $set: {count: altDocument.count - 1},
                          $currentDate: { lastModified: true }
                        }
                      )
                    } else {
                      const userDocuments = [
                        {
                          "username": egger,
                          "count": -1,
                          "alts": [egger]
                        }
                      ]
                      const p = await col.insertMany(userDocuments);
                    }
                  }
                  const documentUpdate = await col.findOne(filter);
                  const document2Update = await col.findOne(filter2);
                  await message.reply(`${eggee} score: ${documentUpdate.count}. ${egger} score: ${document2Update.count}.`)
                }
              } catch (err) {
                console.log(err.stack);
            }
            finally {
              await mongoClient.close();
          }
        }
        
        run().catch(console.dir);
      }
    }
	},
};