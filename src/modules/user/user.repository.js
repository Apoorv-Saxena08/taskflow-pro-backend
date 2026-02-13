//Talks to database

const {getDB} = require("../../config/db");

function getCollection(){
    const db = getDB();
    return db.collection("users");
}

async function createUser(userData) {
    const users = getCollection();
    return await users.insertOne(userData);
}

async function findByEmail(email) {
    const users = getCollection();
    return await users.findOne({email});
}

module.exports = {
    createUser,
    findByEmail
}