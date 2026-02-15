//singelton db connection (Singelton design pattern)
//we dont want to create multiple connections to the database, we want to reuse the same connection throughout the application
// Singleton DB connection
const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }
}

function getDB() {
  return mongoose.connection.db;
}

module.exports = {
  connectDB,
  getDB
};


