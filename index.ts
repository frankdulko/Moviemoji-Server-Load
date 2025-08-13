const data = require("./movies.json"); // Path relative to this file
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("moviemoji");
    const collection = db.collection("movies");

    // 3. Insert each object as a document
    for (const doc of data) {
      await collection.insertOne(doc);
      console.log(`Inserted: ${doc.title}`);
    }
    console.log("All documents inserted!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
