const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string
const uri =  'mongodb+srv://Cluster59433:KFYNZ82Wqp6RRths@cluster59433.jchouix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster59433'


// check for new message in channel from the bot (1225503647232954398)
// Get who egged someone
  // check if the user exists in the db
  // if they don't add them and add +1 to their count
  // if they do, +1 to their count
// get who got egged
  // check if the user exists in the db
  // if they don't add them and add -1 to their count
  // if they do, -1 to their count
// send message with the egger's count and the egge's count



const client = new MongoClient(uri);
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         // Get the database and collection on which to run the operation
         const db = client.db("eggers");
         const col = db.collection("users");
         // Create new documents                                                
         const userDocuments = [
           {
             "username": "minterhero",
             "count": 2
           },
           {
             "username": "soloh",
             "count": 4
           }
         ]
         // Insert the documents into the specified collection        
         const p = await col.insertMany(userDocuments);
         // Find the document
         const filter = { "username": "minterhero" };
         const document = await col.findOne(filter);
         // Print results
         console.log("Document found:\n" + JSON.stringify(document));
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);