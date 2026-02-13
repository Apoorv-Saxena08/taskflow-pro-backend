//singelton db connection (Singelton design pattern)
//we dont want to create multiple connections to the database, we want to reuse the same connection throughout the application
// Singleton DB connection
const { MongoClient } = require("mongodb");
const { MONGO_URI } = require("./env");

let client;
let db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();

    // ✅ Correct way to select DB
    db = client.db("taskflow");

    console.log("✅ Connected to MongoDB");
  }
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("DB not initialized");
  }
  return db;
}

module.exports = { connectDB, getDB };
